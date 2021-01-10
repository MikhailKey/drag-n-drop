import React, { useState } from 'react'
import Task from '../task'
import { Droppable } from 'react-beautiful-dnd'
import TextField from '@material-ui/core/TextField'
//MUI
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import Card from '@material-ui/core/Card'
//icons
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
    columnContainer: {
        margin: '8px',
        minWidth: '250px',
        borderRadius: '2px',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        padding: '8px',
    },
    taskList: {
        BackgroundColor: props => (props.isDraggingOver ? 'skyblue' : 'white'),
        padding: '8px',
        transition: ' background - color 0.2s ease',
        flexGrow: 1,
        minHeight: '100px',
    },
    addTaskButton: {
        width: '100%',
        border: '1px solid grey',
    },
    addTaskField: {
        position: 'relative',
    },
    confirmButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        transform: 'translateY(110%)',
        zIndex: 1500,
    },
})

const Column = props => {
    const { column, initialData, setInitialData } = props
    const classes = useStyles(props)
    const [openAdd, setOpenAdd] = useState(false)
    const [taskValue, setTaskValue] = useState('')

    const saveNewTask = () => {
        const taskId = new Date().toJSON()
        const columns = initialData.columns
        for (let key in columns) {
            if (columns[key].id === column.id) {
                columns[key].taskIds.push(taskId)
            }
        }

        let newTask = {
            id: taskId,
            content: taskValue,
        }

        setInitialData({
            ...initialData,
            tasks: {
                ...initialData.tasks,
                [taskId]: newTask,
            },
            columns,
        })

        setOpenAdd(false)
    }

    return (
        <Card className={classes.columnContainer}>
            <CardHeader className={classes.title} title={column.title} />
            <Droppable
                droppableId={column.id}
                // isDropDisabled={props.isDropDisabled}
            >
                {(provided, snapshot) => (
                    <Grid
                        className={classes.taskList}
                        ref={provided.innerRef}
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}>
                        {props.tasks.map((task, index) => (
                            <Task
                                initialData={initialData}
                                setInitialData={setInitialData}
                                key={task.id}
                                columnId={column.id}
                                task={task}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                        {!openAdd ? (
                            <Button
                                onClick={() => setOpenAdd(true)}
                                className={classes.addTaskButton}>
                                <AddIcon />
                            </Button>
                        ) : (
                            <ClickAwayListener
                                onClickAway={() => setOpenAdd(false)}>
                                <form
                                    onSubmit={saveNewTask}
                                    className={classes.addTaskField}>
                                    <TextField
                                        autoFocus={true}
                                        onChange={e =>
                                            setTaskValue(e.target.value)
                                        }
                                        fullWidth
                                        id="standard-basic"
                                        label="Добавить задачу"
                                        variant="outlined"
                                    />
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        className={classes.confirmButton}>
                                        Сохранить
                                    </Button>
                                </form>
                            </ClickAwayListener>
                        )}
                    </Grid>
                )}
            </Droppable>
        </Card>
    )
}

export default Column
