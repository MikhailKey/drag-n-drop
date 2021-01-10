import React from 'react'
//MUI
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    boardWrap: {
        cursor: 'pointer',
    },
})

const BoardItem = ({ board, goToBoard }, props) => {
    const classes = useStyles(props)

    return (
        <Card className={classes.boardWrap} onClick={() => goToBoard(board.id)}>
            <CardHeader title={board.name} />
        </Card>
    )
}

export default BoardItem
