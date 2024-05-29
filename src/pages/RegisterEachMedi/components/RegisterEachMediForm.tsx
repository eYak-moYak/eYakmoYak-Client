import React, { useState, forwardRef } from "react";
import instanceWithToken from "../../../apis/axiosInstance";
import { ReactComponent as Down } from "../../../assets/registerMedi/down.svg";
import AutoMediInput from "../../../components/Common/AutoMediInput";

type Props = {};

const RegisterEachMediForm = forwardRef<HTMLFormElement, Props>(
  (props, ref) => {
    const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false);
    const [doseTime, setDoseTime] = useState<string>("");
    const [mealTime, setMealTime] = useState<number | null>(null);
    const [medicationName, setMedicationName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<string>("");

    const timeMapping: { [key: string]: string } = {
      아침: "M",
      점심: "L",
      저녁: "D",
      "취침 전": "N",
    };

    const mealTimeMapping: { [key: string]: number } = {
      "식후 30분": 0,
      "식후 즉시": 1,
      "식전 30분": 2,
      "식전 즉시": 3,
    };

    const onTimeToggle = () => setIsTimeOpen(!isTimeOpen);

    const onTimeClicked = (value: string) => {
      console.log(value);
      setMealTime(mealTimeMapping[value]);
      setIsTimeOpen(false);
    };

    const handleTimeSelection = (time: string) => {
      const mappedTime = timeMapping[time];
      setDoseTime((prev) => (prev === mappedTime ? "" : mappedTime));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const data = {
        name: medicationName,
        start_date: startDate,
        end_date: endDate,
        dose_time: doseTime,
        meal_time: mealTime,
        imgUrl,
      };
      console.log("Sending data to server:", data);

      try {
        const response = await instanceWithToken.post("/add/medicine", data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("Data submitted successfully");
          setMedicationName("");
          setStartDate("");
          setEndDate("");
          setDoseTime("");
          setMealTime(null);
          setImgUrl("");
        } else {
          console.error("Error submitting data, status code:", response.status);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };

    return (
      <section className="my-16">
        <form onSubmit={handleSubmit} ref={ref}>
          <div className="flex items-center justify-between">
            <p>약 이름</p>
            <AutoMediInput
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
              onImageChange={(url) => setImgUrl(url)}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>복용 시작</p>
            <input
              className="ml-20 mt-4 h-8 w-72"
              type="text"
              placeholder="2000.00.00"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <p>복용 종료</p>
            <input
              className="ml-20 mt-4 h-8 w-72"
              type="text"
              placeholder="2000.00.00"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p>복용 방법</p>
            <div>
              {["아침", "점심", "저녁", "취침 전"].map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTimeSelection(time)}
                  className={`border-myblue-500 mx-1 h-7 w-14 border-2 ${
                    doseTime === timeMapping[time] ? "bg-myblue" : "bg-mywhite"
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
                    <li onClick={() => onTimeClicked("식후 30분")}>
                      식후 30분
                    </li>
                    <li onClick={() => onTimeClicked("식후 즉시")}>
                      식후 즉시
                    </li>
                    <li onClick={() => onTimeClicked("식전 30분")}>
                      식전 30분
                    </li>
                    <li onClick={() => onTimeClicked("식전 즉시")}>
                      식전 즉시
                    </li>
                  </>
                )}
              </ul>
            </div>
            <p>선택 복용 시간: {doseTime}</p>
          </div>
        </form>
      </section>
    );
  },
);

export default RegisterEachMediForm;
