import { createContext } from 'react'

const noop = (token: string, id: string) => {}
const authNoop = () => {}
export const AuthContext = createContext({
    token: '',
    userId: '',
    login: noop,
    logout: authNoop,
    isAuthenticated: false,
})
