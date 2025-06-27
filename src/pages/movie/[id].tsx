import { useRouter } from "next/router";
import allMovies from '@/mock/movies.json'
import { MovieData } from "@/types";

export default function Page() {
  const router = useRouter()
  const id = router.query.id as string

  if (!id || Array.isArray(id)) {
    return <div className="text-4xl font-bold mt-6">Invalid ID</div>;
  }

  const movie = allMovies.find(movie => String(movie.id) === id)

  if (!movie) {
    return <div className="text-4xl font-bold mt-6">Loading...</div>
  }

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl
  }: MovieData = movie

  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="relative flex justify-center p-5 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={title} className="z-[1] h-full max-h-[350px]"/>
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="font-bold text-2xl">{title}</div>
      <div>{`${releaseDate} / ${genres.join(', ')} / ${runtime}분`}</div>
      <div className="mb-2">{company}</div>
      <div className="font-bold">{subTitle}</div>
      <div className="leading-[1.3] whitespace-pre-line">
        {description}
      </div>
    </div>
  )
}