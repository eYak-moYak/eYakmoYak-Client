import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterDoctorForm from "./components/RegisterDoctorForm";
import RegisterDoctorMediForm from "./components/RegisterDoctorMediForm";
import BodyLayout from "../../components/Common/BodyLayout";
import addPresc from "../../apis/addPrescription";

const RegisterDoctorMedi: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items = [] } = location.state || {};
  const [prescriptionData, setPrescriptionData] = useState({
    pre_name: "",
    hospital: "",
    pharmacy: "",
    pre_date: "2024-06-03", // 예시 날짜 추가
    start_date: "2024-06-03", // 예시 날짜 추가
    end_date: "2024-06-03", // 예시 날짜 추가
    medicines: items.map((item: string) => ({
      name: item,
      dose_time: "아침",
      meal_time: 0,
      imgUrl: "",
    })),
  });

  const handlePrescriptionChange = (field: string, value: string) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleMedicinesChange = (medications: any[]) => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines: medications,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Sending data:", prescriptionData);
      await addPresc(prescriptionData);
      alert("처방약이 성공적으로 등록되었습니다.");
      navigate("/mediinfo"); // 등록 후 페이지 이동
    } catch (error) {
      alert(`처방약 등록 중 오류가 발생했습니다: ${error}`);
    }
  };

  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <h1 className="z-10 mb-4 mt-10 text-5xl">처방약 등록하기</h1>
        <main className="flex flex-col">
          <RegisterDoctorForm onChange={handlePrescriptionChange} />
          <RegisterDoctorMediForm
            items={items}
            onChange={handleMedicinesChange}
          />
          <button className="h-9" type="button" onClick={handleSubmit}>
            등록하기
          </button>
        </main>
      </BodyLayout>
    </div>
  );
};

export default RegisterDoctorMedi;
