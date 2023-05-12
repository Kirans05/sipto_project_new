import React, { useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import axios from "axios";
import { FiStar } from "react-icons/fi";
import { useRouter } from "next/router";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";

const MemoryLangchain = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [resultArray, setResultArray] = useState([]);

  const getAnswer = async () => {
    try {
      const loader = new TextLoader("./finaltext.txt");
      // const loader = new PDFLoader("./check.pdf");
      const docs = await loader.load();
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 1,
      });
      const chunckDocs = await splitter.splitDocuments(docs);

      // Load the docs into the vector store
      const vectorStore = await MemoryVectorStore.fromDocuments(
        chunckDocs,
        new OpenAIEmbeddings()
      );

      const resultOne = await vectorStore.similaritySearch(
        "how to stop investing?",
        4
      );

      // res.send(resultOne);
      console.log(resultOne);
    } catch (err) {
      console.log(err);
    }
  };

  const getResult = async () => {
    try {
      let response = await axios("/api/Langchain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          inputData: inputValue,
        },
      });
      if (response.data.name == "success") {
        if (response.data.response.props.name == "success1") {
          let finalArray = response.data.response.props.resultOne.map(
            (item) => {
              let str = item.pageContent;
              // let startIndex = str.indexOf("You can visit");
              // let endIndex = str.indexOf("/appLink/.");
              // console.log(startIndex)
              // console.log(endIndex)
              // if (startIndex == -1 && endIndex == -1) {
              //   return {
              //     answerStr: str,
              //     btnLink: "",
              //     btnText: "",
              //   };
              // } else {
              //   let link = str.substring(startIndex + 14, endIndex);
              //   let firstStr = str.substring(0, startIndex);
              //   let secondStr = str.substring(endIndex + 11);
              //   return {
              //     answerStr: firstStr + secondStr,
              //     btnLink: link,
              //     btnText: link.substring(14),
              //   };
              // }

              var duplicateStr = str;
              let endLoop = false;
              let linkArray = [];

              while (endLoop == false) {
                if (duplicateStr.indexOf("You can visit") == -1) {
                  linkArray.push({
                    answerStr: duplicateStr,
                    btnLink: "",
                    btnText: "",
                  });
                  endLoop = true;
                } else {
                  let startIndex = duplicateStr.indexOf("You can visit");

                  let endIndex = duplicateStr.indexOf("/appLink/.");
                  let link = duplicateStr.substring(startIndex + 14, endIndex);
                  let firstStr = duplicateStr.substring(0, startIndex);
                  let secondStr = duplicateStr.substring(endIndex + 11);

                  duplicateStr = firstStr + secondStr;

                  if (duplicateStr.indexOf("You can visit") == -1) {
                    linkArray.push({
                      answerStr: duplicateStr,
                      btnLink: link,
                      btnText: link.substring(14),
                    });
                    endLoop = true;
                  } else {
                    linkArray.push({
                      answerStr: "",
                      btnLink: link,
                      btnText: link.substring(14),
                    });
                  }
                }
              }
              return linkArray;
            }
          );
          setResultArray(finalArray);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-4 border-black border-2 flex flex-col items-start gap-y-3">
          <h1>MemoryLangchain</h1>
          <input
            type="text"
            placeholder="enter question"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-3/4"
          />
          <button className="bg-green-500 p-2 text-white" onClick={getResult}>
            Get Answer
          </button>
          <button
            onClick={() => setResultArray([])}
            className="bg-red-500 p-2 text-white"
          >
            Reset
          </button>
          {/* {resultArray.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item.answerStr}</h1>
                {item.btnLink == "" ? null : (
                  <button
                    onClick={() => router.push(`/${item.btnLink}`)}
                    className="bg-gray-700 text-white p-2 rounded-lg"
                  >
                    {item.btnText}
                  </button>
                )}
              </div>
            );
          })} */}

          {resultArray.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.map((list, i) => {
                  return (
                    <div key={i}>
                      <h1>{list.answerStr}</h1>
                      {list.btnLink == "" ? null : (
                        <button
                          onClick={() => router.push(`/${list.btnLink}`)}
                          className="bg-gray-700 text-white p-2 rounded-lg mt-2"
                        >
                          {list.btnText}
                        </button>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemoryLangchain;
