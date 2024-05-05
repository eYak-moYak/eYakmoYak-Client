import React from "react";

function RegisterDoctorMedi() {
  const [isTimeOpen, setIsTimeOpen] = React.useState<boolean>(false);
  const onToggle = () => setIsTimeOpen(!isTimeOpen);
  const onTimeClicked = (value: string, index: number) => () => {
    console.log(value);
    setIsTimeOpen(false);
  };
  return (
    <div className="flex h-5/6 items-end justify-center">
      <div className="flex h-5/6 w-10/12 flex-col items-center justify-end gap-4 rounded-t-xl bg-mywhite pb-14">
        <h1 className="z-10 mb-4 mt-10 text-5xl">처방약 등록하기</h1>
        <main className="flex flex-col">
          <section>
            <div className="flex items-center justify-between">
              <p>처방 이름</p>
              <input
                className="m-2 ml-20 h-8 w-64"
                type="text"
                placeholder="질병 이름 등의 처방 명칭을 입력하세요."
              />
            </div>
            <div className="flex items-center justify-between">
              <p>처방 병원</p>
              <input
                className="m-2 ml-20 h-8 w-64"
                type="text"
                placeholder="병원 이름을 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <p>처방 약국</p>
              <input
                className="m-2 ml-20 h-8 w-64"
                type="text"
                placeholder="약국 이름을 입력하세요"
              />
            </div>
            <div className="flex items-center justify-between">
              <p>등록일(처방날짜)</p>
              <input
                className="m-2 ml-20 h-8 w-64"
                type="text"
                placeholder="2000-00-00"
              />
            </div>
            <div className="flex items-center justify-between">
              <p>복용 시작</p>
              <input
                className="m-2 ml-20 h-8 w-64"
                type="text"
                placeholder="2000-00-00"
              />
            </div>
            <div className="flex items-center justify-between">
              <p>복용 종료</p>
              <input
                className="m-2 ml-20 h-8 w-64"
                type="text"
                placeholder="2000-00-00"
              />
            </div>
          </section>

          <section className="my-16">
            <div className="flex">
              <p className="text-xl">인식된 약</p>
              <button className="ml-3 h-7 w-24" type="button">
                약 추가하기
              </button>
            </div>
            <div className="flex items-center justify-between">
              <input className="h-8 w-64" type="text" placeholder="약 이름" />
              <button className="h-7 w-14" type="button">
                삭제
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p>복용 방법</p>
              <div>
                <button
                  className="border-myblue-500 h-7 w-14 border-2 bg-mywhite"
                  type="button"
                >
                  아침
                </button>
                <button
                  className="border-myblue-500 h-7 w-14 border-2 bg-mywhite"
                  type="button"
                >
                  점심
                </button>
                <br />
                <button
                  className="border-myblue-500 h-7 w-14 border-2 bg-mywhite"
                  type="button"
                >
                  저녁
                </button>
                <button
                  className="border-myblue-500 h-7 w-14 border-2 bg-mywhite"
                  type="button"
                >
                  취침 전
                </button>
              </div>
              <div className=" relative border-2">
                <div
                  className="mt-6 flex w-28 items-center justify-center gap-4"
                  onClick={onToggle}
                >
                  복용시간
                </div>
                <ul className="absolute z-10 flex w-full flex-col items-center justify-center overflow-y-scroll bg-mywhite">
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
          <button className="h-9" type="button">
            등록하기
          </button>
        </main>
      </div>
    </div>
  );
}

export default RegisterDoctorMedi;
