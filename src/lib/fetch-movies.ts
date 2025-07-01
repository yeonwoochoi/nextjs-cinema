import { MovieData } from "@/types/types";
import { ApiResponse } from "@/types/api";

export default async function fetchMovies(q?: string): Promise<ApiResponse<MovieData[]>> {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/movie`
    if (q) {
      url += `/search?q=${q}`
    }
    console.log(url)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('영화 데이터를 불러오지 못했습니다.')
    }

    const allMovies: MovieData[] = await response.json()

    return {
      data: allMovies,
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return {
      data: [],
      error: errorMessage,
    }
  }
}