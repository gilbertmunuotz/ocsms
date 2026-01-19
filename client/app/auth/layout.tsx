export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full ">
        {/* Logo/Brand Area */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white tracking-widest mb-2">
            OCMS
          </h1>
          <div className="w-16 h-0.5 bg-red-600 mx-auto"></div>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm">
          {children}
        </div>

        {/* Footer */}
        <p className="text-zinc-600 text-xs text-center mt-8 tracking-wide">
          PERFORMANCE • LUXURY • PRECISION
        </p>
      </div>
    </div>
  );
}
