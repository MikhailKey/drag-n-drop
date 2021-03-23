import { useState, useCallback } from 'react'
import axios from 'axios'

export type messageType = {
    message: string
    status: number | null
}
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        message: '',
        status: null,
    })

    const request = useCallback(async (url, method = 'get', data = null) => {
        setLoading(true)
        let response = null
        await axios({
            url,
            method,
            data,
        })
            .then(res => {
                setLoading(false)
                response = res.data
            })
            .catch(err => {
                setLoading(false)
                setError({
                    message: err.response.data.message,
                    status: err.response.status,
                })
            })
        return response
    }, [])

    const clearError = () => setError({
        message: '',
        status: null
    })

    return {
        loading,
        request,
        error,
        clearError,
    }
}
