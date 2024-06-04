import React, { useEffect, useState } from "react";

import MyInput from "../DigiTrust/DateInput";

interface Data {
  date: string;
  name: string;
  symbol: string;
  quantity: number;
  purchase_price: string;
  current_price: string;
  total_loss: string;
  tx_hash: string;
  exp_date: string;
}

const Strategy = () => {
  let datas: Data[];

  // Call Api
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const fetchDataDetails = async () => {
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/portfolio_tracker?user_adr=0x12d2"
      );
      const data = await response.json();

      setData(data);
    };

    fetchDataDetails();
  }, []);
  // End call api
  datas = data || [];

  return (
    <>
      <div className="flex gap-[18px] py-4 sm:py-6">
        <span className="text-2xl sm:text-3xl text-gray-800 font-semibold">
          History
        </span>
        {/* <span className="px-3 bg-blue-100 font-medium text-blue-600 text-base leading-7 rounded-[7px]">
          Current Strategy
        </span>
        <span className="px-3 bg-[#E0E9F4] font-medium text-[#90A3BF] text-base leading-7 rounded-[7px]">
          Historical Strategy
        </span> */}
      </div>
      {/* <div className="flex justify-between">
        <div className="w-[18%]">
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Strategy Status
          </span>
          <form className="mt-1 w-full h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
            <select className="px-3 w-full border border-[#C3D4E9] rounded-lg focus-visible:bg-gray-100 focus:outline-none">
              <option value="all">All</option>
              <option value="something">Something</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <div className="w-[18%]">
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Trading Currency
          </span>
          <form className="mt-1 w-full h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
            <select className="px-3 w-full border border-[#C3D4E9] rounded-lg focus-visible:bg-gray-100 focus:outline-none">
              <option value="all">All</option>
              <option value="somethine">Something</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <div className="w-[18%]">
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Pricing Currency
          </span>
          <form className="mt-1 w-full h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
            <select className="px-3 w-full border border-[#C3D4E9] rounded-lg focus-visible:bg-gray-100 focus:outline-none">
              <option value="all">All</option>
              <option value="somethine">Something</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <div>
          <span className="font-normal text-sm text-gray-800 leading-normal">
            Date
          </span>
          <div className="flex gap-2.5">
            <div className="flex items-center justify-between mt-1 w-[210px] h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
              <MyInput
                type="date"
                label="Start day"
                size="custom"
                radius="lg"
                value={"2024-01-01"}
              />
            </div>
            <div className="flex items-center justify-between mt-1 w-[210px] h-[52px] bg-white flex font-normal text-base text-gray-800 rounded-lg">
              <MyInput
                type="date"
                label="End day"
                size="custom"
                radius="lg"
                value={"2024-05-01"}
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="sm:py-8 overflow-x-auto">
        <table className="table-auto w-full px-1.5 bg-white text-left border border-[#C3D4E9]">
          <thead className="text-sm sm:text-base	font-medium	text-gray-800 tracking-tight">
            <tr>
              <th className="w-[9%] pl-1.5 px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Date
              </th>
              <th className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Name
              </th>
              <th className="w-[9%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Symbol
              </th>
              <th className="w-[11%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Quantity
              </th>
              <th className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Purchase Price
              </th>
              <th className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Current Price
              </th>
              <th className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Total Loss
              </th>
              <th className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                Tx Hash
              </th>
              <th className="w-[11%] pr-1.5 px-2 py-6 border-b border-b-[#C3D4E9] text-right whitespace-nowrap">
                Expiration Date
              </th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base	text-gray-800 tracking-tight">
            {datas.length != 0 ? (
              datas.map((data: any) => (
                <tr>
                  <td className="w-[9%] pl-1.5 px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.date}
                  </td>
                  <td className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.name}
                  </td>
                  <td className="w-[9%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.symbol}
                  </td>
                  <td className="w-[11%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.quantity}
                  </td>
                  <td className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.purchase_price}
                  </td>
                  <td className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.current_price}
                  </td>
                  <td className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.total_loss}
                  </td>
                  <td className="w-[12%] px-2 py-6 border-b border-b-[#C3D4E9] whitespace-nowrap">
                    {data.tx_hash}
                  </td>
                  <td className="w-[11%] pr-1.5 px-2 py-6 border-b border-b-[#C3D4E9] text-center whitespace-nowrap">
                    {data.exp_date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-5">
                  No history
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Strategy;
