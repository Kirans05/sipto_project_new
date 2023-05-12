import React, { useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Header from "../src/components/Header/Header";
// import openai from "openai";
// import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

import { Configuration, OpenAIApi } from "openai";
import { useRouter } from "next/router";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const OpenApi = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [btnDetails, setBtnDetails] = useState({
    showBtn: false,
    btnText: "",
    btnRoutes: "",
  });

  const getResult = async () => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Q: ${inputValue}\nA:`,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
      setResult(response.data.choices[0].text);
    } catch (err) {}
  };

  const getAgentResult = async () => {
    try {
      let fetchResponse = await axios("/api/AgentHq", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: {
          inputData: inputValue,
        },
      });
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.name == "success") {
          if (fetchResponse.data.response.props.name == "success") {
            let string1 = fetchResponse.data.response.props.response.result;
            console.log(string1);
            let linkStart = string1.indexOf("https://sipto/");
            if (linkStart == -1) {
              setResult(string1);
            } else {
              let linkEnd = string1.indexOf("/appLink/");
              let firstString = string1.substring(0, linkStart - 1);
              let secondString = string1.substring(linkEnd + 9);
              let url = string1.substring(linkStart, linkEnd);
              console.log(url);
              let finalString = firstString + " website" + secondString;
              setResult(finalString);
              setBtnDetails({
                showBtn: true,
                btnText: url.substring(14).toUpperCase(),
                btnRoutes: `/${url.substring(14)}`,
              });
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetHandler = () => {
    setResult("");
    setBtnDetails({ showBtn: false, btnText: "", btnRoutes: "" });
  };

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="p-4 border-black border-2 flex flex-col items-start gap-y-3">
          <h1>Open Api</h1>
          <textarea
            placeholder="Enter Question"
            className="border-2 border-black"
            rows={5}
            cols={50}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="p-2 border-2 bg-green-500 text-white rounded-lg"
            onClick={getResult}
          >
            Get Answer
          </button>
          <button
            className="p-2 border-2 bg-green-500 text-white rounded-lg"
            onClick={getAgentResult}
          >
            Get getAgentResult
          </button>
          <button onClick={resetHandler}>Reset</button>
          <h1>{result}</h1>
          {btnDetails.showBtn == false ? null : (
            <button
              onClick={() => router.push(btnDetails.btnRoutes)}
              className=" bg-red-600 text-white p-2"
            >
              {btnDetails.btnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenApi;
