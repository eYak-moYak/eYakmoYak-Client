import React from "react";

function RegisterDoctorForm() {
  return (
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
  );
}

export default RegisterDoctorForm;
