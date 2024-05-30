import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
