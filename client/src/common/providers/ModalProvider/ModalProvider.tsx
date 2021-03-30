import React, { createContext, ReactNode, useContext } from 'react'
import clsx from 'clsx'
import {
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogProps,
    DialogTitle,
    DialogTitleProps,
    IconButton,
    Typography,
    Box,
} from '@material-ui/core'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CloseIcon from '@material-ui/icons/Close'

type ProviderContext = {
    openModal: ({ key, content }: ModalOptions) => void
    closeModal: (key: string) => void
}
type ModalParams = {
    key: string
    content: {
        title?: string | ReactNode
        body?: string | ReactNode
        actions?: ReactNode
    }
    dialogProps?: Omit<DialogProps, 'open'>
    titleProps?: DialogTitleProps
    contentProps?: DialogContentProps
    actionsProps?: DialogActionsProps
    isOpen: boolean
    isPaddingsDisabled?: boolean
    onCloseModal?: () => void
}
type ModalOptions = Omit<ModalParams, 'isOpen'>

const DialogContext = createContext<ProviderContext>({
    openModal: () => {
        throw new Error('Вы забыли подключить ModalProvider')
    },
    closeModal: () => {
        throw new Error('Вы забыли подключить ModalProvider')
    },
})
export const useModal = (): ProviderContext => useContext(DialogContext)

const useStyles = makeStyles(theme =>
    createStyles({
        title: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        defaultPadding: {
            padding: theme.spacing(2),
        },
        disabledPadding: {
            padding: 0,
        },
        dialog: {
            '& .MuiDialogContent-root:first-child': {
                paddingTop: 0,
            },
        },
        dialogBorder: {
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
        actions: {
            boxShadow: '0px 2px 10px rgba(6, 88, 148, 0.15)',
        },
        closeIcon: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
    })
)

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const styles = useStyles()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const [modals, setModals] = React.useState<ModalParams[]>([])

    const openModal = (options: ModalOptions) => {
        setModals(modals => [
            ...modals,
            {
                ...options,
                isOpen: true,
            },
        ])
    }
    const closeModal = (keyString: string) => {
        setModals(modals => modals.filter(({ key }) => key !== keyString))
    }

    const contextValues = { openModal, closeModal }

    return (
        <DialogContext.Provider value={contextValues}>
            {children}
            {modals.map(
                ({
                    key,
                    isOpen,
                    content: { title, body, actions },
                    dialogProps = {},
                    titleProps = {},
                    contentProps = {},
                    actionsProps = {},
                    isPaddingsDisabled = false,
                    onCloseModal = () => closeModal(key),
                }) => {
                    const handleCloseModal = onCloseModal

                    return (
                        <Dialog
                            key={key}
                            fullScreen={fullScreen}
                            open={isOpen}
                            onClose={handleCloseModal}
                            className={clsx({
                                [styles.dialog]: isPaddingsDisabled,
                            })}
                            {...dialogProps}>
                            <Box className={styles.dialogBorder}>
                                {title && (
                                    <DialogTitle
                                        disableTypography
                                        className={clsx(
                                            styles.title,
                                            styles.defaultPadding,
                                            {
                                                [styles.disabledPadding]: isPaddingsDisabled,
                                            }
                                        )}
                                        {...titleProps}>
                                        <Typography variant="h5">
                                            {title}
                                        </Typography>
                                        <IconButton
                                            aria-label="close"
                                            className={styles.closeIcon}
                                            onClick={handleCloseModal}>
                                            <CloseIcon />
                                        </IconButton>
                                    </DialogTitle>
                                )}
                                {body && (
                                    <DialogContent
                                        className={clsx(styles.defaultPadding, {
                                            [styles.disabledPadding]: isPaddingsDisabled,
                                        })}
                                        {...contentProps}>
                                        {body}
                                    </DialogContent>
                                )}
                                {actions && (
                                    <DialogActions
                                        className={clsx(
                                            styles.defaultPadding,
                                            styles.actions,
                                            {
                                                [styles.disabledPadding]: isPaddingsDisabled,
                                            }
                                        )}
                                        {...actionsProps}>
                                        {actions}
                                    </DialogActions>
                                )}
                            </Box>
                        </Dialog>
                    )
                }
            )}
        </DialogContext.Provider>
    )
}

export default ModalProvider
