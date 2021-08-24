import React from 'react';
import "./main.css";
import Topbar from "./navbarcomponent/Topbar";
import Profile from "./profilecomponent/profile"
import Grades from "./gradescomponent/Grades"
import Classes from "./classescomponent/classes"



const MainMenu = () => {
  return (


    <>
        <div>
        </div>
        <Topbar/>

        <div className = "mainBody">
          <div className = "flexSpace">
          </div>

              <div className = "flexComponent">  <Profile/>
                </div>
                <div className = "flexComponent"> <Grades/>
                </div>
                <div className = "flexComponent"> <Classes/>
                </div>
          <div className = "flexSpace">
          </div>

        </div>
    </>
  );
};

export default MainMenu;
