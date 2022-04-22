import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";
import twitterimg from "./icons8-twitter.svg";
import html2canvas from "html2canvas";

function App() {
  const [data, setData] = useState({});
  const [id, setId] = useState("");
  const [url, seturl] = useState("");
  const textRef = useRef();
  const ctnRef = useRef();

  let fid = () => {
    console.log(textRef);
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
      .get(`${process.env.REACT_APP_URL}/api/2/tweets?id=${id}`, {})
      // .get(`/api/2/tweets?id=${id}`, {})
      .then((response) => {
        setData(response.data);
        console.log(data);
        console.log("loading completed");
      })
      .catch((err) => console.log(err));
  }

  function download(e) {
    html2canvas(document.querySelector(".container")).then((canvas) => {
      const base64img = canvas.toDataURL("image/png");
      let anchor = document.createElement("a");
      anchor.setAttribute("href", base64img);
      anchor.setAttribute("download", "twt-img.png");
      anchor.click();
      anchor.remove();
    });
  }

  return (
    <div className="App">
      <div className="navbar">
        <input
          id="url"
          type="text"
          placeholder="Paste URL of tweet"
          onClick="this.select();"
          onPaste={(e) => {
            seturl(e.target.value);
            // console.log(url);
            setId(textRef.current.value?.split("/")[5]?.split("?")[0]);
          }}
          onChange={(e) => {
            seturl(e.target.value);
            // console.log(url);
            setId(textRef.current.value?.split("/")[5]?.split("?")[0]);
          }}
          ref={textRef}
        ></input>
        <button onClick={fid}>&#x27A7;</button>
      </div>

      {data.data && (
        <>
          <div className="container" ref={ctnRef}>
            <div className="card">
              <div className="head">
                <div className="left">
                  <img
                    id="dp"
                    src={data.includes.users[0].profile_image_url}
                    alt="profile"
                    className="src"
                  />
                </div>

                <div className="right">
                  <div className="name">{data.includes.users[0].name}</div>
                  <div className="uname">
                    @{data.includes.users[0].username}
                  </div>
                </div>
                <img id="logo" src={twitterimg} alt="twitter" />
              </div>

              <div className="body">{data.data.text}</div>

              <div className="footer"></div>
            </div>
          </div>

          <button id="dwnld" onClick={(e) => download(e)}>
            Download
          </button>
        </>
      )}
      <div className="card"></div>
    </div>
  );
}

export default App;
