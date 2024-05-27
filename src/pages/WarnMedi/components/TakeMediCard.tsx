import React, { useEffect, useState } from "react";
import axios from "axios";
import instanceWithToken from "../../../apis/axiosInstance";
import { Drug } from "./HeaderAutoMediInput";

interface Medicine {
  name: string;
  start_date: string;
  end_date: string;
  imgUrl: string;
}

interface TakeMediCardProps {
  setWarningData: (data: any[]) => void;
  selectedDrug: Drug | null;
}

const TakeMediCard: React.FC<TakeMediCardProps> = ({
  setWarningData,
  selectedDrug,
}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await instanceWithToken.get<Medicine[]>(
          "/get/medicines",
          {
            withCredentials: true,
          },
        );

        if (Array.isArray(response.data)) {
          setMedicines(response.data);
          console.log("API Response:", response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMedicines();
  }, []);

  const handleCheckboxChange = (name: string) => {
    setSelectedMedicines((prevSelectedMedicines) => {
      if (prevSelectedMedicines.includes(name)) {
        return prevSelectedMedicines.filter((medicine) => medicine !== name);
      } else {
        return [...prevSelectedMedicines, name];
      }
    });
  };

  const handleButtonClick = async () => {
    if (!selectedDrug) {
      console.error("No drug selected");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/get/cont/medicines`,
        {
          params: {
            medicines: selectedMedicines,
            name: selectedDrug.itemName,
          },
          paramsSerializer: (params) => {
            return new URLSearchParams(params).toString();
          },
        },
      );

      console.log("API Response:", response.data);
      setWarningData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <div className="flex">
        <h1 className="m-5 text-2xl">복용 중인 약</h1>
        <button
          onClick={handleButtonClick}
          className="m-5 rounded bg-blue-500 p-2 text-white"
        >
          조회하기
        </button>
      </div>
      <div className="flex rounded-lg bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Array.isArray(medicines) && medicines.length > 0 ? (
              medicines.map((medicine, index) => (
                <div className="card p-4" key={index}>
                  <div className="w-full overflow-hidden rounded-lg">
                    <img src={medicine.imgUrl} alt={medicine.name} />
                  </div>
                  <div className="mt-4 flex justify-between px-4 text-sm">
                    <div>
                      <h3 className="text-gray-700">{medicine.name}</h3>
                      <p>복용 시작: {medicine.start_date}</p>
                      <p>복용 종료: {medicine.end_date}</p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedMedicines.includes(medicine.name)}
                        onChange={() => handleCheckboxChange(medicine.name)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">복용 중인 약이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeMediCard;
