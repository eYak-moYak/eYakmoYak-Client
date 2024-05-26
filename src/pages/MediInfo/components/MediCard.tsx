import { FC } from "react";

type Props = {
  medicine: {
    name: string;
    start_date: string;
    end_date: string;
    dose_time: string;
    meal_time: number;
  };
};

const doseTimeMapping: { [key: string]: string } = {
  M: "아침",
  L: "점심",
  D: "저녁",
  N: "취침 전",
};

const mealTimeMapping: { [key: number]: string } = {
  0: "식후 30분",
  1: "식후 즉시",
  2: "식전 30분",
  3: "식전 즉시",
};

const MediCard: FC<Props> = ({ medicine }) => {
  const doseTimeDisplay = medicine.dose_time
    .split(";")
    .map((time) => doseTimeMapping[time])
    .join(", ");
  const mealTimeDisplay = mealTimeMapping[medicine.meal_time];

  return (
    <div className="h-3/12 flex w-1/4 flex-col gap-1 bg-mywhite p-7">
      <h1 className="h-32 w-full pb-3 pl-2 pt-2 text-2xl">{medicine.name}</h1>
      <h6>복용 시작 :</h6>
      <p>{medicine.start_date}</p>
      <h6>복용 종료 :</h6>
      <p>{medicine.end_date}</p>
      <h6>복용 시간 :</h6>
      <p>{doseTimeDisplay}</p>
      <h6>식사 시간 :</h6>
      <p>{mealTimeDisplay}</p>
    </div>
  );
};

export default MediCard;
