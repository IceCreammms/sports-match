import Button from "@/components/button";

export default function Landing() {
    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <div className="bg-cover bg-[url('/default.png')] h-[calc(100vh-5rem)] w-[1400px] overflow-hidden flex flex-col justify-center items-center">
                <div className="font-[family-name:var(--font-maru-mega)] text-[220px]">PlayPulse</div>
                <div className="font-[family-name:var(--font-satoshi)] text-[40px] text-black font-bold">Every passion has its sport – discover yours.</div>
                <Button />
            </div>
        </div>
    )
}