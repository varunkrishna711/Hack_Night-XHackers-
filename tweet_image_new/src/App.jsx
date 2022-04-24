import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRef } from "react";
import twitterimg from "./icons8-twitter.svg";
import domtoimage from "dom-to-image";

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
    domtoimage
      .toJpeg(document.getElementById("node"), { quality: 0.99 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "tweet.jpeg";
        link.href = dataUrl;
        link.click();
      });
  }

  return (
    <div className="App">
      <div className="navbar">
        <input
          id="url"
          type="text"
          placeholder="Paste URL of tweet"
          onClick={(e) => e.target.select()}
          onPaste={(e) => {
            seturl(e.target.value);
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
          <div className="container-dup">
            <div id="node" className="container" ref={ctnRef}>
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
          </div>

          <button id="dwnld" onClick={(e) => download(e)}>
            Download
          </button>
        </>
      )}
    </div>
  );
}

export default App;
