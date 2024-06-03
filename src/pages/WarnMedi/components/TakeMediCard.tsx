import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import instanceWithToken from "../../../apis/axiosInstanceWithToken";
import { Drug } from "./HeaderAutoMediInput";
import registerMediIcon from "../../../assets/registerMedi";

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
  const [allSelected, setAllSelected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedMedicines([]);
    } else {
      const allMedicineNames = medicines.map((medicine) => medicine.name);
      setSelectedMedicines(allMedicineNames);
    }
    setAllSelected(!allSelected);
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
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="rounded-lg bg-gray-50 p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">복용 중인 약</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleSelectAll}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-myblue hover:bg-gray-100"
          >
            {allSelected ? "전체해제" : "전체선택"}
          </button>
          <button
            onClick={handleButtonClick}
            className="rounded bg-myblue px-4 py-2 text-white hover:bg-myblue"
          >
            조회하기
          </button>
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.isArray(medicines) && medicines.length > 0 ? (
            medicines.map((medicine, index) => (
              <div
                key={index}
                className="card rounded-lg bg-gray-50 p-4 shadow-md"
              >
                <div className="mb-4 flex justify-center">
                  {medicine.imgUrl !== "No Image" ? (
                    <img
                      className="rounded-lg"
                      src={medicine.imgUrl}
                      alt={medicine.name}
                    />
                  ) : (
                    <img
                      width="140rem"
                      className="rounded-lg"
                      src={registerMediIcon.defaultDrug}
                      alt={medicine.name}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {medicine.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      복용 시작: {medicine.start_date}
                    </p>
                    <p className="text-sm text-gray-600">
                      복용 종료: {medicine.end_date}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={selectedMedicines.includes(medicine.name)}
                    onChange={() => handleCheckboxChange(medicine.name)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">복용 중인 약이 없습니다.</p>
          )}
        </div>
      </div>
      <div ref={bottomRef}></div>
    </section>
  );
};

export default TakeMediCard;
