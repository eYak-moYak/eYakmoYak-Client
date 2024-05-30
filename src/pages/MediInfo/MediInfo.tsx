import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyLayout from "../../components/Common/BodyLayout";
import MediCard from "./components/MediCard";
import instanceWithToken from "../../apis/axiosInstance";

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
          {apiData && apiData.medicines && apiData.medicines.length > 0 ? (
            apiData.medicines.map((medicine: any, index: number) => (
              <MediCard
                key={index}
                medicine={medicine}
                onClick={() => handleCardClick(medicine.pre_id)}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </BodyLayout>
    </div>
  );
};

export default MediInfo;
