import { ReactElement } from "react";
import Head from 'next/head'
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import ErrorMessage from "@/components/error-message";
import LoadingMessage from "@/components/loading-message";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types/types";

interface HomePageProps {
  allMovies: MovieData[],
  recoMovies: MovieData[],
  error?: string
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [allMoviesResponse, recoMoviesResponse] = await Promise.all([
      fetchMovies(),
      fetchRandomMovies()
    ])

    if (allMoviesResponse.error || recoMoviesResponse.error) {
      throw new Error(allMoviesResponse.error || recoMoviesResponse.error);
    }

    return {
      props: {
        allMovies: allMoviesResponse.data || [],
        recoMovies: recoMoviesResponse.data || [],
      }
    }
  } catch (e) {
    console.error(e)

    return {
      props: {
        allMovies: [],
        recoMovies: [],
        error: '영화 데이터를 불러오지 못했습니다.',
      },
      revalidate: 60
    }
  }
}


export default function Home({ allMovies, recoMovies, error }: HomePageProps) {
  const router = useRouter()

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (router.isFallback) {
    return <LoadingMessage />
  }

  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요" />
      </Head>
      <div className="flex flex-col gap-y-16 py-4">
        <div>
          <div className="text-lg font-bold pb-4">지금 가장 추천하는 영화</div>
          <div className="grid grid-cols-3 gap-1">
            {recoMovies.map(movie => {
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
    </>
  )
}


Home.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
