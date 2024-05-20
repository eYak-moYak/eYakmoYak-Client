type Props = {};

const MediCard = (props: Props) => {
  return (
    <>
      <div className="h-3/12 flex w-3/12 flex-col gap-1 bg-mywhite p-7">
        <h1 className="pb-3 pl-2 text-2xl">감기약</h1>
        <h6>복용시작</h6>
        <p>2000.00.00</p>
        <h6>복용종료</h6>
        <p>2000.00.00</p>

        <p>명지병원</p>
        <p className="pb-8">명지약국</p>
        <p>약 4개</p>
      </div>
    </>
  );
};
export default MediCard;
