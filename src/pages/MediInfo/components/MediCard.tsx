import { FC } from "react";
import dayjs from "dayjs"; // 날짜 비교를 위해 dayjs 라이브러리 사용

type Props = {
  medicine: {
    pre_id: number;
    name: string;
    start_date: string;
    end_date: string;
  };
  onClick: (pre_id: number) => void;
};

const MediCard: FC<Props> = ({ medicine, onClick }) => {
  const isExpired = dayjs(medicine.end_date).isBefore(dayjs(), "day");

  return (
    <div
      className={`flex transform cursor-pointer flex-col gap-2 rounded-lg p-6 shadow-md transition-transform hover:scale-105 ${
        isExpired ? "bg-gray-200 text-gray-600" : "bg-white"
      }`}
      onClick={() => onClick(medicine.pre_id)}
    >
      <h1 className="pb-3 text-2xl font-bold ">{medicine.name}</h1>
      <div className="flex flex-col">
        <h6 className="text-gray-700">복용 시작 :</h6>
        <p className="text-gray-800">{medicine.start_date}</p>
      </div>
      <div className="flex flex-col">
        <h6 className="text-gray-700">복용 종료 :</h6>
        <p className="text-gray-800">{medicine.end_date}</p>
      </div>
    </div>
  );
};

export default MediCard;
