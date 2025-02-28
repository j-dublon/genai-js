import Link from "next/link";

import { ErrorBackground } from "./ErrorBackground";

interface Props {
  title: string;
}

export const ErrorPage = ({ title }: Props) => {
  return (
    <div className="relative min-h-screen w-full grow overflow-hidden px-4 pb-32 pt-48 text-core-white">
      <ErrorBackground />
      <main className="m-auto w-full text-center sm:max-w-[600px] [&_img]:max-h-[200px]">
        <img
          aria-hidden
          className="m-auto mb-4 block"
          src="https://images.prismic.io/cuckoo-egg/eb6e7284-c2a7-41e2-95d7-456c39fbc13d_cuckoo-logo-white.png?auto=compress,format"
          alt=""
          width={80}
          height={126}
        />
        <h1 className="mb-[0.5em] mt-0 text-5xl font-semibold leading-[1.1] tracking-[0]">
          {title}
        </h1>
        <Link href="/">
          <p>
            Start eggsploring the{" "}
            <span className="text-ui-link">homepage &gt;</span>
          </p>
        </Link>
      </main>
    </div>
  );
};
