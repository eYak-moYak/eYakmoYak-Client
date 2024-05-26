import React, { useState, useEffect } from "react";
import axios from "axios";

interface Drug {
  itemName: string;
  entpName: string;
}

interface AutoMediInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutoMediInput: React.FC<AutoMediInputProps> = ({ value, onChange }) => {
  const [searchDrugs, setSearchDrugs] = useState<Drug[]>([]);
  const [openSearch, setOpenSearch] = useState(false);

  const handleOnClick = (drug: Drug) => {
    onChange({
      target: { value: drug.itemName },
    } as React.ChangeEvent<HTMLInputElement>);
    setOpenSearch(false);
  };

  useEffect(() => {
    if (value) {
      const exactMatch = searchDrugs.some((drug) => drug.itemName === value);
      exactMatch ? setOpenSearch(false) : setOpenSearch(true);

      const debounce = setTimeout(() => {
        fetchDrugs(process.env.REACT_APP_API_KEY, value, 1, 1, 10);
      }, 100); // 100ms 디바운스

      return () => {
        clearTimeout(debounce);
      };
    } else {
      setOpenSearch(false);
      setSearchDrugs([]);
    }
  }, [value]);

  async function fetchDrugs(
    serviceKey: any,
    itemName: string,
    pageNo: number,
    startPage: number,
    numOfRows: number,
  ) {
    try {
      const url = `${process.env.REACT_APP_MEDI_NAME_URL}`;
      const response = await axios.get(url, {
        params: {
          serviceKey: decodeURIComponent(serviceKey),
          itemName: encodeURIComponent(itemName),
          pageNo,
          startPage,
          numOfRows,
          type: "json",
        },
      });

      if (
        response.data &&
        response.data.body &&
        Array.isArray(response.data.body.items)
      ) {
        setSearchDrugs(response.data.body.items);
      } else {
        console.log("No items found or 'items' is not an array");
        setSearchDrugs([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchDrugs([]);
    }
  }

  return (
    <div>
      <input
        className="h-8 w-72"
        type="text"
        placeholder="조회할 약품의 이름을 입력하세요."
        value={value}
        onChange={onChange}
      />
      {openSearch && searchDrugs.length > 0 && (
        <ul className="border-myblue-500 absolute flex w-2/6 flex-col gap-1 border-2 bg-mywhite">
          {searchDrugs.map((drug, index) => (
            <li key={index} onClick={() => handleOnClick(drug)}>
              {drug.itemName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoMediInput;
