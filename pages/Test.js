import React, { useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import axios from "axios";

const Test = () => {
  const [ans, setans] = useState("");

  const clickHandler = async () => {
    try {
      let response = await axios("/api/testApi");
      console.log(response);
      if (response.data.name == "success") {
        if (response.data.response.props.name == "success1") {
          setans(response.data.response.props.result.choices[0].text);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <div className="w-full flex flex-col gap-y-10">
        {/* <Header /> */}
        <div
          className="py-4 w-full flex flex-col items-start gap-y-3
        bg-backgroundGray h-screen text-white"
        >
          <button onClick={clickHandler}>Click</button>
          <h1>{ans}</h1>
        </div>
      </div>
    </div>
  );
};

export default Test;
