import React, { useState } from "react";
import "./topnavbar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";

const Topbar = () => {

    const [mode, setMode] = useState("light");


    const changeMode=()=>
    {
        if(mode === "light")
            setMode("dark")
        else setMode("light")

        document.body.className = mode === "light" ? "dark-theme":"light-theme";
    }

    return <React.Fragment>
        <div className="navbar">
            <span className="title">Where in the world?</span>
            <span className="mode-info" onClick={changeMode}>{mode === "light"?<><IoSunnyOutline/><span>Light Mode</span></>:<><IoMdMoon/><span>Dark Mode</span></>}</span>
        </div>
    </React.Fragment >
}

export default Topbar;