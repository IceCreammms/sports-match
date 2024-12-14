export default function Footer() {
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center">
      <div className="bg-cover bg-[url('/default.png')] h-screen w-screen p-10">
        <div className="flex flex-col h-full w-full">
          <h1 className="font-[family-name:var(--font-maru-mega)] text-[220px]">
            PlayPulse
          </h1>
          <ul className="font-[family-name:var(--font-satoshi)] font-medium text-[40px]">
            <li>About us</li>
            <li>F.A.Q</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="font-[family-name:var(--font-satoshi)] flex justify-end gap-3 text-[20px]">
          <p>Legal Notice</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
