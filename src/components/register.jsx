import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
    const registerBtnStyle = {
        textAlign: "center",
        color: "green",
        margin : '20px'
    }
    let navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length>4 && password.length>6){
            registration()
        }
        else{
            alert("make sure your credentials are valid");
        }
        
    }

    let SignUpCredentials = {
        "username" : username,
        "email" : email,
        "password" : password
      }
    const registration = async() => {
        let config= {
          headers: {
          'Content-Type': 'application/json',
          }}

          try{
              const response = await axios.post(`${props.apiurl}auth/register/`, SignUpCredentials ,config)
              const data = response.data
              console.log(data)
              navigate("/login");
          }
          catch (e){
            console.log(e.response.data.message)
            alert(e.response.data.message)

          }

    }
	return(
		<div className='container'>
            <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-4 mx-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail3" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
        </div>
        <div className="row mb-3 mt-4 mx-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
        </div>
        <div className="row mb-3 mx-4 pt-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
        <div className='' style={registerBtnStyle}>
        <button type="submit" className="btn btn-outline-secondary" style={registerBtnStyle}>Submit</button>
        </div>
        
        </form>
	</div>
	)
}

export default Register;
