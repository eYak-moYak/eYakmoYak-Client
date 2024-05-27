import React, { useState, useEffect } from "react";
import axios from "axios";

export interface Drug {
  itemName: string;
  entpName: string;
}

interface HeaderAutoMediInputProps {
  setSelectedDrug: (drug: Drug) => void;
}

const HeaderAutoMediInput: React.FC<HeaderAutoMediInputProps> = ({
  setSelectedDrug,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchDrugs, setSearchDrugs] = useState<Drug[]>([]);
  const [openSearch, setOpenSearch] = useState(false);

  const handleOnClick = (drug: Drug) => {
    setKeyword(drug.itemName);
    setSelectedDrug(drug);
    setOpenSearch(false);
  };

  useEffect(() => {
    if (keyword) {
      const exactMatch = searchDrugs.some((drug) => drug.itemName === keyword);
      exactMatch ? setOpenSearch(false) : setOpenSearch(true);

      const debounce = setTimeout(() => {
        fetchDrugs(process.env.REACT_APP_API_KEY, keyword, 1, 1, 10);
      }, 100); // 100ms 디바운스

      return () => {
        clearTimeout(debounce);
      };
    } else {
      setOpenSearch(false);
      setSearchDrugs([]);
    }
  }, [keyword]);

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
        className="absolute left-52 top-3 h-10 w-8/12"
        type="text"
        placeholder="조회할 약품의 이름을 입력하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {openSearch && searchDrugs.length > 0 && (
        <ul className="border-myblue-500 absolute left-56 top-12 w-1/3 border-2 bg-mywhite p-3">
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

export default HeaderAutoMediInput;
