
import { useState, React, useEffect} from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notes = () => {
    let accessToken = Cookies.get('AccessToken')
    let refreshToken = Cookies.get('RefreshToken')
    let navigate = useNavigate()
    
    useEffect(() =>{
            if (accessToken | refreshToken === undefined){
                navigate('/login')
                console.log("no auth")
                
                
                
                
            }
        },[accessToken, refreshToken, navigate])
        
    // const getNotes = async(acc) =>{
    //     let token = accessToken
    //     let response = await axios.get('https://notemy-api.deta.dev/api/v1/auth/login/',)
        
    // }
    return (
        
        <>

        <div className="container">
            <p>Hi there</p>
            <button className="btn btn-primary">LOL</button>

            

        </div>
        </>
    )
}

export default Notes;