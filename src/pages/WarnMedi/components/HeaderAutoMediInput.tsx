import React, { useState, useEffect } from "react";
import axios from "axios";

interface Drug {
  // 약 이름과 약 회사명을 사용
  itemName: string;
  entpName: string;
}

const HeaderAutoMediInput: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [drugs, setDrugs] = useState<Drug[]>([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) {
        fetchDrugs(process.env.REACT_APP_API_KEY, keyword, 1, 1, 10);
      }
    }, 300); // 300ms 디바운스

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  async function fetchDrugs(
    serviceKey: any,
    itemName: string,
    pageNo: number,
    startPage: number,
    numOfRows: number,
  ) {
    try {
      const url = `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList`;
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
      console.log(response.data);

      if (
        response.data &&
        response.data.body &&
        Array.isArray(response.data.body.items)
      ) {
        response.data.body.items.forEach((item: Drug) => {
          console.log(
            `Item Name: ${item.itemName}, Enterprise Name: ${item.entpName}`,
          );
        });
        setDrugs(response.data.body.items);
      } else {
        console.log("No items found or 'items' is not an array");
        setDrugs([]); // 데이터가 없으면 빈 배열 설정
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDrugs([]);
    }
  }

  return (
    <div>
      <input
        className="fixed left-52 top-3 h-10 w-8/12"
        type="text"
        placeholder="조회할 약품의 이름을 입력하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {drugs.length > 0 && (
        <ul className="border-myblue-500 fixed left-56 top-12 w-fit border-2 bg-mywhite p-3">
          {drugs.map((drug, index) => (
            <li key={index}>{drug.itemName}</li>
          ))}
        </ul>
      )}
      <button className="fixed right-52 top-4 h-7 w-16" type="button">
        검색
      </button>
    </div>
  );
};

export default HeaderAutoMediInput;
