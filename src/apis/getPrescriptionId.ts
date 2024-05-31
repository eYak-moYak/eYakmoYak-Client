import { isAxiosError } from "axios";
import instance from "./axiosInstance";

//약 id에 따른 세부 복약정보 가져오는 api
const getPresId = async (prescriptionId: string) => {
  try {
    const res = await instance.get(`/get/prescription/${prescriptionId}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const statusCode = error.response?.status;
      let errorMessage = "error occurred";
      if (!statusCode) {
        errorMessage = "Network error";
      } else if (statusCode >= 500) {
        errorMessage = "Server error";
      } else if (statusCode === 400 || statusCode === 404) {
        errorMessage = "잘못된 요청";
      }
      throw new Error(errorMessage);
    } else {
      throw new Error("unknown error");
    }
  }
};

export default getPresId;
