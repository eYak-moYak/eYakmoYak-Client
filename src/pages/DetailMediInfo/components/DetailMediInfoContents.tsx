import React, { useEffect, useState } from "react";
import axios from "axios";

type Medicine = {
  pre_id: number | null;
  name: string;
  start_date: string;
  end_date: string;
  dose_time: string;
  meal_time: number;
};

type Props = {
  prescriptionId: string;
};

const DetailMediInfoContents: React.FC<Props> = ({ prescriptionId }) => {
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 복용 시간대 포맷팅
  const timeMapping: { [key: string]: string } = {
    M: "아침",
    L: "점심",
    D: "저녁",
    N: "취침 전",
  };

  // 식사 후 복용 포맷팅
  const mealTimeMapping: { [key: number]: string } = {
    0: "식후 30분",
    1: "식후 즉시",
    2: "식전 30분",
    3: "식전 즉시",
  };

  const getPresIdApi = async () => {
    if (prescriptionId) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/get/prescription/${prescriptionId}`,
        );
        setPrescriptionData(res.data);
        console.log("API Response:", res.data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getPresIdApi();
  }, [prescriptionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!prescriptionData || !prescriptionData.medicines) {
    return <p>No data available</p>;
  }

  return (
    <div className="rounded-lg bg-gray-100 p-16 shadow-md">
      <h1 className="mb-8 text-center text-4xl font-bold">
        {prescriptionData.pre_name}
      </h1>
      <div className="mb-8 flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
        <div className="flex justify-between">
          <p className="font-semibold">처방병원</p>
          <p>{prescriptionData.hospital || "정보 없음"}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">처방약국</p>
          <p>{prescriptionData.pharmacy || "정보 없음"}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">처방날짜</p>
          <p>{prescriptionData.pre_date || "정보 없음"}</p>
        </div>
      </div>
      <h3 className="mb-6 text-center text-2xl font-bold">약 목록</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {prescriptionData.medicines.map((medicine: Medicine, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
          >
            <p className="mb-2 text-xl font-semibold">{medicine.name}</p>
            <div className="flex justify-between">
              <p className="font-semibold">복용시간</p>
              <div className="flex gap-2">
                {(medicine.dose_time || "").split(";").map((time) => (
                  <p
                    key={time}
                    className="rounded-md bg-myblue px-2 py-1 text-white"
                  >
                    {timeMapping[time] || time}
                  </p>
                ))}
                <p className="rounded-md bg-myblue px-2 py-1 text-white">
                  {mealTimeMapping[medicine.meal_time] || medicine.meal_time}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">복용시작</p>
              <p>{medicine.start_date}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">복용종료</p>
              <p>{medicine.end_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailMediInfoContents;
