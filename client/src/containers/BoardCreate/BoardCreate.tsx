import React, { useState } from 'react'
import { useHttp } from '../../../hooks/httpHook'
import { useHistory } from 'react-router-dom'
//MUI
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const BoardCreateContainer = () => {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const CreateBoardContent = () => {
        const [title, setTitle] = useState('')
        const { request, loading } = useHttp()
        const history = useHistory()

        const createBoardOnServer = async () => {
            const data = await request('/boards/create', 'post', { title })
            if (data) {
                history.push(`/boards/${data._id}`)
            }
        }
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        Выберите название доски
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            name="board_name"
                            label="Название доски"
                            fullWidth
                            onChange={e => setTitle(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Отменить
                        </Button>
                        <Button
                            onClick={createBoardOnServer}
                            variant="contained"
                            color="primary">
                            Создать
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    return {
        CreateBoardContent,
        handleClose,
        handleClickOpen,
    }
}

export default BoardCreateContainer
