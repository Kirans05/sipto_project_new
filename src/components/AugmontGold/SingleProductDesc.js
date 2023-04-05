import axios from "axios";
import React, { useContext, useEffect } from "react";
import { MainUseContext } from "../../context/MainUseContext";

const SingleProductDesc = () => {
  const storeState = useContext(MainUseContext);
  let { augmontGoldContext } = storeState;
  let {
    merchantId_AccessToken,
    deliverProdDetails,
    setDeliverProdDetails,
    variousOptions,
  } = augmontGoldContext.augmontGoldData;

  const getSingleProductDetails = async () => {
    let options = {
      url: `https://uat-api.augmontgold.com/api/merchant/v1/products/${variousOptions.deliverProductId}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${merchantId_AccessToken.accessToken}`,
      },
    };

    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      if (fetchResponse.status == 200) {
        if (
          fetchResponse.data.statusCode == 200 &&
          fetchResponse.data.message == "Product retrieved successfully."
        ) {
          setDeliverProdDetails(fetchResponse.data.result.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleProductDetails();
  }, []);

  return (
    <div className="w-full border-2 border-slate-300 rounded-lg p-4 flex flex-col gap-y-6">
      {deliverProdDetails == "" ? null : (
        <div className="flex flex-col md:flex-row justify-between gap-x-5 gap-y-10">
          {deliverProdDetails == "" ? null : (
            <img
              src={deliverProdDetails.productImages[0].url}
              alt={"Product Image"}
              className="w-full md:w-1/3 border-2 border-slate-300 rounded-2xl h-80 self-center"
            />
          )}
          <div className="w-full flex flex-col gap-y-5 px-0 md:px-5">
            {/* first row */}
            <div className="flex flex-col md:flex-row md:justify-between px-0 gap-y-5">
              {/* first column */}
              <div className="flex flex-col gap-y-1">
                <h1 className="font-semibold text-md">
                  {deliverProdDetails.name}
                </h1>
                <h1 className="text-sm">SKU : {deliverProdDetails.sku}</h1>
                <h1 className="font-semibold text-md">
                  Rs {deliverProdDetails.basePrice}
                </h1>
              </div>
              {/* second column */}
              <div>
                <h1 className="font-semibold text-md">Quantity - 1</h1>
              </div>
            </div>
            <hr className="border-b-2" />
            <h1 className="text-center font-semibold text-sm">
              Expected Delivery Date 28/03/2023
            </h1>
            <hr className="border-b-2" />
            {/* third row */}
            <div className="flex flex-col gap-y-2 px-0 md:px-52">
              <div className="flex justify-between">
                <h1>SKU</h1>
                <h1>{deliverProdDetails.sku}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Actual Weight(gms)</h1>
                <h1>{deliverProdDetails.productWeight}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Redeem Weight(gms)</h1>
                <h1>{deliverProdDetails.redeemWeight}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Purity</h1>
                <h1>{deliverProdDetails.purity}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Metal Type</h1>
                <h1>{deliverProdDetails.metalType}</h1>
              </div>
            </div>
            <hr className="border-b-2" />
            <button className="h-11 border-2 w-full md:w-1/2 self-center bg-emerald-800 text-white rounded-xl">
              Request Delivery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductDesc;












// Request URL: https://demowvuat.augmont.com/api/digital-gold/gift-gold-silver
// Request Method: POST
// Status Code: 200 OK
// Remote Address: 3.109.230.64:443
// Referrer Policy: strict-origin-when-cross-origin


// amount
// : 
// "5717.18"
// currentUserMobileNumber
// : 
// "7624829864"
// customerExists
// : 
// false
// firstName
// : 
// "jeevan"
// four
// : 
// "4"
// lastName
// : 
// "gowda"
// metalType
// : 
// "gold"
// mobileNumber
// : 
// "8150926265"
// one
// : 
// "1"
// otp
// : 
// "1234"
// quantity
// : 
// "1"
// referenceCode
// : 
// "W8oVX"
// stateId
// : 
// "eyqMQqYd"
// three
// : 
// "3"
// two
// : 
// "2"
// utmCampaign
// : 
// ""
// utmMedium
// : 
// ""
// utmSource
// : 
// ""



// {res: {statusCode: 200, message: "Successfully transferred 1 gms of gold",…}}
// res
// : 
// {statusCode: 200, message: "Successfully transferred 1 gms of gold",…}
// message
// : 
// "Successfully transferred 1 gms of gold"
// result
// : 
// {data: {metalType: "gold", quantity: "1", goldBalance: "1.4784", receiverGoldBalance: "1.0000",…}}
// data
// : 
// {metalType: "gold", quantity: "1", goldBalance: "1.4784", receiverGoldBalance: "1.0000",…}
// createdAt
// : 
// "2023-03-15T05:12:23.000000Z"
// goldBalance
// : 
// "1.4784"
// merchantTransactionId
// : 
// "11023eewk38lf9872b9LF7RWJB6"
// metalType
// : 
// "gold"
// mobileNumber
// : 
// "8150926265"
// quantity
// : 
// "1"
// receiverGoldBalance
// : 
// "1.0000"
// transactionId
// : 
// "NP641516788571432450162379"
// statusCode
// : 
// 200







// Request URL: https://demowvuat.augmont.com/api/digital-gold/gift-gold-silver/11023eewk38lf9872b9LF7RWJB6
// Request Method: GET
// Status Code: 200 OK
// Remote Address: 3.109.230.64:443
// Referrer Policy: strict-origin-when-cross-origin



// message
// : 
// "Transfer Transaction Record Exists"
// result
// : 
// {data: {senderUniqueId: "LF7RWJB6", receiverUniqueId: "LF98728W", metalType: "gold", quantity: 1,…}}
// data
// : 
// {senderUniqueId: "LF7RWJB6", receiverUniqueId: "LF98728W", metalType: "gold", quantity: 1,…}
// createdAt
// : 
// "2023-03-15T05:12:23.000000Z"
// merchantTransactionId
// : 
// "11023eewk38lf9872b9LF7RWJB6"
// metalType
// : 
// "gold"
// quantity
// : 
// 1
// receiverUniqueId
// : 
// "LF98728W"
// senderUniqueId
// : 
// "LF7RWJB6"
// transactionId
// : 
// "NP641516788571432450162379"
// statusCode
// : 
// 200