import { ReactNode } from "react";

export default function LoadingMessage({children}: { children?: ReactNode }) {
  return (
    <>
      {children}
      <div className="p-4 text-gray-400 animate-pulse select-none font-bold">
        <span className="inline-block mr-2 text-4xl">🔄️</span>
        <span className="text-2xl">로딩 중입니다...</span>
      </div>
    </>
  )
}
