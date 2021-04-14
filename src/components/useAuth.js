import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accesssToken, setAccessToken] = useState();
  useEffect(() => {
    axios
      .post(`/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.response.access_token);
        window.history.pushState({}, null, "/");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code]);

  return accesssToken;
}
