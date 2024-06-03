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
    <>
      <h1 className="mt-16 text-3xl">{prescriptionData.pre_name}</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-20">
          <p>처방병원</p>
          <p>{prescriptionData.hospital || "정보 없음"}</p>
        </div>
        <div className="flex gap-20">
          <p>처방약국</p>
          <p>{prescriptionData.pharmacy || "정보 없음"}</p>
        </div>
        <div className="flex gap-20">
          <p>처방날짜</p>
          <p>{prescriptionData.pre_date || "정보 없음"}</p>
        </div>
      </div>
      <h3 className="mt-24 text-xl">약 목록</h3>
      {prescriptionData.medicines.map((medicine: Medicine, index: number) => (
        <div key={index} className="flex flex-col gap-3">
          <p className="mb-3 text-2xl">{medicine.name}</p>
          <div className="flex gap-20">
            <p>복용시간</p>
            <div className="flex gap-2">
              <p>{timeMapping[medicine.dose_time] || medicine.dose_time}</p>
              <p>{mealTimeMapping[medicine.meal_time] || medicine.meal_time}</p>
            </div>
          </div>
          <div className="flex gap-20">
            <p>복용시작</p>
            <p>{medicine.start_date}</p>
          </div>
          <div className="flex gap-20">
            <p>복용종료</p>
            <p>{medicine.end_date}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DetailMediInfoContents;
