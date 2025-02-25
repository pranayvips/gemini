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
            <h5><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
 Login</h5>
            <div className="left">
            <h2>Name <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</h2>
            <div className="name">
                <input type="text" placeholder='Enter Your Name' spellCheck="false" onKeyDown={enter}  onSubmit={enter}/>
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
            <button onClick={submit} val='0'>Next <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
</svg>
</button>
            </div>
        </div>
    )
}

export default Login;