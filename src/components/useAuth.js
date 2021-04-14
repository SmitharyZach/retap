import { useState, useEffect } from "react";
import axios from "axios";

let url = process.env.PORT || "http://localhost:3001";

export default function useAuth(code) {
  const [accesssToken, setAccessToken] = useState();
  useEffect(() => {
    axios
      .post(`/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.response.access_token);
        window.history.pushState({}, null, "/dashboard");
        console.log(accesssToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code]);

  return accesssToken;
}
