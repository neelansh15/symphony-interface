import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:top-gradient-2 relative flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-12">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center mt-2 py-5">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/neelansh15/symphony-interface"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Made at</span>
          <p className="text-primary">ETHBangkok 2024</p>
        </Link>
      </footer>
    </div>
  );
}
