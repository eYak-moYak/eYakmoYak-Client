import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instanceWithToken from "../../../apis/axiosInstance";

type Props = {};

/** 카카오톡 리다이렉트시 호출되는 함수 */
const KaKaoRedirectHandler = (props: Props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Redirecting…");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access");

    if (accessToken) {
      localStorage.setItem("access", accessToken);

      fetchPremedList(accessToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchPremedList = async (accessToken: string) => {
    try {
      const response = await instanceWithToken.get("/get/premedList", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);

      if (response.status === 200 && response.data) {
        setMessage("Success");

        setTimeout(() => {
          navigate("/upload");
        }, 1000);
      } else {
        setMessage("Failed");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching premed list:", error);
      setMessage("Failed");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return <div>{message}</div>;
};

export default KaKaoRedirectHandler;
