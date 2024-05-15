import React, { useState } from "react";
import { ReactComponent as Down } from "../../../assets/registerMedi/down.svg";
import AutoMediInput from "../../../components/Common/AutoMediInput";

type Props = {};

const RegisterEachMediForm = (props: Props) => {
  // 아침,점심,저녁 선택시 타입 반환
  interface SelectedTimes {
    [key: string]: boolean;
  }

  const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false);
  const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({});

  //   복용시간 토글
  const onTimeToggle = () => setIsTimeOpen(!isTimeOpen);
  //   복용시간 클릭시 상태변환
  const onTimeClicked = (value: string, index: number) => () => {
    console.log(value);
    setIsTimeOpen(false);
  };
  // 아침,점심,저녁 선택시 시간대 반환.
  const handleTimeSelection = (time: string) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

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
              className={`border-myblue-500 mx-1 h-7 w-14 border-2 ${selectedTimes[time] ? "bg-myblue" : "bg-mywhite"}`}
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
          <ul className=" absolute z-10 flex w-full flex-col items-center justify-center gap-2  bg-mywhite">
            {isTimeOpen && (
              <>
                <li onClick={onTimeClicked("식후 30분", 1)}>식후 30분</li>
                <li onClick={onTimeClicked("식후 즉시", 2)}>식후 즉시</li>
                <li onClick={onTimeClicked("식전 30분", 3)}>식전 30분</li>
                <li onClick={onTimeClicked("식전 즉시", 4)}>식전 즉시</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RegisterEachMediForm;
