import React, { useEffect, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
import { useRouter } from "next/router";
import axios from "axios";
import Typewriter from "../src/components/Typewriter/Typewriter";

const Pinecone = () => {
  const router = useRouter();
  // const [inputValue, setInputValue] = useState("");
  const [inputValue, setinputValue] = useState({
    value: "",
    prevQtn: "",
    answer: "",
    btns: [],
    btnShowm: "",
  });
  const [reRender, setReRender] = useState(true);

  const getResult = async (question) => {
    setinputValue({
      answer: "",
      btns: [],
      btnShowm: "",
      value: "",
      prevQtn: question,
    });
    try {
      let response = await axios("/api/PineconeApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          inputData: question,
        },
      });
      if (response.data.name == "success") {
        if (response.data.response.props.name == "success2") {
          let choiceArray = response.data.response.props.result.choices;
          let botMessage = "";
          for (let i = 0; i < choiceArray.length; i++) {
            botMessage = botMessage + choiceArray[i].message.content;
          }
          var duplicateStr = botMessage;
          let endLoop = false;
          let obj = {
            answer: "",
            btns: [],
          };
          while (endLoop == false) {
            if (duplicateStr.indexOf("http://localhost:3000") == -1) {
              obj.answer = duplicateStr;
              endLoop = true;
            } else {
              let startIndex = duplicateStr.indexOf("http://localhost:3000");
              let endIndex = duplicateStr.indexOf("/appLink/");
              let link = duplicateStr.substring(startIndex, endIndex + 9);
              let firstStr = duplicateStr.substring(0, startIndex);
              let secondStr = duplicateStr.substring(endIndex + 9);
              duplicateStr = firstStr + "click the button" + secondStr;
              if (duplicateStr.indexOf("http://localhost:3000") == -1) {
                obj.answer = duplicateStr;
                obj.btns.push(link);
                endLoop = true;
              } else {
                obj.btns.push(link);
              }
            }
          }
          setinputValue({
            value: "",
            prevQtn: question,
            answer: obj.answer,
            btns: obj.btns,
            btnShowm: "stop generating",
          });
          setReRender(!reRender);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetAnswer = () => {
    setinputValue({
      value: "",
      prevQtn: "",
      answer: "",
      btns: [],
      btnShowm: "",
    });
  };

  const changeBtnStatus = () => {
    setinputValue({ ...inputValue, btnShowm: "Regenerate Response" });
  };

  const inputChangeHandler = (e) => {
    if (e.key == "Enter") {
      getResult(inputValue.value);
    }
  };

  useEffect(() => {
    if (inputValue.value == "" && inputValue.prevQtn.length >= 1) {
      localStorage.setItem("chatHistory", JSON.stringify(inputValue));
    }
  }, [reRender]);

  useEffect(() => {
    if (localStorage.getItem("chatHistory") == null) {
    } else if (localStorage.getItem("chatHistory") != null) {
      setinputValue(JSON.parse(localStorage.getItem("chatHistory")));
    }
  }, []);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full flex flex-col gap-y-10">
        {/* <Header /> */}
        <div
          className="py-4 w-full flex flex-col items-start gap-y-3
        bg-backgroundGray h-screen"
        >
          <div className="self-center fixed bottom-8 flex items-center gap-x-3 w-full justify-center">
            <input
              type="text"
              placeholder="Enter Question"
              value={inputValue.value}
              onChange={(e) =>
                setinputValue({ ...inputValue, value: e.target.value })
              }
              className="w-3/4 md:w-2/3 bg-InputbackgroundGray pl-4 py-3 shadow-2xl  text-white"
              onKeyUp={inputChangeHandler}
            />
            <button
              onClick={() => getResult(inputValue.value)}
              className="bg-green-500 p-2 text-white "
            >
              {`>`}
            </button>
            <button
              onClick={resetAnswer}
              className="bg-red-500 p-2 text-white "
            >
              Reset
            </button>
          </div>
          <div className="text-white fixed flex flex-row px-10 py-4 bottom-20 md:bottom-24 self-center w-full md:w-3/4 justify-between md:justify-evenly">
            <h1
              className="hover:cursor-pointer hover:underline"
              onClick={() => getResult("How do I invest in gold?")}
            >
              How do I invest in gold?
            </h1>
            <h1
              className="hover:cursor-pointer hover:underline"
              onClick={() => getResult("How do I add funds?")}
            >
              How do I add funds?
            </h1>
            <h1
              className="hover:cursor-pointer hover:underline"
              onClick={() => getResult("Why should I do KYC?")}
            >
              Why should I do KYC?
            </h1>
          </div>
          <div className="h-3/4 md:h-auto overflow-y-auto">
            <h1 className="py-5 px-6 md:px-52 text-white w-full text-xl">
              Sipto Chatbot
            </h1>
            <h1 className="py-5 px-6 md:px-52 text-white w-full -mt-6 text-sm">
              Hi! I am Sipto Chatbot, you can asking me anything about investing
              and savings! I am here to solve all your investment doubts
            </h1>
            <h1 className="py-5 px-6 md:px-52 text-white w-full -mt-5">
              {inputValue.prevQtn}
            </h1>
            {inputValue.answer == "" ? null : (
              <Typewriter
                text={inputValue.answer}
                delay={10}
                buttonsArray={inputValue.btns}
                changeBtnStatus={changeBtnStatus}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pinecone;
