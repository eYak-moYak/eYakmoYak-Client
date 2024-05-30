type Props = {};

const DetailMediInfoContents = (props: Props) => {
  return (
    <>
      <h1 className="mt-16 text-3xl">감기약</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-20">
          <p>처방병원</p>
          <p>명지병원</p>
        </div>
        <div className="flex gap-20">
          <p>처방약국</p>
          <p>명지약국</p>
        </div>
        <div className="flex gap-20">
          <p>처방날짜</p>
          <p>2000-00-00</p>
        </div>
      </div>
      <h3 className="mt-5 text-xl">약 목록</h3>
      <div className="flex flex-col gap-3">
        <p className="mb-3 text-2xl">판콜에이</p>
        <div className="flex gap-20">
          <p>복용시간</p>
          <div className="gap- flex">
            <p>아침</p>
            <p>식후 30분</p>
          </div>
        </div>
        <div className="flex gap-20">
          <p>복용시작</p>
          <p>2000-00-00</p>
        </div>
        <div className="flex gap-20">
          <p>복용종료</p>
          <p>2000-00-00</p>
        </div>
      </div>
    </>
  );
};

export default DetailMediInfoContents;
