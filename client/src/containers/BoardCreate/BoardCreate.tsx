import React, { useState } from 'react'
import { useModal } from 'common/providers/ModalProvider/ModalProvider'
import { useHistory } from 'react-router-dom'
import { useBoardCreateMutation } from 'common/services/ApiService/mutations/BoardCreate'
//MUI
import { Button, TextField, Box } from '@material-ui/core'

type Props = {
    outlined?: boolean
}

const BoardCreateContainer: React.FC<Props> = ({ outlined = false }) => {
    const [title, setTitle] = useState('')
    const { openModal, closeModal } = useModal()

    const history = useHistory()

    const { mutateAsync: createBoard, isLoading } = useBoardCreateMutation({
        onSuccess: data => {
            history.push(`/boards/${data._id}`)
        },
    })

    const createBoardOnServer = () => {
        return createBoard({ body: { title } })
    }

    const handleOpenModal = () => {
        const handleCloseModal = () => closeModal(modalKey)
        const modalKey = 'create-board'

        openModal({
            key: modalKey,
            content: {
                title: 'Введите название доски',
                body: (
                    <TextField
                        autoFocus
                        name="board_name"
                        label="Название доски"
                        fullWidth
                        onChange={e => setTitle(e.target.value)}
                    />
                ),
                actions: (
                    <Box>
                        <Button onClick={handleCloseModal} color="primary">
                            Отменить
                        </Button>
                        <Button
                            onClick={createBoardOnServer}
                            variant="contained"
                            color="primary">
                            Создать
                        </Button>
                    </Box>
                ),
            },
            dialogProps: {
                maxWidth: 'xs',
                fullWidth: true,
            },
        })
    }

    return (
        <Button
            onClick={handleOpenModal}
            variant={outlined ? 'outlined' : 'contained'}
            color="primary">
            Создать новую доску
        </Button>
    )
}

export default BoardCreateContainer
