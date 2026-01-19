export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111]">
      <div className="w-full max-w-md bg-[#1F1F1F] p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#DA291C]">
          OCMS
        </h1>
        {children}
      </div>
    </div>
  );
}
