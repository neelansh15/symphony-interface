import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import clsx from "clsx";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={clsx(title(), "font-akira")}>About</h1>
          <div className="mt-10">
            <p>Team KiwiHQ building at ETHBangkok</p>

            <p></p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
