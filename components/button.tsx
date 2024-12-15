"use client";
import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  return (
    <div className="flex my-32 items-center justify-around">
      <button
        onClick={() => router.push("/#quizz")}
        className="bg-[#3A18D1] rounded-[100px] w-[400px] border-black border-[3px] box-border	"
      >
        <span className="bg-white block p-4 translate-x-2 -translate-y-2 hover:-translate-y-3 active:translate-x-0 active:translate-y-0 border-black border-[3px] rounded-[100px] font-[family-name:var(--font-satoshi)] text-[40px] text-black font-bold transition-all">
          Start now
        </span>
      </button>
    </div>
  );
}
