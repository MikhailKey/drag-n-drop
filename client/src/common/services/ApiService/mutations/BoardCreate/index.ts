import { useMutation, UseMutationOptions } from 'react-query'
import { AxiosError } from 'axios'
import axiosInstance from 'common/services/ApiService/fetch'
import {
    BoardCreateResponse,
    BoardCreateVariables,
} from 'common/services/ApiService/mutations/BoardCreate/types'
import { api } from 'common/services/ApiService/const'

const sendBoardRequest = async (params: BoardCreateVariables) => {
    const { data } = await axiosInstance.post<BoardCreateResponse>(
        `${api}/boards/create`,
        params.body
    )

    return data
}

export const useBoardCreateMutation = (
    config?: UseMutationOptions<
        BoardCreateResponse,
        AxiosError,
        BoardCreateVariables
    >
) =>
    useMutation<BoardCreateResponse, AxiosError, BoardCreateVariables>(
        sendBoardRequest,
        config
    )
