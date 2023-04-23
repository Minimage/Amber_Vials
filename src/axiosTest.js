import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "./data.json";

export function AxiosTest() {
  const [myData, setMyData] = useState();
  const [ndc, setNDC] = useState();
  const [final, setFinal] = useState([]);
  const myarr = [];
  let resultString = "";

  let arr = [];

  Object.values(
    data.map((item, index) => {
      // console.log(item.NDC);
      arr.push(item.NDC);
    })
  );

  // console.log(arr);

  for (let i = 0; i < arr.length; i++) {
    const removeFirst = arr[i].slice(1);
    const removeLast = removeFirst.slice(0, -3);
    const addDash = removeLast.split("");
    addDash.splice(5, 0, "-");
    const NewString = addDash.join("");
    resultString += '"' + NewString + '",';
  }

  // Remove the extra comma at the end of the string
  const newstring = resultString.slice(0, -1);

  // console.log(
  //   `https://api.fda.gov/drug/ndc.json?search=product_ndc:${newstring}&limit=100`
  // );
  const moreData = () => {
    axios({
      method: "get",
      url: `https://api.fda.gov/drug/ndc.json?search=product_ndc:${newstring}&limit=100`
    }).then((response) => {
      Object.values(
        response.data.results.map((item, index) => {
          setFinal((final) => [...final, item]);
          // console.log("helo ");
        })
      );
    });
    console.log(final);
  };
  return (
    <div className="parent">
      <button onClick={moreData}>Submit</button>

      <div className="parent">
        {final.map((item, index) => {
          return (
            <div className="child">
              <p>{item.brand_name ? item.brand_name : item.generic_name}</p>
              <p>{item.product_ndc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
