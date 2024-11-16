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
          <h2 className="font-akira">Zapier for Web3</h2>
        </div>
      </section>

      <section className="flex flex-col md:grid md:grid-cols-2">
        
      </section>
    </DefaultLayout>
  );
}
