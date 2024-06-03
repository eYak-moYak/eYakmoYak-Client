import { FC } from "react";

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
  return (
    <div
      className="h-3/12 lex-col flex flex-col gap-1 p-7"
      onClick={() => onClick(medicine.pre_id)}
    >
      <h1 className="h-32 w-full pb-3 pl-2 pt-2 text-2xl">{medicine.name}</h1>
      <h6>복용 시작 :</h6>
      <p>{medicine.start_date}</p>
      <h6>복용 종료 :</h6>
      <p>{medicine.end_date}</p>
    </div>
  );
};

export default MediCard;
