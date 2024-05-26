type Props = {
  warningData: { name: string; reason: string }[];
};

const WarnMediList: React.FC<Props> = ({ warningData }) => {
  return (
    <section>
      <h1 className="ml-5 mt-20 text-2xl">병용금기 조회결과</h1>
      <div className="rounded-lg bg-white">
        {warningData.map((data, index) => (
          <div key={index}>
            <div className="flex w-full justify-start px-6 py-4">
              <div className="h-full w-1/4 content-center items-center px-4">
                <img src="https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/152035092098000085" />
              </div>
              <div className="px-4">
                <h3 className="font-medium leading-6 text-gray-900">
                  {data.name}
                </h3>
                <div className="mt-1 max-w-2xl text-sm text-purple-500">
                  <p>금기 사유</p>
                  <ul className="list-inside list-disc">
                    <li>{data.reason}</li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WarnMediList;
