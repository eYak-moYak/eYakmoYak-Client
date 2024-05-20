import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

const KaKaoRedirectHandler = (props: Props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("페이지 이동하는 중...");

  useEffect(() => {
    console.log("Fetching tokens...");

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access");
    console.log("Access Token:", accessToken);

    axios
      .get(`${process.env.REACT_APP_API_URL}/check-refresh-token`, {
        withCredentials: true,
      })
      .then((response) => {
        const refreshToken = response.data;
        console.log("Refresh Token:", refreshToken);

        if (accessToken && refreshToken !== "No refresh token found") {
          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("access", accessToken);
          localStorage.setItem("refresh", refreshToken);

          setMessage("로그인 중....");
          setTimeout(() => {
            navigate("/upload");
          }, 1000);
        } else {
          console.error("Missing tokens. Redirecting to login.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching cookies:", error);
        navigate("/");
      });
  }, [navigate]);
  return <div>{message}</div>;
};

export default KaKaoRedirectHandler;
