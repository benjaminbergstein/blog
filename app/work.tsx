import { FC, PropsWithChildren } from "react";

const Star = () => <span className="text-blue-200"> ❖ </span>;
const Orange: FC<PropsWithChildren> = ({ children }) => (
  <span className="text-orange-100">{children}</span>
);
export default function Home() {
  return (
    <div className="relative py-[5vw] px-[5vw] min-h-screen bg-red-950 gap-[100px] flex flex-col">
      <div className="text-red-200 text-[4vw] text-center">👋</div>
      <div className="text-red-50 text-justify text-[4rem] tracking-[3px] leading-[1.75em]">
        <Orange>Benjamin Bergstein is</Orange> a lot of things
        <Star />
        <Orange>He</Orange> works and plays.
        <Star />
        <Orange>He eats</Orange> his dang vegetables and sometimes, when he
        wants to, he eats animals parts too.
        <Star />
        <Orange>His current</Orange> professional role is as Founding Engineer
        at{" "}
        <a
          href="litlab"
          className="text-sky-50 hover:text-sky-200 transition-all hover:translate-y-1"
        >
          LitLab.ai
        </a>{" "}
        <Star />
        <Orange>He is</Orange> a highly-effective remote worker best experienced
        face-to-face
        <Star />
        <Orange>He is</Orange> open to remote and on-site consulting engagements
        that demand an individual contributor with wide-ranging skills, tools
        and perspective.
        <Star />
        <Orange>He is</Orange> one of many one-of-kind people.
        <Star />
        <span className="text-lime-100">See you out there&hellip;</span>
        <span className="absolute right-[5vw]">🛣️</span>
      </div>
    </div>
  );
}
