"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import detailBg from "@/assets/images/bg-detail.svg";
import useTab from "@/components/Tabbar/useTab";
import TabDetails from "./TabDetails";
import DepositWithdraw from "./DepositWithdraw";
import PieChart from "@/components/Chart/PieChart/PieChart";
import usdc from "@/assets/images/crypto/usdc.svg";
import btc from "@/assets/images/crypto/bitcoin.svg";

interface Asset {
  asset: string;
  symbol: string;
  contract: string;
  chain: string;
  invest_amount: number;
  weight: string;
  holding: string;
  price_change: {
    "24h": string;
  };
  dgt_score: number;
  status: boolean;
}

export default function Overview() {
  // const { currentAccount } = useWalletKit();
  let assets: Asset[];

  // Call Api
  const [datas, setDatas] = useState<any[]>([]);
  const [dataDetails, setDataDetails] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/vault_detail?vault_id=dgt1&fbclid=IwAR1Z7yE9yIjhcbPds_6_CSr-R487BHzqDiy4SufmyRmozuLmXnN2SJp_S94"
      );
      const data = await response.json();

      setDatas(data);
    };

    const fetchDataDetails = async () => {
      // Api Default
      const response = await fetch(
        "https://dgt-dev.vercel.app/v1/vault_allocation?vault_id=dgt1"
      );
      const data = await response.json();

      setDataDetails(data);
    };

    fetchData();
    fetchDataDetails();
  }, []);
  // End call api

  assets = dataDetails?.assets || [];
  const chartData: { name: string; value: number }[] = dataDetails?.assets.map(
    (asset: Asset) => {
      return {
        name: asset.symbol,
        value: parseFloat(asset.holding.slice(0, -1)),
      };
    }
  );
  console.log(chartData);

  return (
    <div className="mt-11 ">
      <div>
        <h1 className="sm:hidden pb-5 font-semibold text-[#2563EB] text-2xl sm:text-3xl sm:text-[36px] sm:leading-[54px] text-center">
          Deposit/ Withdraw
        </h1>
      </div>
      <div className="sm:hidden w-full mb-10 py-10 sm:py-0 sm:w-[30%] h-[297px] rounded-[10px]">
        <DepositWithdraw />
      </div>
      <div>
        <h1 className="pb-5 font-semibold text-[#2563EB] text-2xl sm:text-3xl sm:text-[36px] sm:leading-[54px] text-center">
          Overview
        </h1>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap justify-between">
        <div className="w-full sm:w-[67%] h-full ">
          {/* Balance */}
          <div className="sm:grid sm:grid-cols-4 sm:gap-x-4">
            <div className="sm:space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
              <div className="text-base font-medium leading-7 text-gray-800">
                Price
              </div>
              {datas.map((data) => (
                <div
                  key={data.vault_id}
                  className="flex items-center text-2xl sm:text-3xl font-semibold leading-7 text-gray-800"
                >
                  <span>{data.currency}</span>
                  <p>{data.price}</p>
                </div>
              ))}
            </div>

            <div className="my-2 sm:my-0 sm:space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
              <div className="text-base font-medium leading-7 text-gray-800">
                TVL
              </div>
              {datas.map((data) => (
                <div
                  key={data.vault_id}
                  className="flex items-center text-2xl sm:text-3xl font-semibold leading-7 text-gray-800"
                >
                  <span>{data.currency}</span>
                  <p>{data.tvl}</p>
                </div>
              ))}
            </div>

            <div className="my-2 sm:my-0 sm:space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
              <div className="text-base font-medium leading-7 text-gray-800">
                Volume
              </div>
              {datas.map((data) => (
                <div
                  key={data.vault_id}
                  className="flex items-center text-2xl sm:text-3xl font-semibold leading-7 text-gray-800"
                >
                  <span>{data.currency}</span>
                  <p>{data.volume}</p>
                </div>
              ))}
            </div>

            <div className="my-2 sm:my-0 sm:space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
              <div className="text-base font-medium leading-7 text-gray-800">
                Return
              </div>
              {datas.map((data) => (
                <div
                  key={data.vault_id}
                  className="flex items-center text-2xl sm:text-3xl font-semibold leading-7 text-gray-800"
                >
                  <span>{data.currency}</span>
                  <p>{data.return}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-full flex items-start">
            <div className="relative sm:w-[42%]">
              <div className="absolute top-[30px] left-[-5px] sm:top-[34px] sm:left-[55px]">
                <PieChart data={chartData} />
              </div>
              <div className="absolute top-[110px] left-[65px] sm:top-[110px] sm:left-[123px] ">
                <div className="flex gap-3 justify-center">
                  <Image width={24} height={24} src={usdc} alt="usdc" />
                  <span className="font-semibold text-[#90A3BF] leading-normal">
                    AAVE
                  </span>
                </div>
                <div className="font-semibold text-[32px] leading-normal tracking-tighter">
                  39.11%
                </div>
              </div>
            </div>
            <div className="ml-[240px] sm:ml-0 sm:w-[58%] pt-11">
              <div className="flex gap-3">
                <Image width={24} height={24} src={usdc} alt="usdc" />
                <span className="font-semibold text-[#90A3BF] leading-normal">
                  AAVE
                </span>
              </div>
              <h3 className="pt-4 pb-3 font-normal text-gray-800 leading-7">
                HOLDING
              </h3>
              <p className="text-gray-800 font-semibold text-2xl sm:text-3xl leading-7">
                $436.89
              </p>
              <h3 className="pt-[34px] pb-3 font-normal text-gray-800 leading-7">
                PRICE 24H
              </h3>
              <div className="flex items-end gap-[5px]">
                <p className="text-gray-800 font-semibold text-2xl sm:text-3xl leading-7">
                  $3.95
                </p>
                <div className="flex items-center text-green-500 text-xs font-normal leading-normal">
                  <span className="">2.44%</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.0496 3.35769C4.94405 3.46323 4.8794 3.6099 4.87961 3.77097L4.87961 3.84187C4.87961 4.16443 5.14074 4.42555 5.46288 4.42514L8.64993 4.42514L3.2587 9.81637C3.03101 10.0441 3.03101 10.4136 3.2587 10.6413C3.48639 10.869 3.85597 10.869 4.08366 10.6413L9.47488 5.2501L9.47488 8.43714C9.47488 8.7597 9.73601 9.02083 10.0582 9.02041L10.129 9.02041C10.4516 9.02041 10.7127 8.75929 10.7123 8.43714L10.7123 3.77097C10.7123 3.44842 10.4512 3.18729 10.129 3.1877L5.46288 3.1877C5.3016 3.1877 5.15514 3.25215 5.0496 3.35769Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="mt-11 bg-white min-w-full border border-[#C3D4E9]">
              <thead>
                <tr className="">
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-left text-base leading-4 text-gray-800 tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-left text-base leading-4 text-gray-800 tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-left text-base leading-4 text-gray-800 tracking-wider">
                    Holding
                  </th>
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-left text-base leading-4 text-gray-800 tracking-wider">
                    Price 24h
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr className="border-b border-b-[#C3D4E9] text-sm sm:text-base text-gray-800 font-medium leading-normal">
                    <td className="px-6 py-6 whitespace-no-wrap border-b border-b-[#C3D4E9]">
                      <div className="flex items-center ">
                        <Image className="w-8 h-8" src={btc} alt="bitcoin" />
                        <span className="ml-2 sm:ml-4">{asset.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-no-wrap border-b border-b-[#C3D4E9]">
                      {true ? asset.weight : "--"}
                    </td>
                    <td className="px-6 py-6 whitespace-no-wrap border-b border-b-[#C3D4E9]">
                      {true ? asset.holding : "--"}
                    </td>
                    <td className="px-6 py-6 whitespace-no-wrap border-b border-b-[#C3D4E9]">
                      <div>$ 6.35</div>
                      <div className="text-green-500">5.50%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="hidden sm:block py-10 sm:py-0 sm:w-[30%] h-[297px] rounded-[10px]">
          <DepositWithdraw />
        </div>
      </div>
    </div>
  );
}
