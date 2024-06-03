import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyLayout from "../../components/Common/BodyLayout";
import MediCard from "./components/MediCard";
import instanceWithToken from "../../apis/axiosInstanceWithToken";

type Props = {};

const MediInfo: React.FC<Props> = () => {
  const [apiData, setApiData] = useState<any>(null);
  const navigate = useNavigate();

  /** 복약정보 리스트 api get 연결 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instanceWithToken.get("/get/premedList", {
          withCredentials: true,
        });

        setApiData(response.data);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 복약정보 약 카드 선택시, 약 id 로 페이지 이동
  const handleCardClick = (medicineId: number) => {
    navigate(`/detail-mediinfo/${medicineId}`);
  };

  return (
    <div className="flex h-5/6 items-center justify-center bg-gray-100">
      <BodyLayout>
        <div className="container mx-auto px-4">
          {apiData ? (
            <>
              {apiData.prescriptions && apiData.prescriptions.length > 0 && (
                <div className="mb-10">
                  <h2 className="mb-8 text-center text-3xl font-bold">
                    처방전 목록
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {apiData.prescriptions.map(
                      (prescription: any, index: number) => (
                        <div
                          key={index}
                          className="relative rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                          onClick={() => handleCardClick(prescription.pre_id)}
                        >
                          <h3 className="mb-2 text-xl font-bold">
                            {prescription.pre_name}
                          </h3>
                          <div className="text-gray-700">
                            <p className="mb-1">
                              <span className="font-medium">병원:</span>{" "}
                              {prescription.hospital || "정보 없음"}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">약국:</span>{" "}
                              {prescription.pharmacy || "정보 없음"}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">처방 날짜:</span>{" "}
                              {prescription.pre_date || "정보 없음"}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">총 약 개수:</span>{" "}
                              {prescription.countMedicine || 0}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {apiData.medicines && apiData.medicines.length > 0 && (
                <div>
                  <h2 className="mb-8 text-center text-3xl font-bold">
                    약 목록
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {apiData.medicines.map((medicine: any, index: number) => (
                      <MediCard
                        key={index}
                        medicine={medicine}
                        onClick={() => handleCardClick(medicine.pre_id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </div>
      </BodyLayout>
    </div>
  );
};

export default MediInfo;
