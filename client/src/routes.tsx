import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './components/navbar'
import BoardsPage from './pages/BoardsPage'
import BoardPage from './pages/BoardPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path="/boards" exact>
                        <BoardsPage />
                    </Route>
                    <Route path="/boards/:id">
                        <BoardPage />
                    </Route>
                    <Redirect to="/boards" />
                    <Route path="*">
                        <p>Указанной страницы нет</p>
                    </Route>
                </Switch>
            </>
        )
    } else {
        return (
            <Switch>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/register" exact>
                    <RegisterPage />
                </Route>
                <Redirect to="/login" />
            </Switch>
        )
    }
}
