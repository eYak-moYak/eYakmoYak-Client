import { isAxiosError } from "axios";
import instanceWithToken from "./axiosInstanceWithToken";

interface Medicine {
  name: string;
  dose_time: string;
  meal_time: number;
  imgUrl: string;
}

interface PrescriptionData {
  pre_name: string;
  hospital: string;
  pharmacy: string;
  pre_date: string;
  start_date: string;
  end_date: string;
  medicines: Medicine[];
}

// 처방약 등록 API
const addPresc = async (data: PrescriptionData) => {
  try {
    const res = await instanceWithToken.post(
      `${process.env.REACT_APP_API_URL}/add/prescription`,
      data,
    );
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

export default addPresc;
