import { createRefresh } from "react-auth-kit";
import axios from "axios";

const refreshApi = createRefresh({
  interval: 10, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({ refreshToken, authUserState }) => {
    try {
      const res = await axios.post<{ "access token": string }>(
        "https://search.arnabxd.me/api/v1/auth/token/refresh/",
        "",
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + refreshToken,
          },
        }
      );
      const accessToken = res.data["access token"];
      //console.log(accessToken);
      authUserState!.token = accessToken;
      //console.log(authUserState);

      return {
        isSuccess: true, // For successful network request isSuccess is true
        newAuthToken: accessToken,
        newAuthTokenExpireIn: 900,
        newAuthUserState: authUserState,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "",
      };
    }
  },
});

export default refreshApi;

// interface X<T> {
//   key1: T;
//   key2: string;
// }