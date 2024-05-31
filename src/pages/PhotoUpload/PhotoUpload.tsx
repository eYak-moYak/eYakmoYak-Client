import { useState, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BodyLayout from "../../components/Common/BodyLayout";
import pageIcons from "../../assets/pageIcon";

function PhotoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [showImages, setShowImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(".../upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        });

        const imageUrl = response.data.url;

        setShowImages((prevImages) => [...prevImages, imageUrl]);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };

  const handleDelete = (idx: number) => {
    setShowImages((prevImages) =>
      prevImages.filter((_, index) => index !== idx),
    );
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
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
          약봉투 사진 올리기
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          ref={fileInputRef}
          className="hidden"
        />

        {showImages.map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={`uploaded-${idx}`} />
            <button onClick={() => handleDelete(idx)}>X</button>
          </div>
        ))}
        <button
          type="button"
          className="border-mybgcolor-50 h-10 w-2/6 rounded-full border-2 bg-mywhite"
          onClick={() => navigate("/register-eachmedi")}
        >
          약 직접 추가
        </button>
      </BodyLayout>
    </div>
  );
}

export default PhotoUpload;
