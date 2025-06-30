import { GetServerSideProps } from "next";
import { MovieData } from "@/types/types";
import ErrorMessage from "@/components/error-message";
import fetchOneMovie from "@/lib/fetch-one-movie";

interface MovieDetailPageProps {
  movie: MovieData | null,
  error?: string
}

export const getServerSideProps: GetServerSideProps<MovieDetailPageProps> = async (context) => {
  const { params } = context
  try {
    const { id } = params
    if (!id) {
      return {
        props: {
          movie: null,
          error: '잘못된 요청입니다.',
        }
      }
    }
    const { data, error } = await fetchOneMovie(id)
    if (!data || error) {
      throw new Error(error || '영화 데이터를 불러오지 못했습니다.')
    }

    return {
      props: {
        movie: data
      }
    }
  } catch (e) {
    console.error(e)

    return {
      props: {
        movie: null,
        error: e,
      }
    }
  }
}


export default function Page({movie, error}: MovieDetailPageProps) {
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