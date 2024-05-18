import Image from "next/image";

export default function Home() {
  return (
    <div className="relative p-10 h-screen bg-gray-950 text-justify text-red-50 text-[4rem] tracking-[3px]">
      Benjamin Bergstein is a lot of things ❖ He is a polytalented autodidact, a
      American man, a semi-nomadic Jew, a year-of-the-dragon Aries, and a
      Resident of San Francisco. His current professional role is as Founding
      Engineer at{" "}
      <a href="litlab" className="text-sky-100">
        LitLab.ai
      </a>{" "}
      ❖ He is highly-effective remote worker best experienced face-to-face ❖ He
      is open to targeted consulting opportunities on early-stage projects both
      remote and on-site ❖ See you on the road&hellip;
      <span className="absolute right-10">🛣️</span>
    </div>
  );
}
