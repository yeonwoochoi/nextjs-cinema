import { KeyboardEvent, ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const q = router.query.q as string
  const [search, setSearch] = useState("")

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit()
    }
  }

  return (
    <div>
      <div className="flex w-full gap-2 h-12 my-2 px-4">
        <input
          type="text"
          placeholder="검색어를 입력하세요 ..."
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border border-gray-600 placeholder-gray-600 rounded-md px-4"
        />
        <button className="w-[80px] bg-[#434343] rounded-md" onClick={onSubmit}>
          검색
        </button>
      </div>
      {children}
    </div>
  )
}