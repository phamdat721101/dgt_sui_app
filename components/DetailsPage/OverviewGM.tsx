"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormatter } from "next-intl";
import dynamic from "next/dynamic";
import detailBg from "@/assets/images/bg-detail.svg";
import useTab from "@/components/Tabbar/useTab";
import TabDetails from "./TabDetails";
import DepositWithdraw from "./DepositWithdraw";
import PieChart from "@/components/Chart/PieChart/ActivePieChart";
import usdc from "@/assets/images/crypto/usdc.svg";
import btc from "@/assets/images/crypto/bitcoin.svg";
import digitrustNoTextLogo from "@/assets/images/digitrust_notext.png";

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
  logo_url: string;
}

export default function Overview() {
  const format = useFormatter();
  let assets: Asset[];

  // Call Api
  const [datas, setDatas] = useState<any[]>([]);
  const [dataDetails, setDataDetails] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      // Api Default
      // const response = await fetch(
      //   "https://dgt-dev.vercel.app/v1/vault_detail?vault_id=dgt1"
      // );
      // const data = await response.json();

      const data = [
        {
            "vault_id": 1,
            "vault_name": "dgt_info_1",
            "manager": "dgt_manager",
            "logo":"http://localhost:3000/image/logo",
            "vault_desc": "",
            "vault_adr": "0x7DF4d143f34203Bd670DB5162fA79b735ef1cE95",
            "return": "18",
            "assets":["CETUS", "SUI", "SUILIEN"],
            "created_at":1231,
            "updated_at":12312,
            "tvl": 2000, 
            "volume": 15,
            "price": 24,
            "currency":"$"
        }
      ]

      setDatas(data);
    };

    const fetchDataDetails = async () => {
      // Api Default
      // const response = await fetch(
      //   "https://dgt-dev.vercel.app/v1/vault_allocation?vault_id=1"
      // );
      // const data = await response.json();
      const data = {
        "price": "1348$",
        "vault_id":"finX",
        "vault_name":"High risk",
        "vault_type":1,
        "holding_value":"368000$",
        "amount_raised":"45%",
        "package":"dgt_low_risk",
        "assets":[
            {
                "asset": "NOT coin",
                "symbol": "NOT",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":10, 
                "weight":"67.4%", 
                "holding":"1348$",
                "price_change":{
                    "24h":"5.5",                
                },
                "dgt_score": 8,
                "status":true,
                "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqavlwfdxgf2lxm67y4yzc17wykd9a0guwpkms1gosm__not.png"
            },
            {
                "asset": "Resistance DOG",
                "symbol": "REDO",
                "contract": "0x138234234",
                "chain": "btc layer-2",
                "invest_amount":90, 
                "weight":"32.6%", 
                "holding":"652$",
                "price_change":{
                    "24h":"6.5",                
                },
                "dgt_score": 8,
                "status":true,
                "logo_url":"https://dd.dexscreener.com/ds-data/tokens/ton/eqbz_cafpydr5kuts0anxh0ztdhkpezonmlja2sngllm4cko.png"
            }
        ]
      }

      setDataDetails(data);
    };

    fetchData();
    fetchDataDetails();
  }, []);
  // End call api

  assets = dataDetails?.assets || [];
  const chartData: { name: string; value: number; logo_url: string }[] =
    dataDetails?.assets.map((asset: Asset) => {
      return {
        name: asset.symbol,
        value: parseFloat(asset.holding.slice(0, -1)),
        logo_url: asset.logo_url,
      };
    });

  return (
    <div className="mt-11 ">
      <div className="sm:hidden w-full mb-10 py-1 sm:py-0 sm:w-[30%] h-[297px] rounded-[10px]">
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
          <div className="sm:grid sm:grid-cols-3 sm:gap-x-4">
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
                  <p>{format.number(data.price)}</p>
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
                  <p>{format.number(data.tvl)}</p>
                </div>
              ))}
            </div>

            {/* <div className="my-2 sm:my-0 sm:space-y-3 rounded-xl border border-gray-45 bg-white px-6 py-4 backdrop-blur-lg">
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
            </div> */}

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
          <div className="mx-auto w-full text-bold text-xl">
            <PieChart data={chartData} />
          </div>
          <div className="overflow-x-auto">
            <table className="bg-white min-w-full border border-[#C3D4E9]">
              <thead>
                <tr className="">
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                    Holding
                  </th>
                  <th className="px-6 py-6 border-b border-b-[#C3D4E9] text-nowrap text-left text-base leading-4 text-gray-800 tracking-wider">
                    Price 24h
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr className="border-b border-b-[#C3D4E9] text-sm sm:text-base text-gray-800 font-medium leading-normal">
                    <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                      <div className="flex items-center ">
                        <Image
                          src={asset.logo_url}
                          alt="bitcoin"
                          width={32}
                          height={32}
                        />
                        <span className="ml-2 sm:ml-4">{asset.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                      {asset.weight}
                    </td>
                    <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                      ${format.number(+asset.holding.slice(0, -1))}
                    </td>
                    <td className="px-6 py-6 whitespace-no-wrap text-nowrap border-b border-b-[#C3D4E9]">
                      <div className="text-green-500">
                        {format.number(+asset.price_change["24h"])}%
                      </div>
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
