import "./styles.css";
import axios from "axios";
import { useState } from "react";
import { AxiosTest } from "./axiosTest";

export default function App() {
  const [input, setInput] = useState();
  const [info, setInfo] = useState([]);
  const [medication, setMedication] = useState([]);
  const [myObject, setMyObject] = useState({ drugName: "atorvastatin" });
  const [name, setName] = useState({});
  const arr = [];

  const [shopCart, setShopCart] = useState({});
  let updatedValue = {};

  const drugs = { name: "", ndc: "" };

  const [hide, setHide] = useState("");

  const getData = () => {
    axios({
      method: "get",
      url: "https://sheetdb.io/api/v1/9319nfe371c4n",
    }).then((response) => {
      const mydata = response.data;
      // console.log(mydata);

      mydata.map((item, index) => {
        const removeFirst = item.NDC.slice(1);
        const removeLast = removeFirst.slice(0, -3);
        const addDash = removeLast.split("");
        addDash.splice(5, 0, "-");
        const NewString = addDash.join("");

        axios({
          method: "get",
          url: `https://api.fda.gov/drug/ndc.json?search=product_ndc:"${NewString}"`,
        })
          .then((response) => {
            // We need to grab brand_name instead of generic_name.
            // Brand_name will change depending on if its a generic or not

            // console.log(
            //   `${response.data.results[0].brand_name} ${response.data.results[0].active_ingredients[0].strength}`
            // );
            // console.log(response.data.results[0].labeler_name);

            const newdata = response.data.results[0].brand_name;

            response.data.results[0].brand_name +
              " " +
              response.data.results[0].active_ingredients[0].strength.split(
                "/"
              )[0] +
              " " +
              response.data.results[0].dosage_form;

            updatedValue = { name: newdata };
            setName();
            // console.log(name);

            setMedication([...medication, drugs]);
            setShopCart((shopCart) => ({
              ...shopCart,
              ...updatedValue,
            }));
            // console.log(shopCart);

            // console.log(index);
            setInfo((info) => [
              ...info,
              response.data.results[0].brand_name +
                " " +
                response.data.results[0].active_ingredients[0].strength.split(
                  "/"
                )[0] +
                " " +
                response.data.results[0].dosage_form,
            ]);

            console.log("this is data1 " + response.data.results[0]);
          })
          .catch(function (error) {});

        // return console.log(NewString);
      });
    });

    // console.log(arr);
  };

  return (
    <div className="App">
      <div className="show">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button onClick={""}>Submit</button>
        <button onClick={getData}>Submit</button>

        {info.map((item, index) => {
          return (
            <>
              <h1>{item}</h1>
            </>
          );
        })}
        <p>{Object.values(myObject)}</p>
      </div>
      <AxiosTest />
      {console.log(arr + "now")}
    </div>
  );
}
