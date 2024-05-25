// axiosInstance.js
import axios from "axios";

// 액세스 토큰을 가져오는 함수 (예: 로컬 스토리지에서 가져오기)
const getAccessToken = () => {
  return localStorage.getItem("access");
};

// Axios 인스턴스 생성
const instanceWithToken = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 설정
instanceWithToken.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instanceWithToken;
