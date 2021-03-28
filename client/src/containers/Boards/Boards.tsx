import React from 'react'
import { useHistory } from 'react-router-dom'
import { CreateBoard } from 'pages/BoardsPage/CreateBoardWindow'
import { useBoardsQuery } from 'common/services/ApiService/queries/Boards'
import Boards from 'components/Boards/Boards'

const BoardsContainer = () => {
    const { CreateBoardContent, handleClickOpen } = CreateBoard()
    const history = useHistory()

    const { isLoading: loading, data: boards = [] } = useBoardsQuery({})

    const createNewBoard = () => {
        handleClickOpen()
    }

    const goToBoard = (id: string) => {
        history.push(`/boards/${id}`)
    }

    return (
        <>
            <CreateBoardContent />
            <Boards
                onCreateNewBoard={createNewBoard}
                onGoToBoard={goToBoard}
                boards={boards}
                loading={loading}
            />
        </>
    )
}

export default BoardsContainer
