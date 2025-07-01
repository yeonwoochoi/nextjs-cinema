import { GetStaticProps } from "next";
import { MovieData } from "@/types/types";
import ErrorMessage from "@/components/error-message";
import fetchOneMovie from "@/lib/fetch-one-movie";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import { ApiResponse } from "@/types/api";
import { useRouter } from "next/router";
import LoadingMessage from "@/components/loading-message";
import Head from "next/head";

interface MovieDetailPageProps {
  movie: MovieData | null,
  error?: string
}

export const getStaticPaths = async () => {
  try {
    const { data, error }: ApiResponse<MovieData[]> = await fetchRandomMovies();
    if (!data || error) {
      throw new Error(error)
    }
    return {
      paths: data.map(movie => ({ params: { id: `${movie.id}` }})),
      fallback: 'blocking'
    }
  } catch (e) {
    console.error(e)
    return {
      paths: [
        { params: { id: "1" }},
        { params: { id: "2" }},
        { params: { id: "3" }}
      ],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps<MovieDetailPageProps> = async (context) => {
  const { params } = context

  try {
    if (!params?.id || Array.isArray(params.id)) {
      return {
        props: {
          movie: null,
          error: '잘못된 요청입니다.',
        }
      }
    }
    const { data, error } = await fetchOneMovie(params.id)
    if (!data || error) {
      throw new Error(error || '영화 데이터를 불러오지 못했습니다.')
    }

    return {
      props: {
        movie: data
      }
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)

    return {
      props: {
        movie: null,
        error: errorMessage,
      }
    }
  }
}


export default function Page({movie, error}: MovieDetailPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <LoadingMessage>
        <Head>
          <title>한입 씨네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 씨네마" />
          <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요" />
        </Head>
      </LoadingMessage>
    )
  }

  if (!movie || error) {
    return <ErrorMessage error={error || "영화 데이터를 불러오지 못했습니다."} />
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  )
}
