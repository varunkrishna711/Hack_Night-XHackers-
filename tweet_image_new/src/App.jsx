import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";

function App() {
  const [data, setData] = useState({});
  const [id, setId] = useState("");
  const [url, seturl] = useState("");
  const textRef = useRef();

  let fid = () => {
    console.log(textRef.current.value);
    seturl(textRef.current.value);
    console.log(url);
    setId(textRef.current.value?.split("/")[5]?.split("?")[0]);
    console.log(id);
    getdata();
  };

  // function fid1() {
  //   seturl(textRef.current.value);
  //   setId(textRef.current.value?.split("/")[5]?.split("?")[0]);
  // }

  function getdata() {
    console.log("loading");
    axios
      .get(`/api/2/tweets?id=${id}`, {})
      .then((response) => {
        setData(response.data);
        console.log(data);
        console.log("loading completed");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <div className="navbar">
        <input
          id="url"
          type="text"
          placeholder="Paste URL of tweet"
          // onPaste={fid1}
          ref={textRef}
        ></input>
        <button onClick={fid}>submit</button>
      </div>
    </div>
  );
}

export default App;
