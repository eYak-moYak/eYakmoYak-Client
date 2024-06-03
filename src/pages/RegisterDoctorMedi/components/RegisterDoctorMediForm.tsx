import React, { useState, ChangeEvent } from "react";
import AutoMediInput from "../../../components/Common/AutoMediInput";

interface Medication {
  name: string;
  imgUrl: string;
  dose_time: string;
  meal_time: number;
}

interface RegisterDoctorMediFormProps {
  items: string[];
  onChange: (medications: Medication[]) => void;
}

const timeMapping: { [key: string]: string } = {
  아침: "M",
  점심: "L",
  저녁: "D",
  "취침 전": "N",
};

const reverseTimeMapping: { [key: string]: string } = {
  M: "아침",
  L: "점심",
  D: "저녁",
  N: "취침 전",
};

const RegisterDoctorMediForm: React.FC<RegisterDoctorMediFormProps> = ({
  items,
  onChange,
}) => {
  const [medications, setMedications] = useState<Medication[]>(
    items.map((item) => ({
      name: item,
      imgUrl: "",
      dose_time: "",
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

  const handleDoseTimeChange = (index: number, time: string) => {
    const newMedications = [...medications];
    const medication = newMedications[index];
    const timeCode = timeMapping[time];

    const doseTimesArray = medication.dose_time.split(";").filter(Boolean);
    if (doseTimesArray.includes(timeCode)) {
      medication.dose_time = doseTimesArray
        .filter((t) => t !== timeCode)
        .join(";");
    } else {
      doseTimesArray.push(timeCode);
      medication.dose_time = doseTimesArray.join(";");
    }

    setMedications(newMedications);
    onChange(newMedications);
  };

  const handleMealTimeChange =
    (index: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newMedications = [...medications];
      newMedications[index].meal_time = parseInt(e.target.value, 10);
      setMedications(newMedications);
      onChange(newMedications);
    };

  const handleDelete = (index: number) => () => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
    onChange(newMedications);
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
        <div key={index} className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <label>복용 방법</label>
              <div>
                {["아침", "점심", "저녁", "취침 전"].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleDoseTimeChange(index, time)}
                    className={`border-myblue-500 mx-1 h-7 w-14 border-2 ${
                      medication.dose_time
                        .split(";")
                        .includes(timeMapping[time])
                        ? "bg-myblue"
                        : "bg-mywhite"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor={`meal-time-${index}`}>복용 시간</label>
              <select
                id={`meal-time-${index}`}
                value={medication.meal_time}
                onChange={handleMealTimeChange(index)}
              >
                <option value={0}>식후 30분</option>
                <option value={1}>식후 즉시</option>
                <option value={2}>식전 30분</option>
                <option value={3}>식전 즉시</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RegisterDoctorMediForm;
