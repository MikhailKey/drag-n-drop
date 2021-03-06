import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { darkTheme } from './utils/theme'
import { useAuth } from './hooks/authHook'
import { ThemeProvider } from '@material-ui/core/styles'
import { useRoutes } from './routes'
import { AuthContext } from './context/authContext'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useGlobalStyles = makeStyles(() =>
    createStyles({
        '@global': {
            a: {
                textDecoration: 'none',
            },
            body: {
                background: 'linear-gradient(to right, #151515, #2e2e2e)',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
                height: '100%',
                width: '100%',
                minWidth: '100vw',
                minHeight: '100vh',
            },
        },
    })
)

const GlobalStyles = () => {
    useGlobalStyles()

    return null
}

const App: React.FC = () => {
    const { token, userId, login, logout } = useAuth()
    const isAuthenticated: boolean = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyles />
                <AuthContext.Provider
                    value={{
                        token,
                        userId,
                        login,
                        logout,
                        isAuthenticated,
                    }}>
                    <Router>{routes}</Router>
                </AuthContext.Provider>
            </ThemeProvider>
        </>
    )
}

export default App
