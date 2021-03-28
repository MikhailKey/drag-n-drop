import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import { AxiosError } from 'axios'
import { api } from 'common/services/ApiService/const'
import axiosInstance from 'common/services/ApiService/fetch'
import {
    BoardsQueryResponse,
    BoardsQueryVariables,
} from 'common/services/ApiService/queries/Boards/types'

export const queryKey = 'boards'

export const getBoardsQueryKey = (params: BoardsQueryVariables) => [
    queryKey,
    params,
]
const getBoardsRequest = async (params: BoardsQueryVariables) => {
    const { data } = await axiosInstance.get<BoardsQueryResponse>(
        `${api}/boards`,
        { params }
    )

    return data
}

export const useBoardsQuery = (
    params: BoardsQueryVariables,
    config?: UseQueryOptions<BoardsQueryResponse, AxiosError>
) =>
    useQuery({
        queryKey: getBoardsQueryKey(params),
        queryFn: () => getBoardsRequest(params),
        ...(config || {}),
    })
