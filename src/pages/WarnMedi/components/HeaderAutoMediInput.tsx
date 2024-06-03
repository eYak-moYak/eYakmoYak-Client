import React, { useState, useEffect } from "react";
import axios from "axios";
import registerMediIcon from "../../../assets/registerMedi";

export interface Drug {
  itemName: string;
  entpName: string;
  itemImage: string;
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
      setOpenSearch(true);
      setSearchDrugs([]); // 검색어 변경 시 이전 결과 초기화

      const debounce = setTimeout(() => {
        fetchDrugs(process.env.REACT_APP_API_KEY, keyword, 1, 10);
        fetchAdditionalDrugs(process.env.REACT_APP_API_KEY, keyword);
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
    numOfRows: number,
  ) {
    try {
      const url = `${process.env.REACT_APP_MEDI_NAME_URL}`;
      const response = await axios.get(url, {
        params: {
          serviceKey: decodeURIComponent(serviceKey),
          itemName: encodeURIComponent(itemName),
          pageNo,
          numOfRows,
          type: "json",
        },
      });

      if (
        response.data &&
        response.data.body &&
        Array.isArray(response.data.body.items)
      ) {
        const drugs = response.data.body.items.map((item: any) => ({
          itemName: item.itemName,
          entpName: item.entpName,
          itemImage: item.itemImage || "", // 기본값으로 빈 문자열 사용
        }));
        setSearchDrugs((prevDrugs) =>
          filterAndMergeDrugs([...prevDrugs, ...drugs]),
        );
      } else {
        console.log("No items found or 'items' is not an array");
        setSearchDrugs([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchDrugs([]);
    }
  }

  async function fetchAdditionalDrugs(serviceKey: any, itemName: string) {
    try {
      const url = `${process.env.REACT_APP_MEDI_NAME_URL2}`;
      const response = await axios.get(url, {
        params: {
          serviceKey: decodeURIComponent(serviceKey),
          item_name: encodeURIComponent(itemName),
          pageNo: 1,
          numOfRows: 10,
          type: "json",
        },
      });

      if (
        response.data &&
        response.data.body &&
        Array.isArray(response.data.body.items)
      ) {
        const drugs = response.data.body.items.map((item: any) => ({
          itemName: item.ITEM_NAME,
          entpName: item.ENTP_NAME,
          itemImage: item.ITEM_IMAGE || "", // 기본값으로 빈 문자열 사용
        }));
        setSearchDrugs((prevDrugs) =>
          filterAndMergeDrugs([...prevDrugs, ...drugs]),
        );
      } else {
        console.log("No items found or 'items' is not an array");
      }
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  }

  function filterAndMergeDrugs(drugs: Drug[]): Drug[] {
    const uniqueDrugs = new Map<string, Drug>();
    drugs.forEach((drug) => {
      uniqueDrugs.set(drug.itemName, drug);
    });
    return Array.from(uniqueDrugs.values()).slice(0, 7); // 검색 결과를 7개로 제한
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
            <li
              key={index}
              className="flex items-center gap-2"
              onClick={() => handleOnClick(drug)}
            >
              {drug.itemImage ? (
                <img
                  src={drug.itemImage}
                  alt="약 이미지"
                  width={60}
                  height={60}
                />
              ) : (
                <div
                  className="flex items-center justify-center"
                  style={{ width: 60 }}
                >
                  <img
                    src={registerMediIcon.defaultDrug}
                    width={30}
                    height={30}
                    alt="기본 알약 사진"
                  />
                </div>
              )}
              {drug.itemName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderAutoMediInput;
