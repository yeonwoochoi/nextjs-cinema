import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types/types";
import fetchMovies from "@/lib/fetch-movies";
import LoadingMessage from "@/components/loading-message";
import ErrorMessage from "@/components/error-message";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [movies, setMovies] = useState<MovieData[]>([])

  const router = useRouter()
  const q = router.query.q

  const fetchSearchResult = async () => {
    try {
      const { data, error } = await fetchMovies(q as string)
      if (error || !data || data.length === 0) {
        setError("검색 결과가 없습니다.")
        setMovies([])
      } else {
        setMovies(data)
      }
    } catch {
      setError("검색 중 오류가 발생했습니다.")
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!q) return
    fetchSearchResult()
  }, [q])

  if (loading) return <LoadingMessage />
  if (error) return <ErrorMessage error={error} />

  return (
    <div className="grid grid-cols-3 gap-1">
      {movies.map(movie => {
        return <MovieItem key={movie.id} {...movie} />
      })}
    </div>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>
}