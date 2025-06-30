export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="p-4 text-red-700 font-bold">
      <span className="inline-block mr-2 text-4xl">⚠</span>
      <span className="text-2xl">{error}</span>
    </div>
  )
}