import React, { useState, ChangeEvent } from "react";
import { ReactComponent as Down } from "../../../assets/registerMedi/down.svg";
import AutoMediInput from "../../../components/Common/AutoMediInput";

interface Medication {
  name: string;
  imgUrl: string;
  dose_time: string;
  meal_time: number;
}

interface SelectedTimes {
  [key: string]: boolean;
}

interface RegisterDoctorMediFormProps {
  items: string[];
  onChange: (medications: Medication[]) => void;
}

const RegisterDoctorMediForm: React.FC<RegisterDoctorMediFormProps> = ({
  items,
  onChange,
}) => {
  const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false);
  const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({});
  const [medications, setMedications] = useState<Medication[]>(
    items.map((item) => ({
      name: item,
      imgUrl: "",
      dose_time: "아침",
      meal_time: 0,
    })),
  );

  const handleMedicationNameChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newMedications = [...medications];
      newMedications[index].name = e.target.value;
      setMedications(newMedications);
      onChange(newMedications);
    };

  const handleImageChange = (index: number) => (url: string) => {
    const newMedications = [...medications];
    newMedications[index].imgUrl = url;
    setMedications(newMedications);
    onChange(newMedications);
  };

  const handleDelete = (index: number) => () => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
    onChange(newMedications);
  };

  const onTimeToggle = () => setIsTimeOpen(!isTimeOpen);

  const onTimeClicked = (value: string, index: number) => () => {
    console.log(value);
    setIsTimeOpen(false);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

  return (
    <section className="my-16">
      <div className="flex">
        <p className="mb-8 text-xl">인식된 약</p>

        <button className="ml-3 h-7 w-24" type="button">
          약 추가하기
        </button>
      </div>
      {medications.map((medication, index) => (
        <div key={index} className="mt-4 flex items-center justify-between">
          <AutoMediInput
            value={medication.name}
            onChange={handleMedicationNameChange(index)}
            onImageChange={handleImageChange(index)}
          />
          <button
            className="h-7 w-14"
            type="button"
            onClick={handleDelete(index)}
          >
            삭제
          </button>
        </div>
      ))}
      <div className="mt-6 flex items-center justify-between">
        <p>복용 방법</p>
        <div>
          {["아침", "점심", "저녁", "취침 전"].map((time, index) => (
            <button
              key={index}
              onClick={() => handleTimeSelection(time)}
              className={`border-myblue-500 mx-1 h-7 w-14 border-2 ${
                selectedTimes[time] ? "bg-myblue" : "bg-mywhite"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <div className="relative">
          <div
            className="flex w-28 items-center justify-center rounded-xl"
            onClick={onTimeToggle}
          >
            복용시간
            <Down className="h-5 w-4" />
          </div>
          <ul className="absolute z-10 flex w-full flex-col items-center justify-center gap-2 bg-mywhite">
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
  );
};

export default RegisterDoctorMediForm;
