import { Storage } from "aws-amplify";


import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Dispatch } from "react";
// import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
//import './Login.css';
//import sample from './fire.mp4';
import {useSelector} from 'react-redux';
import "./classes.css"


const Classes = () => {


      return (
        <>
            <div className = "profileContent">
                <div className = "componentTitle">
                    <h2>Classes</h2>
                    <hr></hr>
                </div>
                <h3>Information about your classes</h3>
            </div> 
        </>
      )

    
    


}



export default Classes;