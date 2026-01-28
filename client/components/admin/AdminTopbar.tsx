export default function AdminTopbar() {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900">
      <span className="text-sm tracking-wide text-zinc-400">
        Admin Dashboard
      </span>

      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-300">
          dev@local.test
        </span>
        <div className="w-8 h-8 rounded-full bg-red-600" />
      </div>
    </header>
  );
}