import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types/types";
import fetchMovies from "@/lib/fetch-movies";
import LoadingMessage from "@/components/loading-message";
import ErrorMessage from "@/components/error-message";
import Head from "next/head";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [movies, setMovies] = useState<MovieData[]>([])

  const router = useRouter()
  const q = router.query.q

  const fetchSearchResult = async () => {
    setLoading(true)
    setError("")
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
    <div>
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마 - 검색결과" />
        <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요" />
      </Head>
      <div className="grid grid-cols-3 gap-1">
        {movies.map(movie => {
          return <MovieItem key={movie.id} {...movie} />
        })}
      </div>
    </div>
  )
}

Page.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
