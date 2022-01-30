export default function Home(): JSX.Element {
  const newSet = new Set([1, 1, 2, 3, 4, 4, 5]);
  console.log(newSet);
  return (
    <div className="relative grid w-screen min-h-screen grid-cols-1 gap-y-3 bg-base">
      <div className="w-full h-full bg-red-600 border border-green-600"></div>
      <div className="grid w-full h-full grid-cols-2">
        <div className="w-full h-full bg-red-600 border border-green-600"></div>
        <div className="w-full h-full bg-red-600 border border-green-600"></div>
        <div className="w-full h-full bg-red-600 border border-green-600"></div>
        <div className="w-full h-full bg-red-600 border border-green-600"></div>
      </div>
      <div className="text-white">{newSet}</div>
    </div>
  );
}
