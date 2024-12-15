export default function Footer() {
  return (
    <div className="bg-white min-h-screen w-full p-8">
      <div className="bg-cover bg-[url('/default.png')] min-h-[calc(100vh-4rem)] w-full p-10 border-4 border-white">
        <div className="flex flex-col h-full w-full justify-between">
          <div>
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
    </div>
  );
}
