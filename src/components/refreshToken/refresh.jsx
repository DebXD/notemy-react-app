import { createRefresh } from "react-auth-kit";
import axios from "axios";

const refreshApi = createRefresh({
  interval: 10, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    return await axios
      .post(
        "https://notemyapi-1-b7327629.deta.app/api/v1/auth/token/refresh/",
        "",
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3OTY0MDM5OSwianRpIjoiZjZiZTUxODktMDU4OC00M2NmLTk4NDQtMDAzOTgwMDgwMmJjIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOjEsIm5iZiI6MTY3OTY0MDM5OSwiZXhwIjoxNjgwMjQ1MTk5fQ.rPU9dlSh3Py6ylUDf8u_idysTeWtwXK9QqQB3S0Frbo",
          },
        }
      )
      .then((res) => {
        const accessToken = res.data["access token"];
        console.log(accessToken);
        const authState = localStorage.getItem("_auth_state");
        const newAuthState = JSON.parse(authState);
        newAuthState.token = accessToken;
        console.log(newAuthState);

        return {
          isSuccess: true, // For successful network request isSuccess is true
          newAuthToken: accessToken,
          newAuthTokenExpireIn: 900,
          newAuthUserState: newAuthState,
          // You can also add new refresh token ad new user state
        };
      })
      .catch((error) => {
        console.error(error);
        return {
          isSuccess: false,
        };
      });
  },
});

export default refreshApi;
