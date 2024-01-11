import "../styles/simulation.css"
import YouTube from 'react-youtube';
import React, { useEffect, useState } from 'react';

export default function Simulation() {

  const [showText, setShowText] = useState(false);


  const opts = {
    width: "100%",
    height: "100%",
    // height: '390',
    // width: '640',
    playerVars: {
      autoplay: 1,//자동 재생 여부 
      modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
      loop: 1, //반복 재생
      playlist: "BSWo2WduxgE", //반복 재생으로 재생할 플레이 리스트
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };


useEffect(() => {
    setTimeout(() => {
      setShowText(true);
    }, 2000);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
    <div className="simul_backcolor">
    <h2 className={showText ? "simulation_top animation" : "simulation_top"}  style={showText ? {} : { paddingLeft: "10px" }}>
            {showText ? "Self impression for bleaching frame at home" : "How to ?"}
          </h2>
          </div>

        <div className="middleTxt"></div>
        <div className="player">
        <YouTube 
          className="youtube-player"
          videoId="BSWo2WduxgE" opts={opts} onReady={onReady} />
        </div>

    </>
  );
}
