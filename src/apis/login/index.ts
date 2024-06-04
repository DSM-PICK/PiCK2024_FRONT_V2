import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { cookie } from "utils/auth";
import { Login } from "./request";

export const useLogin = () => {
  const BASEURL = process.env.REACT_APP_BASE_URL;

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: (param: Login) => {
      return axios
        .post(`${BASEURL}/admin/login`, {
          ...param,
        })
        .then((response) => {
          const data = response.data;
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          cookie.set("access_token", data.access_token);
          cookie.set("refresh_token", data.refresh_token);
          return data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });

  if (loginMutation.isError) {
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    cookie.remove("part");
    console.error(loginMutation.error);
  }

  return {
    mutate: loginMutation.mutate,
    accessToken,
    refreshToken,
  };
};
