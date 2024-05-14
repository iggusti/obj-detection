import "./App.css";

import * as coco from "@tensorflow-models/coco-ssd";
import * as tfjs from "@tensorflow/tfjs";

import React, { useEffect, useState } from "react";

import Webcam from "react-webcam";

function App() {
  const [model, setModel] = useState("");
  const [obj, setObj] = useState("");

  const videoConstraints = {
    width: 750,
    height: 500,
    facingMode: "user",
  };

  async function loadModel() {
    try {
      const load = await coco.load();
      setModel(load);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    tfjs.ready().then(() => loadModel());
  }, []);

  async function detect() {
    const detect = await model.detect(document.getElementById("object"));
    const output =
      detect.length &&
      detect.map((el) => `${el.class}: ${el.score}`).join(", ");

    setObj(output);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Object Detection Iseng</h1>
        <button onClick={() => detect()} style={{ margin: 1 + "em" }}>
          Detect
        </button>
        <h4>{obj}</h4>
        <Webcam audio={false} videoConstraints={videoConstraints} id="object" />
      </header>
    </div>
  );
}

export default App;
