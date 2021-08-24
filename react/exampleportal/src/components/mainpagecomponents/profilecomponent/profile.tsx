//import React from 'react';
//import { useState } from 'react';
import { Storage } from "aws-amplify";
import "./profile.css"

import React, { useState, useEffect} from 'react';

import {useSelector} from 'react-redux';

import { RootState } from "../../../redux/store";


/**
 * @author zacha
 * @returns Profile information in a small frame
 */

const Profile = () => {

    const [images, setImages] = useState([]);

    const state = useSelector((state: RootState) => state.auth.user);

    //use effect for getting the image
    useEffect(() => {
        getImages(state.profilePicture);
    }, []);

    /**
     * @author zacha
     * gets an image from s3 bucket
     */
    async function getImages(imgToSendd:any) {
        console.log("inside getImages function ");
    
          const imageKeyss:any = await Storage.list(imgToSendd);
          const imageKeyss2:any = await Promise.all(
            imageKeyss.map(async (k:any) => {
              const signedUrl = await Storage.get(k.key);
              return signedUrl;
            })
          );
          console.log("profile  ",imageKeyss2);
          setImages(imageKeyss2); 
         return(imageKeyss2);
      }   


      return (
        <>
        <div className = "profileContent">
            <div className = "componentTitle">
                <h2>Profile</h2>
                <hr></hr>
            </div>

            <div className = "imagemaker">
                {
                images.map(image =>(
                    <img  className="profileUserImg"  src={image} key={image} alt="" />   ))
                } 
            </div> 
            <div>
                <h3> Name: {state.firstName} {state.lastName}</h3>
                <h3>Date of Birth: {state.dateOfBirth.substr(0,10)}</h3>
                <h3>Street Address: {state.streetAddress}</h3>
                <h3>City: {state.city} State: {state.state} Zip: {state.zipcode}</h3>
                
            </div> 
            <div>
                
            </div> 
            <div>
                
            </div>  
        </div>
        </>
      )

    
    


}



export default Profile;