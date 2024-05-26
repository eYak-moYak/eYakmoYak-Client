import React, { useEffect, useState } from "react";
import BodyLayout from "../../components/Common/BodyLayout";
import MediCard from "./components/MediCard";
import instanceWithToken from "../../apis/axiosInstance";

type Props = {};

const MediInfo: React.FC<Props> = () => {
  const [apiData, setApiData] = useState<any>(null);

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

  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <div className="flex flex-wrap gap-4">
          {apiData && apiData.medicines && apiData.medicines.length > 0 ? (
            apiData.medicines.map((medicine: any, index: number) => (
              <MediCard key={index} medicine={medicine} />
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
