import { createRefresh } from "react-auth-kit";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";

const UpdateState = (newToken) => {
  const auth = useAuthUser();
  auth().token = newToken;
};

const refreshApi = createRefresh({
  interval: 1, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    return await axios
      .post("https://notemy-api.deta.dev/api/v1/auth/token/refresh/", "", {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3OTY0MDM5OSwianRpIjoiZjZiZTUxODktMDU4OC00M2NmLTk4NDQtMDAzOTgwMDgwMmJjIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOjEsIm5iZiI6MTY3OTY0MDM5OSwiZXhwIjoxNjgwMjQ1MTk5fQ.rPU9dlSh3Py6ylUDf8u_idysTeWtwXK9QqQB3S0Frbo",
        },
      })
      .then((res) => {
        const accessToken = res.data["access token"];
        UpdateState(accessToken);
        //authUserState.token = accessToken;
        // const signIn = useSignIn();
        //const auth = useAuthUser();
        // const email = auth().email;
        // const username = auth().username;
        console.log(accessToken);
        // const authUserState = {
        //   email: email,
        //   username: username,
        //   token: accessToken,
        // };
        // if (
        //   signIn({
        //     token: accessToken,
        //     expiresIn: 900,
        //     tokenType: "Bearer",
        //     authState: authUserState,
        //     refreshToken: refreshToken, // Only if you are using refreshToken feature
        //     refreshTokenExpireIn: 604800 - 900, // Only if you are using refreshToken feature
        //   })
        // )
        return {
          isSuccess: true, // For successful network request isSuccess is true
          newAuthToken: accessToken,
          newAuthTokenExpireIn: 900,
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
