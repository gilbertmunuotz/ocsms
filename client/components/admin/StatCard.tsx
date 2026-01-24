export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
      <p className="text-zinc-400 text-sm mb-2 tracking-wide">
        {title}
      </p>
      <p className="text-3xl font-light text-white">
        {value}
      </p>
    </div>
  );
}