import notemyApi from "../api/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = notemyApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${session?.user.access_token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = notemyApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          //prevRequest.sent(true);
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.user.access_token}`;
          return notemyApi;
        }
        return Promise.reject(error);
      }
    );
    return () => {
      notemyApi.interceptors.request.eject(requestIntercept);
      notemyApi.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return notemyApi;
};

export default useAxiosAuth;
