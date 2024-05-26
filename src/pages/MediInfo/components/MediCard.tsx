import { FC } from "react";

type Props = {
  medicine: {
    name: string;
    start_date: string;
    end_date: string;
  };
};

const MediCard: FC<Props> = ({ medicine }) => {
  return (
    <div className="h-3/12 flex w-1/4 flex-col gap-1 bg-mywhite p-7">
      <h1 className="h-32 w-full pb-3 pl-2 pt-2 text-2xl">{medicine.name}</h1>
      <h6>복용 시작 :</h6>
      <p>{medicine.start_date}</p>
      <h6>복용 종료 :</h6>
      <p>{medicine.end_date}</p>
    </div>
  );
};

export default MediCard;
