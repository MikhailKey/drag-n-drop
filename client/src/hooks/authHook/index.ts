import { useState, useCallback, useEffect } from 'react'

const storageName = 'user_data'

export const useAuth = () => {
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    const login = useCallback((token, id) => {
        setToken(token)
        setUserId(id)

        localStorage.setItem(
            'user_data',
            JSON.stringify({
                userId: id,
                token,
            })
        )
    }, [])

    const logout = useCallback(() => {
        setToken('')
        setUserId('')
        localStorage.removeItem('user_data')
    }, [])

    useEffect(() => {
        const data = JSON.parse(<string>localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token, userId }
}
