import { ReactElement } from "react";
import SearchableLayout from "@/components/searchable-layout";
import allMovies from '@/mock/movies.json'
import MovieItem from "@/components/movie-item";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-16 py-4">
      <div>
        <div className="text-lg font-bold pb-4">지금 가장 추천하는 영화</div>
        <div className="grid grid-cols-3 gap-1">
          {allMovies
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(movie => {
              return <MovieItem key={movie.id} {...movie} />
            })}
        </div>
      </div>
      <div>
        <div className="text-lg font-bold pb-4">등록된 모든 영화</div>
        <div className="grid grid-cols-5 gap-1">
          {allMovies.map(movie => {
            return <MovieItem key={movie.id} {...movie} />
          })}
        </div>
      </div>
    </div>
  )
}


Home.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>
}