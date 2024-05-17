import React from "react";

type Props = {};

const WarnMediList = (props: Props) => {
  return (
    <section>
      <h1 className="ml-5 text-2xl">병용금기 조회결과</h1>
      <div className="rounded-lg bg-white">
          <div className="flex w-full justify-start px-6 py-4">
            <div className="h-full w-1/4 content-center items-center px-4">
              <img src="https://github.com/yejinie/yejinie/assets/69359751/d7dc47f8-c68a-4599-943d-132b4a01da89" />
            </div>
            <div className="px-4">
              <h3 className="font-medium leading-6 text-gray-900">
                타이레노놀콜드-에스정
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                충돌 성분: 이부프로펜
              </p>
              <div className="mt-1 max-w-2xl text-sm text-purple-500">
                <p>금기 사유</p>
                <ul className="list-inside list-disc">
                  <li>중복 성분으로 인한 위험</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />

          <div className="flex w-full justify-start px-6 py-4">
            <div className="h-full w-1/4 content-center items-center px-4">
              <img src="https://github.com/yejinie/yejinie/assets/69359751/d7dc47f8-c68a-4599-943d-132b4a01da89" />
            </div>
            <div className="px-4">
              <h3 className="font-medium leading-6 text-gray-900">
                타이레노놀콜드-에스정
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                충돌 성분: 이부프로펜
              </p>
              <div className="mt-1 max-w-2xl text-sm text-purple-500">
                <p>금기 사유</p>
                <ul className="list-inside list-disc">
                  <li>중복 성분으로 인한 위험</li>
                  <li>중복 성분으로 인한 위험</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
        </div>
    </section>
  );
};
export default WarnMediList;
