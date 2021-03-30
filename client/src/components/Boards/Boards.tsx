import React from 'react'
import { BoardsItem } from 'common/services/ApiService/interfaces/Boards/BoardsItem'
import BoardItem from 'pages/BoardsPage/BoardItem'
//MUI
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import BoardCreate from 'containers/BoardCreate/BoardCreate'

type Props = {
    loading: boolean
    boards: BoardsItem[]
    onCreateNewBoard: () => void
    onGoToBoard: (id: string) => void
}

const useStyles = makeStyles({
    noBoardsBlock: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
    },
    noBoardsTitle: {
        paddingBottom: '1rem',
    },
    boardsWrap: {
        marginTop: '2rem',
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(6, 1fr)',
    },
    container: {
        width: '1170px',
        margin: 'auto',
    },
})

const Boards: React.FC<Props> = ({
    loading,
    onCreateNewBoard,
    onGoToBoard,
    boards,
}) => {
    const classes = useStyles()

    return (
        <Grid className={classes.container}>
            {loading ? (
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    className={classes.noBoardsBlock}>
                    <CircularProgress size={68} color="primary" />
                </Box>
            ) : !boards.length ? (
                <Grid className={classes.noBoardsBlock}>
                    <Typography className={classes.noBoardsTitle} variant="h5">
                        Пока что здесь ничего нет
                    </Typography>
                    <BoardCreate />
                </Grid>
            ) : (
                <Grid className={classes.boardsWrap}>
                    {boards.map(item => (
                        <BoardItem
                            goToBoard={onGoToBoard}
                            key={item.id}
                            board={item}
                        />
                    ))}
                    <BoardCreate outlined />
                </Grid>
            )}
        </Grid>
    )
}

export default Boards
