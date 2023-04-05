import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainUseContext } from "../../context/MainUseContext";
import SingleOrder from "./SingleOrder";

const MyOrders = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let { merchantId_AccessToken } = augmontGoldContext.augmontGoldData;

  const [orderOption, setOrderOption] = useState({
    page: "",
    reRender: true,
  });
  const [ordersList, setOrdersList] = useState([]);

  const fetchMyOrders = async () => {
    let options = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };

    if (orderOption.page == "buy") {
      options.url = `https://uat-api.augmontgold.com/api/merchant/v1/17a8937e-ec5f-41bc-a1e2-f18e9dd7a664/buy`;
    } else if (orderOption.page == "sell") {
      options.url = `https://uat-api.augmontgold.com/api/merchant/v1/17a8937e-ec5f-41bc-a1e2-f18e9dd7a664/sell`;
    } else if (orderOption.page == "") {
      return;
    }
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.statusCode == 200) {
          setOrdersList(fetchResponse.data.result.data);
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchMyOrders();
  }, [orderOption.reRender]);

  return (
    <div className="w-full md:w-full border-2 border-slate-500 rounded-lg p-2 md:p-5 flex flex-col gap-y-6 self-center items-center">
      <h1 className="text-xl font-semibold">MyOrders</h1>
      <div className="w-1/2 flex justify-between">
        <h1
          className="hover:cursor-pointer text-lg font-semibold"
          onClick={() =>
            setOrderOption({
              ...orderOption,
              page: "buy",
              reRender: !orderOption.reRender,
            })
          }
        >
          Buy
        </h1>
        <h1
          className="hover:cursor-pointer text-lg font-semibold"
          onClick={() =>
            setOrderOption({
              ...orderOption,
              page: "sell",
              reRender: !orderOption.reRender,
            })
          }
        >
          Sell
        </h1>
        <h1 className="hover:cursor-pointer text-lg font-semibold">Gift</h1>
        <h1 className="hover:cursor-pointer text-lg font-semibold">Redeem</h1>
      </div>
      {orderOption.page == "" ? null : orderOption.page == "buy" ? (
        <div className="w-full flex flex-col gap-y-8">
          {ordersList.map((item, index) => {
            return <SingleOrder key={index} item={item} orderOption={orderOption}/>;
          })}
        </div>
      ) : orderOption.page == "sell" ? (
        <div className="w-full flex flex-col gap-y-8">
          {ordersList.map((item, index) => {
            return <SingleOrder key={index} item={item} orderOption={orderOption}/>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MyOrders;
