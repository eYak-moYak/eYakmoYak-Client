import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

function PhotoUpload() {
  const [files, setFiles] = useState<File | null>(null);
  const [showImages, setShowImages] = useState<string[]>([]);

  const navigate = useNavigate();
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files[0]);
    }

    const formData = new FormData();
    if (files) {
      formData.append("file", files);
    }

    const result: string = await fetch("http://...", {
      method: "post",
      body: formData,
      headers: {
        authorization: "Bearer ...",
      },
    })
      .then((res) => res.json())
      .then((body) => body.url);

    if (result) setShowImages([...showImages, result]);
  };

  const handleDelete = (idx: number) => {
    setShowImages([
      ...showImages.slice(0, idx),
      ...showImages.slice(idx + 1, showImages.length),
    ]);
  };

  return (
    <div className="flex h-5/6 items-end justify-center">
      <div className="flex h-5/6 w-10/12 flex-col items-center justify-end gap-4 rounded-t-xl bg-mywhite pb-14">
        <div>
          <h1 className="z-10 mb-4 text-5xl">약봉투 사진을 등록하세요</h1>
        </div>
        <p className="flex text-center text-neutral-400">
          잠깐! 사진 가이드를 지켜주세요!
          <br /> 1. 약봉투의 전체가 보이는 이미지
          <br /> 2. 수평한 곳에 내려두고 촬영한 이미지
          <br /> 3. 복약 지도문이 잘 펴진 상태의 이미지
          <br /> 4. 글씨가 반사되지 않는 밝은 곳에서 찍은 이미지
        </p>
        <svg
          width="120"
          height="100"
          viewBox="0 0 105 87"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M99.5 43.2308C99.5 66.7645 77.4088 85.9615 50 85.9615C22.5912 85.9615 0.5 66.7645 0.5 43.2308C0.5 19.697 22.5912 0.5 50 0.5C77.4088 0.5 99.5 19.697 99.5 43.2308Z"
            fill="white"
            stroke="#D9D9D9"
          />
          <g clipPath="url(#clip0_105_222)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40 36.8077C38.62 36.8077 37.5 35.8393 37.5 34.6462C37.5 33.453 38.62 32.4846 40 32.4846C41.38 32.4846 42.5 33.453 42.5 34.6462C42.5 35.8393 41.38 36.8077 40 36.8077ZM40 30.3231C37.2387 30.3231 35 32.2587 35 34.6462C35 37.0336 37.2387 38.9692 40 38.9692C42.7613 38.9692 45 37.0336 45 34.6462C45 32.2587 42.7613 30.3231 40 30.3231ZM67.5 44.5114L60 37.8885L47.5737 48.8161L42.5 44.3731L32.5 52.3027V30.3231C32.5 29.1299 33.62 28.1615 35 28.1615H65C66.38 28.1615 67.5 29.1299 67.5 30.3231V44.5114ZM67.5 56.2615C67.5 57.4547 66.38 58.4231 65 58.4231H58.54L49.33 50.3551L60 41.1297L67.5 47.6143V56.2615ZM35 58.4231C33.62 58.4231 32.5 57.4547 32.5 56.2615V55.2467L42.4313 47.5559L55.0013 58.4231H35ZM65 26H35C32.2387 26 30 27.9357 30 30.3231V56.2615C30 58.649 32.2387 60.5846 35 60.5846H65C67.7612 60.5846 70 58.649 70 56.2615V30.3231C70 27.9357 67.7612 26 65 26Z"
              fill="#0C1C3F"
            />
          </g>
          <rect
            x="76.5"
            y="59.5"
            width="28"
            height="24.0738"
            rx="9.5"
            fill="white"
            stroke="#D9D9D9"
          />
          <path
            d="M90.8334 65.4847C90.8334 65.0867 90.4603 64.7642 90 64.7642C89.5398 64.7642 89.1667 65.0867 89.1667 65.4847V71.2488H82.5C82.0398 71.2488 81.6667 71.5713 81.6667 71.9693C81.6667 72.3672 82.0398 72.6898 82.5 72.6898H89.1667V78.4539C89.1667 78.8518 89.5398 79.1744 90 79.1744C90.4603 79.1744 90.8334 78.8518 90.8334 78.4539V72.6898H97.5C97.9603 72.6898 98.3334 72.3672 98.3334 71.9693C98.3334 71.5713 97.9603 71.2488 97.5 71.2488H90.8334V65.4847Z"
            fill="#0C1F43"
          />
          <defs>
            <clipPath id="clip0_105_222">
              <rect
                width="40"
                height="34.5846"
                fill="white"
                transform="translate(30 26)"
              />
            </clipPath>
          </defs>
        </svg>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="h-10 w-2/6 rounded-full bg-myblue"
        />
        {showImages.map((src, idx) => {
          return (
            <div>
              <img src={src} alt={`${src}`} />
              <button onClick={() => handleDelete(idx)}>X</button>
            </div>
          );
        })}
        <button
          type="button"
          className="border-mybgcolor-50 h-10 w-2/6 rounded-full border-2"
          onClick={() => navigate("/register-eachmedi")}
        >
          약 직접 추가
        </button>
      </div>
    </div>
  );
}

export default PhotoUpload;
