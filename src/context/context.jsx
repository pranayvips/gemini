import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";
import { assets } from "../assets/assets";
export const Context = createContext();

const ContextProvider = (props)=>{
    // function oldSearches(){
    //     fetch('/data.json').then(response => response.json()) // Parse JSON
    //     .then(data => {setprevPrompts((_)=>{return data["Searches"];})}) // Work with JSON data
    //     .catch(error => console.error('Error fetching JSON:', error));
    // }

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setprevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");
    const [currentIcon,setcurrentIcon] = useState(assets.user_icon);
    const [currentName,setcurrentName] = useState(localStorage.getItem("login")?localStorage.getItem("login"):"");
    const [extended, setExtended] = useState(false);
    
    function loadSearches(){
        let val = localStorage.getItem("search-val");
        setprevPrompts((_)=>{
             if(val==null || val==undefined || val.length == 0){
                 return [];
             }
             return val.split("*{-~:~-*");
         })
     }

    // this will load the old searches only once
    useEffect(() => {
        loadSearches();
      }, []);

    function setSearches(input,data){
        let val = localStorage.getItem("search-val");
        if(val==null || val==undefined){
            val = "";
        }
        localStorage.setItem("search-val",input+"*{-~:~-*"+val)
        localStorage.setItem(input,data);
    }

    const delayPara = (index,nextWord)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt,alsoAdd=false)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            setRecentPrompt(prompt)
            if(alsoAdd){
                // will come under this when use come on search with voice
                response = await run(prompt);
                setprevPrompts(prev=>[...prev,prompt])
                setSearches(prompt,response);
            }else{
                // will come under this when user clicks on sidebar history tab
                response = localStorage.getItem(prompt);
            }
        }else{
            // will come under this when user types and press enter or click on send button
            setRecentPrompt(input)
            setprevPrompts(prev=>[...prev,input])
            response = await run(input);
            setSearches(input,response);
        }        
        setInput("")
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i]
            }else{
                newResponse += "<strong>"+responseArray[i]+"</strong>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")            
        }
        setLoading(false)
        
    }

    const contextValue = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        currentIcon,
        setcurrentIcon,
        currentName,
        setcurrentName,
        extended,
        setExtended,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;