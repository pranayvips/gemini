import './login.css'
import { assets } from "../../assets/assets";
import { Context } from '../../context/context';
import { useContext } from 'react';

function Login(){
    let isLogin = localStorage.getItem("login");
    const {setcurrentIcon,setcurrentName} = useContext(Context);
    function imgActive(ele){
        document.querySelectorAll(".login .image div").forEach((_)=>{
            _.classList.remove("image-active");
        });
        ele.target.parentElement.classList.add("image-active");
        setcurrentIcon(ele.target.getAttribute("src"))
    }
    function submit(_){
        if(_.target.getAttribute("val")=="0" && document.querySelector(".login .name input").value.length > 1){
            document.querySelector(".login .left").style.display = "none";
            document.querySelector(".login .right").style.display = "block";
            _.target.textContent = 'Submit';
            document.querySelector(".login h5").textContent = "Welcome, "+document.querySelector(".login .name input").value+" !"
            _.target.setAttribute("val","1")
        }else{
            setcurrentName(document.querySelector(".login .name input").value)
            document.querySelector(".login").style.display = "none";
            document.querySelector(".sidebar").removeAttribute("style");
            document.querySelector(".main").removeAttribute("style");
            localStorage.setItem("login",document.querySelector(".login .name input").value)
            // document.querySelector(".login .name input").value = ""
        }
    }
    function enter(event){
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".login button").click();
          }
    }
    return (
        <div className="login" style={{display: isLogin?"none":"flex",}}>
            <div className="icon">
                <img src={assets.gemini_icon} alt="" />
                <h1>Gemini</h1>
            </div>
            <div className="login-container">
            <h5>Login</h5>
            <div className="left">
            <h2>Name</h2>
            <div className="name">
                <input type="text" placeholder='Enter Your Name' onKeyDown={enter}  onSubmit={enter}/>
            </div>
            
            </div>
            <div className="right">
            <h2>Choose an avatar</h2>
            <div className='image'>
                <div onClick={imgActive} className='image-active'><img src={assets.user_icon} alt="" /></div>
                <div onClick={imgActive}><img src={assets.user_icon1} alt="" /></div>
                <div onClick={imgActive}><img src={assets.user_icon2} alt="" /></div>
                <div onClick={imgActive}><img src={assets.user_icon3} alt="" /></div>
            </div>
            </div>
            <button onClick={submit} val='0'>Next</button>
            </div>
        </div>
    )
}

export default Login;