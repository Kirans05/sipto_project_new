import axios from "axios";
import React, { useContext } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const CheckoutPage = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let {
    inputBoxValues,
    metalDetails,
    setVariousOptions,
    variousOptions,
    merchantId_AccessToken,
    userPassbook,
    setUserPassbook,
    setInputBoxValues,
  } = augmontGoldContext.augmontGoldData;

  let { differentAmountButtonHandler, inputBoxChangeHandler } =
    augmontGoldContext;

  const BuyMetalHandler = async () => {
    let data = new FormData();
    const merchantTransactionId = Math.random().toString(36).substring(2);
    if (
      variousOptions.metalSelected == "gold" &&
      variousOptions.purchaseType == "amount"
    ) {
      data.append("lockPrice", metalDetails.rates.gBuy);
      data.append("metalType", "gold");
      data.append("amount", inputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    } else if (
      variousOptions.metalSelected == "gold" &&
      variousOptions.purchaseType == "grams"
    ) {
      data.append("lockPrice", metalDetails.rates.gBuy);
      data.append("metalType", "gold");
      data.append("quantity", inputBoxValues.gramsBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    } else if (
      variousOptions.metalSelected == "silver" &&
      variousOptions.purchaseType == "amount"
    ) {
      data.append("lockPrice", metalDetails.rates.sBuy);
      data.append("metalType", "silver");
      data.append("amount", inputBoxValues.amountBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    } else if (
      variousOptions.metalSelected == "silver" &&
      variousOptions.purchaseType == "grams"
    ) {
      data.append("lockPrice", metalDetails.rates.sBuy);
      data.append("metalType", "silver");
      data.append("quantity", inputBoxValues.gramsBox);
      data.append("merchantTransactionId", merchantTransactionId);
      data.append("uniqueId", "17a8937e-ec5f-41bc-a1e2-f18e9dd7a664");
      data.append("blockId", metalDetails.blockId);
    }

    let options = {
      url: "https://uat-api.augmontgold.com/api/merchant/v1/buy",
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
      data: data,
    };
    try {
      let fetchResponse = await axios(options);
      if (fetchResponse.status == 200) {
        if (fetchResponse.data.statusCode == 200) {
          alert(fetchResponse.data.message);
          setUserPassbook({
            goldGrms: fetchResponse.data.result.data.goldBalance,
            silverGrms: fetchResponse.data.result.data.silverBalance,
          });
        }
      }
    } catch (err) {}
  };

  if (variousOptions.CheckoutPage.page == "buy") {
    return (
        <div>
          <h1>CheckoutPage</h1>
        </div>
      );
  } else {
    return (
      <div>
        <h1>CheckoutPage</h1>
      </div>
    );
  }
};

export default CheckoutPage;
