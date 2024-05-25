import React, { useState, useEffect } from "react";
import instanceWithToken from "../../../apis/axiosInstance";
import { ReactComponent as Down } from "../../../assets/registerMedi/down.svg";
import AutoMediInput from "../../../components/Common/AutoMediInput";

type Props = {};

const RegisterEachMediForm: React.FC<Props> = (props: Props) => {
  interface SelectedTimes {
    [key: string]: boolean;
  }

  const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false);
  const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({});
  const [doseTime, setDoseTime] = useState<string>("");
  const [apiData, setApiData] = useState<any>(null);

  const onTimeToggle = () => setIsTimeOpen(!isTimeOpen);

  const onTimeClicked = (value: string) => {
    console.log(value);
    setDoseTime(value);
    setIsTimeOpen(false);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

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
  }, []); // 빈 배열을 두 번째 인자로 넘겨서 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <section className="my-16">
      <div className="flex"></div>
      <div className="flex items-center justify-between">
        <p>약 이름</p>
        <AutoMediInput />
      </div>
      <div className="flex items-center justify-between">
        <p>복용 시작</p>
        <input
          className="ml-20 mt-4 h-8 w-72"
          type="text"
          placeholder="2000.00.00"
        />
      </div>
      <div className="flex items-center justify-between">
        <p>복용 종료</p>
        <input
          className="ml-20 mt-4 h-8 w-72"
          type="text"
          placeholder="2000.00.00"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p>복용 방법</p>
        <div>
          {["아침", "점심", "저녁", "취침 전"].map((time, index) => (
            <button
              key={index}
              onClick={() => handleTimeSelection(time)}
              className={`border-myblue-500 mx-1 h-7 w-14 border-2 ${
                selectedTimes[time] ? "bg-myblue" : "bg-mywhite"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <div className="relative">
          <div
            className="flex w-28 items-center justify-center rounded-xl"
            onClick={onTimeToggle}
          >
            복용시간
            <Down className="h-5 w-4" />
          </div>
          <ul className="absolute z-10 flex w-full flex-col items-center justify-center gap-2 bg-mywhite">
            {isTimeOpen && (
              <>
                <li onClick={() => onTimeClicked("식후 30분")}>식후 30분</li>
                <li onClick={() => onTimeClicked("식후 즉시")}>식후 즉시</li>
                <li onClick={() => onTimeClicked("식전 30분")}>식전 30분</li>
                <li onClick={() => onTimeClicked("식전 즉시")}>식전 즉시</li>
              </>
            )}
          </ul>
        </div>
        <p>선택 복용 시간: {doseTime}</p>
      </div>
    </section>
  );
};

export default RegisterEachMediForm;
