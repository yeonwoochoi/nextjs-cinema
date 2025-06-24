import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string

  return (
    <div className="p-4 text-2xl font-bold">
      {id} 영화 상세 페이지
    </div>
  )
}