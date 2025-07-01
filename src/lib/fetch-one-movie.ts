import { MovieData } from "@/types/types";
import { ApiResponse } from "@/types/api";

export default async function fetchOneMovie (id: string): Promise<ApiResponse<MovieData>> {
  try {
    if (!id) {
      throw new Error("잘못된 요청입니다.")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`)
    if (!response.ok) {
      throw new Error("영화 데이터를 불러오지 못했습니다.")
    }
    const movie = await response.json()
    return {
      data: movie
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.error(errorMessage)
    return {
      data: null,
      error: errorMessage
    }
  }
}