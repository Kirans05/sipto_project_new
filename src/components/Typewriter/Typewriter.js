import { useRouter } from "next/router";
import React, { useState, useEffect, useReducer } from "react";

function Typewriter(props) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (index < props.text.length) {
      setTimeout(() => {
        setText(text + props.text.charAt(index));
        setIndex(index + 1);
      }, props.delay);
    } else {
      setIsDone(true);
      // props.changeBtnStatus();
    }
  }, [index, props]);

  return (
    <div className="bg-answerBoxBackground text-white py-10 px-6 md:px-52 w-full">
      <h1>{isDone ? text : text + "|"}</h1>
      {isDone == true ? (
        <div className="w-full md:w-full flex items-center justify-around md:justify-evenly mt-5 gap-x-2 flex-wrap">
          {props.buttonsArray.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => router.push(`/${item.substring(22, item.indexOf("/app"))}`)}
                className="bg-green-500 text-white p-2 rounded-lg mt-2"
              >
                {item.substring(22, item.indexOf("/app")).toUpperCase() == "WEBSDK" ? "KYC" : item.substring(22, item.indexOf("/app")).toUpperCase()}
              </button>
            );
          })}
          {/* {props.buttonsArray.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => router.push(`/${item.btnLink}`)}
                className="bg-green-500 text-white p-2 rounded-lg mt-2"
              >
                {item.btnText.toUpperCase() == "WEBSDK" ? "KYC" : item.btnText.toUpperCase()}
              </button>
            );
          })} */}
        </div>
      ) : null}
    </div>
  );
}

export default Typewriter;
