import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import BodyLayout from "../../components/Common/BodyLayout";
import pageIcons from "../../assets/pageIcon";

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
      <BodyLayout>
        <div>
          <h1 className="z-10 mb-4 pt-10 text-5xl">약봉투 사진을 등록하세요</h1>
        </div>
        <p className="flex text-center text-neutral-400">
          잠깐! 사진 가이드를 지켜주세요!
          <br /> 1. 약봉투의 전체가 보이는 이미지
          <br /> 2. 수평한 곳에 내려두고 촬영한 이미지
          <br /> 3. 복약 지도문이 잘 펴진 상태의 이미지
          <br /> 4. 글씨가 반사되지 않는 밝은 곳에서 찍은 이미지
        </p>
        <img src={pageIcons.photoIconGroup} alt="photo upload icon" />

        <button
          type="button"
          onClick={handleFileSelect}
          className="border-mybgcolor-50 h-10 w-2/6 rounded-full border-2"
        >
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
      </BodyLayout>
    </div>
  );
}

export default PhotoUpload;
