import React, { useContext, useState } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    currentIcon,
    currentName,
    setcurrentName,
    setExtended,
  } = useContext(Context);

  const [suggestion, setSuggestion] = useState(false);

  function signOut() {
    localStorage.removeItem("login");
    setcurrentName("");
    document.querySelector(".login").style.display = "flex";
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".main").style.display = "none";
  }
  function closeVoice(){
    document.querySelector(".main .blurry").style.display = "none";
    document.querySelector(".main .voice").style.display = "none";
  }
  function openVoice(){
    document.querySelector(".main .blurry").style.display = "block";
    document.querySelector(".main .voice").style.display = "flex";
    document.querySelector(".main .voice .value textarea").textContent = "";
    voiceToText();

  }
  function voiceToText() {
    document.querySelector(".main .voice .value div svg").style.animation = " mic-active 1s infinite";
    const startButton = document.querySelector(".main .voice .bottom h2");
    const outputDiv = document.querySelector(".main .voice .value textarea");


    // Create a new SpeechRecognition object
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)();

    // Set the language of the recognition
    recognition.lang = "en-US";

    // Event listeners for the recognition
    recognition.onresult = (event) => {
      outputDiv.textContent += ` ${event.results[0][0].transcript}`;
    };

    // Event listeners for the start and end of the recognition
    recognition.onstart = () => (startButton.textContent = "Listening...");
    recognition.onend = () => {
      startButton.textContent = "Click on Mic to Speak again...";
      document.querySelector(".main .voice .value div svg").style.animation = "none";
    };
    recognition.start();
  }
  function voiceSearchGo(){
    let value = document.querySelector(".main .voice .value textarea").value;
    closeVoice();
    setInput(()=>{
      return value;
    });
    onSent(value,true);
  }
  function openMenu(_) {
    document.querySelector(".main .nav .user-icon .user-icon-img").blur();
    document.querySelector(".sidebar").classList.toggle("sidebar-expanded");
    setExtended((prev) => !prev);
  }

  return (
    <div className="main">
      <div className="nav">
        <div className="top-nav">
          <div
            onClick={() => {
              if (suggestion) {
                setTimeout(() => {
                  setSuggestion((prev) => !prev);
                }, 1000);
                gsap.to(".card", {
                  opacity: 1,
                  x: "100vw",
                  stagger: { each: 0.1, from: "end" },
                  duration: 1,
                });
              } else {
                setSuggestion((prev) => !prev);
                gsap.to(".card", {
                  opacity: 1,
                  x: "0",
                  stagger: 0.1,
                  duration: 1,
                  delay: 1,
                });
              }
            }}
          >
            <p>Gemini</p>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <h2>2.0 Flash</h2>
        </div>
        <div className="user-icon">
          <button className="user-icon-img" name={currentName}>
            <img src={currentIcon} alt="" />
            <div className="user-icon-popup">
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <h2>Change Name</h2>
              </div>
              <div>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <h2>Change Icon</h2>
              </div>
              <div className="menu" onClick={openMenu}>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <h2>Menu</h2>
              </div>
              <hr />
              <div onClick={signOut}>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
                <h2>Sign Out</h2>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={"greet " + (suggestion ? "" : "greet-show")}>
              <p>
                <span>
                  {suggestion ? "Ask any questions!" : "Helloo, " + currentName}
                </span>
              </p>
            </div>

            <div className={"cards " + (suggestion ? "cards-show" : "")}>
              <div className="card">
                <p>Suggest beautiful place to see on an upcoming road trip</p>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <div className="card">
                <p>Briefly summarize this concept : (for ex:) urban planning</p>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <div className="card">
                <p>Brainstroming team bonding activities for our retreat</p>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <div className="select">
              <button>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="select-btn"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <div className="select-opt">
                <div>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>{" "}
                  <p>Image</p>
                </div>
                <div>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                    />
                  </svg>
                  <p>Files</p>
                </div>
                <div>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  <p>Drive</p>
                </div>
              </div>
            </div>
            <input
              className="input-input"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(event)=>{if (event.key === "Enter")onSent()}}
              onSubmit={() => onSent()}
              type="text"
              placeholder="Ask Gemini"
            />
            <div className="input-option" name={input ? "Search" : "Mic"}>
              {input ? (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="input-search"
                  onClick={() => onSent()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="input-mic"
                  onClick={openVoice}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              )}
            </div>
          </div>
          {/* <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, so double-check its responses. your privacy and Gemini Apps
                </p> */}
        </div>
      </div>
      <div className="blurry" onClick={closeVoice}></div>
      <div className="voice">
        <div className="option">
          <button id="clear" onClick={()=>{document.querySelector(".main .voice .value textarea").value=""}}>Clear</button>
          <select id="language">
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
        <div className="value">
          <textarea name="" id="" placeholder="Speak something to get output here..."></textarea>
          <div onClick={voiceToText}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
          </svg>
              </div>
        </div>
        <div className="bottom">
          <h2>Speak now...</h2>
          <button className="voice-submit" onClick={voiceSearchGo}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
