import React, { useEffect, useState } from "react";
import instanceWithToken from "../../../apis/axiosInstance";

interface Medicine {
  name: string;
  start_date: string;
  end_date: string;
  imgUrl: string;
}

const TakeMediCard: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await instanceWithToken.get<Medicine[]>(
          "/get/medicines",
          {
            withCredentials: true,
          },
        );
        setMedicines(response.data);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <section>
      <h1 className="m-5 text-2xl">복용 중인 약</h1>
      <div className="flex rounded-lg bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {medicines.map((medicine, index) => (
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
                    <input id="default-checkbox" type="checkbox" value="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeMediCard;
