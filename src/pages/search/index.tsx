import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import allMovies from '@/mock/movies.json'
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([])
  const router = useRouter()
  const q = router.query.q as string

  const fetchSearchResult = () => {
    const searchedMovies = allMovies
      .filter(movie => {
        return movie.title.includes(q)
      })
    setMovies(searchedMovies)
  }

  useEffect(() => {
    if (q) {
      fetchSearchResult()
    }
  }, [q])

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