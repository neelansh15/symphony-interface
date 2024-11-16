import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Lobster } from "next/font/google";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";

const lobster = Lobster({
  display: "swap",
  weight: "400",
});

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="fade-in-up h-screen w-full bg-secondary-100 rounded-3xl flex justify-center items-center">
        <div className="flex flex-col gap-8 items-center">
          <h1 className={clsx(lobster.className, "text-8xl")}>Symphony</h1>
          <h2 className="font-akira text-xl text-secondary-800">Zapier for Web3</h2>
        </div>
      </section>

      <section className="mt-10 flex flex-wrap justify-around gap-5">
        <div className="px-10 py-6 bg-secondary-900 text-secondary-100 font-black font-akira w-fit rounded-full">
          TOKENS
        </div>
        <div className="px-10 py-6 bg-secondary-900 text-secondary-100 font-black font-akira w-fit rounded-full">
          NFTs
        </div>
        <div className="px-10 py-6 bg-secondary-900 text-secondary-100 font-black font-akira w-fit rounded-full">
          TELEGRAM
        </div>
        <div className="px-10 py-6 bg-secondary-900 text-secondary-100 font-black font-akira w-fit rounded-full">
          BLOCKSCOUT
        </div>
        <div className="px-10 py-6 bg-secondary-900 text-secondary-100 font-black font-akira w-fit rounded-full">
          NEONEVM
        </div>
        <div className="px-10 py-6 bg-secondary-900 text-secondary-100 font-black font-akira w-fit rounded-full">
          PYTH
        </div>
      </section>

      <section className="mt-20 h-screen w-full flex flex-col md:grid md:grid-cols-2 gap-10">
        <h1 className="text-7xl font-semibold font-akira">
          Building Blocks for web3
        </h1>
        <div>
          <div className="grid grid-cols-3 grid-rows-2 place-items-center gap-5">
            <div className="p-1 h-36 w-36 bg-secondary-400 text-white font-black font-akira text-wrap rounded-xl">
              CREATE A TOKEN
            </div>
            <div className="p-1 h-36 w-36 bg-secondary-200 text-white font-black font-akira text-wrap rounded-xl">
              GENERATE MARKETING TEXT
            </div>
            <div className="p-1 h-36 w-36 bg-secondary-300 text-white font-black font-akira text-wrap rounded-xl">
              LAUNCH TOKEN ON TELEGRAM & SOCIALS
            </div>
            <div className="p-1 h-36 w-36 bg-secondary-600 text-white font-black font-akira text-wrap rounded-xl">
              WATCH A USER
            </div>
            <div className="p-1 h-36 w-36 bg-secondary-700 text-white font-black font-akira text-wrap rounded-xl">
              GET TRANSACTIONS
            </div>
            <div className="p-1 h-36 w-36 bg-secondary-800 text-white font-black font-akira text-wrap rounded-xl">
              ALERT TO WHEREVER
            </div>
          </div>
          <div className="mt-5 p-1 h-24 w-full bg-primary-300 text-white font-black font-akira text-wrap rounded-xl grid place-items-center">
            <div className="flex items-center gap-3">
              <PlusIcon />
              <span>ENDLESS POSSIBILITIES</span>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
