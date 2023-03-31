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
            Authorization: "Bearer " + refreshToken,
          },
        }
      )
      .then((res) => {
        const accessToken = res.data["access token"];
        console.log(accessToken);
        authUserState.token = accessToken;
        //console.log(authUserState);

        return {
          isSuccess: true, // For successful network request isSuccess is true
          newAuthToken: accessToken,
          newAuthTokenExpireIn: 900,
          newAuthUserState: authUserState,
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
