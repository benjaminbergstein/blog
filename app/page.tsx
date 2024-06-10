import { FC, PropsWithChildren } from "react";

const Star = () => <span className="text-blue-200 text-[0.5em]"> ❖ </span>;
const Orange: FC<PropsWithChildren> = ({ children }) => (
  <span className="text-orange-100">{children}</span>
);
export default function Home() {
  return (
    <div className="relative py-[5vw] px-[5vw] min-h-screen bg-red-950 gap-[100px] flex flex-col">
      <div className="text-red-200 text-[10vw] text-center">👋</div>
      <div className="text-red-50 text-justify uppercase font-normal text-[2rem] tracking-[2px] leading-[1.5em] flex items-center flex-wrap gap-x-[1em]">
        <Orange><span className="font-extrabold">Benjamin Bergstein</span></Orange>
        <Star />
        <Orange>is</Orange>
        <Star />
        <Orange>a</Orange>
        <Star />
        <Orange>Software Consultant</Orange>
        <Star />
        <Orange>Photographer</Orange>
        <Star />
        <Orange>humerous</Orange>
        <Star />
        <Orange>cook</Orange>
        <Star />
        <Orange>eccentric</Orange>
        <Star />
        <Orange>Outdoor enthusiast</Orange>
        <Star />
        <Orange>work in progress</Orange>
        <Star />
        <Orange>American-born</Orange>
        <Star />
        <Orange>aries</Orange>
        <Star />
        <Orange>of Jewish origin</Orange>
        <Star />
        <Orange>who</Orange>
        <Star />
        <Orange>likes animals</Orange>
        <Star />
        <Orange>people</Orange>
        <Star />
        <Orange>plants</Orange>
        <Star />
        <Orange>and</Orange>
        <Star />
        <Orange>resists definition</Orange>
        <Star />
        <Orange><a href="mailto:info@thebenbergstein.com" className="hover:border-b-4 transition-all hover:translate-y-[-2px] hover:border-pink-400 text-pink-400 bg-slate-100 px-2">inquiries</a></Orange>
      </div>
    </div>
  );
}
