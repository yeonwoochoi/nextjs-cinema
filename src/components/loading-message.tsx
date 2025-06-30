export default function LoadingMessage() {
  return (
    <div className="p-4 text-gray-400 animate-pulse select-none font-bold">
      <span className="inline-block mr-2 text-4xl">🔄️</span>
      <span className="text-2xl">로딩 중입니다...</span>
    </div>
  )
}