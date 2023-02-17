import { useState, useEffect, React} from "react"

const Login = (props) => {
    const loginBtnStyle = {
            margin: "auto",
            marginTop : "20px",
            padding: "10px",
            color: "blue",
            textAlign : "center"
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
       if (isLoggedIn){

       }
    }, [isLoggedIn])
        
      
    let loginCredentials = {
        "email" : email,
        "password" : password
      }
      
      async function handleSubmit(e) {
          e.preventDefault();
          const response = await fetch('https://notemy-api.deta.dev/api/v1/auth/login/',{
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginCredentials)})
        const data = await response.json()
        console.log(data)
        if (!email || !password){
          alert("email or password can't be empty")
      }
      else{
        setIsLoggedIn(true)
  }

      }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <h1>Login</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com"
                        onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
                        onChange={(e) => {setPassword(e.target.value)}}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <div style={loginBtnStyle}>
                    <button type="submit" className="btn btn-secondary">Login</button>
                </div>
                
            </form>
  
        </>
    )
}

export default Login;