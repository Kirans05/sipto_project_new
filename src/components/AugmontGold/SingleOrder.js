import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const SingleOrder = ({ item, orderOption }) => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  console.log(augmontGoldContext);
  let {
    merchantId_AccessToken,
    setMerchantId_AccessToken,
    buttonClicked,
    giftInputBoxValues,
    inputBoxValues,
    metalDetails,
    passbookRerender,
    sellInputBoxValues,
    setButtonClicked,
    setGiftInputBoxValues,
    setInputBoxValues,
    setMetalDetails,
    setPassbookRerender,
    setSellInputBoxValues,
    setUserBank,
    setUserPassbook,
    setVariousOptions,
    userBank,
    userPassbook,
    variousOptions,
  } = augmontGoldContext.augmontGoldData;

  let {
    buyGoldThroughAmount,
    buyGoldThroughGrams,
    buySilverThroughAmount,
    buySilverThroughGrams,
    closeSignInModal,
    differentAmountButtonHandler,
    giftInputBoxChangeHandler,
    inputBoxChangeHandler,
    metalChangeHandler,
    profileBtnClicked,
    sellGoldThroughAmount,
    sellGoldThroughGrams,
    sellInputBoxChangeHandler,
    sellSilverThroughAmount,
    sellSilverThroughGrams,
  } = augmontGoldContext;

  const [inVoiceFetched, setInVoiceFetched] = useState(false);

  const fetchInvoice = async () => {
    let options = {
      url: `https://demowvuat.augmont.com/api/digital-gold/buy/generate-invoice/${item.transactionId}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };

    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
    } catch (err) {}
  };

  if (orderOption.page == "buy") {
    return (
      <div className="w-full flex flex-col gap-y-6 border-2 p-3 rounded-xl">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Date</h1>
            <h1>{item.createdAt.substr(0, 10)}</h1>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Transaction Id</h1>
            <h1>{item.transactionId}</h1>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Narration</h1>
            <h1>
              {item.type == "gold" ? "Gold Bought " : "Silver Bought "}
              {item.qty} gm
            </h1>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Amount</h1>
            <h1>{item.inclTaxAmt}</h1>
          </div>
        </div>
        {/* <button
          className="border-2 w-1/2 self-center bg-green-500 text-white"
          onClick={fetchInvoice}
        >
          Get Invoice
        </button> */}
      </div>
    );
  } else if (orderOption.page == "sell") {
    return (
      <div className="w-full flex flex-col gap-y-6 border-2 p-3 rounded-xl">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Date</h1>
            <h1>{item.createdAt.substr(0, 10)}</h1>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Transaction Id</h1>
            <h1>{item.transactionId}</h1>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Narration</h1>
            <h1>
              {item.type == "gold" ? "Gold Sell " : "Silver Sell "}
              {item.qty} gm
            </h1>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <h1>Amount</h1>
            <h1>{item.amount}</h1>
          </div>
        </div>
        {/* <button
          className="border-2 w-1/2 self-center bg-green-500 text-white"
          onClick={fetchInvoice}
        >
          Get Invoice
        </button> */}
      </div>
    );
  }
};

export default SingleOrder;
