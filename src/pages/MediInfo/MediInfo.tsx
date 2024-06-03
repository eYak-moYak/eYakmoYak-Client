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
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <div className="flex flex-wrap gap-4">
          {apiData ? (
            <>
              {apiData.prescriptions && apiData.prescriptions.length > 0 && (
                <div className="flex w-full flex-col">
                  <h2 className="mb-4 ml-10 mt-10 flex-wrap text-2xl font-bold">
                    처방전 목록
                  </h2>
                  <div className="m-3 grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-4">
                    {apiData.prescriptions.map(
                      (prescription: any, index: number) => (
                        <div
                          key={index}
                          className="mb-4 w-full cursor-pointer rounded-lg border border-gray-300 p-4"
                          onClick={() => handleCardClick(prescription.pre_id)}
                        >
                          <h2 className="text-xl font-bold">
                            {prescription.pre_name}
                          </h2>
                          <div>
                            <p>병원: {prescription.hospital}</p>
                            <p>약국: {prescription.pharmacy}</p>
                            <p>
                              처방 날짜: <br />
                              {prescription.pre_date}
                              <br />
                              <br />
                            </p>
                            <p>
                              총 약 개수:
                              {prescription.countMedicine}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {apiData.medicines && apiData.medicines.length > 0 && (
                <div className="w-full">
                  <h2 className="mb-4 ml-10 flex-wrap text-2xl font-bold">
                    약 목록
                  </h2>
                  <div className="m-3 grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-4">
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
            <p>Loading...</p>
          )}
        </div>
      </BodyLayout>
    </div>
  );
};

export default MediInfo;
