import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter()
  const q = router.query.q as string

  return (
    <div className="p-4 text-2xl font-bold">
      검색 결과 : {q}
    </div>
  )
}