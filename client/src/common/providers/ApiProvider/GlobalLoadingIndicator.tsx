import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useIsFetching } from 'react-query'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'absolute',
    },
}))

const GlobalLoadingIndicator = () => {
    const classes = useStyles()
    const isFetching = useIsFetching()

    if (!isFetching) {
        return null
    }

    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    )
}

export default GlobalLoadingIndicator
