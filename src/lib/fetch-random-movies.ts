import { MovieData } from "@/types/types";
import { ApiResponse } from "@/types/api";

export default async function fetchRandomMovies(): Promise<ApiResponse<MovieData[]>> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/random`)
    if (!response.ok) {
      throw new Error('추천 영화 데이터를 불러오지 못했습니다.')
    }

    const recoMovies: MovieData[] = await response.json()

    return {
      data: recoMovies
    }
  } catch (e) {
    console.error(e)
    return {
      data: [],
      error: e,
    }
  }
}