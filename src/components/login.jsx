import { useState, React } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();

  const loginBtnStyle = {
    margin: "auto",
    marginTop: "20px",
    padding: "10px",
    color: "blue",
    textAlign: "center",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [AccessToken, setAccessToken] = useCookies([""]);
  // const [RefreshToken, setRefreshToken] = useCookies([""]);

  // useEffect(()=>{
  //     let accessToken = Cookies.get('AccessToken')
  //     let refreshToken = Cookies.get('RefreshToken')
  //     if (accessToken || refreshToken === undefined){
  //         navigate("/")
  // }
  // }, [navigate])
  const [showPassword, setShowPassword] = useState(false);
  const handleCheckbox = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  let loginCredentials = {
    email: email,
    password: password,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${props.apiurl}auth/login/`,
        loginCredentials,
        config
      );
      const data = response.data;
      //console.log(data)
      console.log(loginCredentials);
      props.setIsLoggedIn(true);
      let accessToken = await data["user"]["access token"];
      //let refreshToken = await data['user']['refresh token'];
      // Set cookie
      Cookies.set("AccessToken", accessToken);
      //Cookies.set('RefreshToken', refreshToken)
      navigate("/");
    } catch {
      if (!email || !password) {
        alert("email or password can't be empty");
      }
      alert("Unauthorized");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Login</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="name@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
            {showPassword ? (
              <input
                type="text"
                className="form-control input-sm"
                value={password}
                disabled
              />
            ) : (
              ""
            )}
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={handleCheckbox}
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Show Password
              </label>
            </div>
          </div>
        </div>
        <div style={loginBtnStyle}>
          <button type="submit" className="btn btn-secondary">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
