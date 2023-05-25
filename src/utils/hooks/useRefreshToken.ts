import { useSession } from "next-auth/react";
import notemyApi from "../api/api";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await notemyApi.post("/auth/token/refresh/", "", {
      headers: {
        Authorization: `Bearer ${session?.user.refresh_token}`,
      },
    });
    // Update session access_token
    // console.log(session?.user.access_token);
    if (session && res.data) {
      session.user.access_token = res.data["access_token"];
      console.log("refreshed");
    }
    // console.log(session?.user.access_token);
  };
  return refreshToken;
};
