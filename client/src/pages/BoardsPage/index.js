import React, { useEffect, useState } from 'react';
import BoardItem from './BoardItem';
import { useHttp } from '../../hooks/httpHook';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/authHook';
import { CreateBoard } from './CreateBoardWindow';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  noBoardsBlock: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  noBoardsTitle: {
    paddingBottom: '1rem'
  },
  boardsWrap: {
    marginTop: '2rem',
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(6, 1fr)'
  },
  container: {
    width: '1170px',
    margin: 'auto',
  }
});

const BoardsPage = (props) => {
  const { CreateBoardContent, handleClose, handleClickOpen } = CreateBoard();
  const classes = useStyles(props);
  const [boards, setBoards] = useState([]);
  const { request, loading } = useHttp();
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      let data = await request(`/boards`, 'get');
      if (data) {
        setBoards(data);
      }
    }
    getData()
  }, [])

  const createNewBoard = () => {
    handleClickOpen()
  }

  const goToBoard = (id) => {
    history.push(`/boards/${id}`)
  }

  return (
    <Grid className={classes.container}>
      <CreateBoardContent />
      {
        loading ? (
          <Grid className={classes.noBoardsBlock}>
            <CircularProgress size={68} color="primary" />
          </Grid>
        ) : !boards.length ? (
          <Grid className={classes.noBoardsBlock}>
            <Typography className={classes.noBoardsTitle} variant="h5">Пока что здесь ничего нет</Typography>
            <Button onClick={createNewBoard} variant='contained' color="primary">Создать новую доску</Button>
          </Grid>
        ) : (
              <Grid className={classes.boardsWrap}>
                {
                  boards.map(item => <BoardItem goToBoard={goToBoard} key={item.id} board={item} />)
                }
                <Button className={classes.createNewBoard} variant="outlined" onClick={createNewBoard}>
                  Создать новую доску
                </Button>
              </Grid>
            )
      }
    </Grid>
  )
}

export default BoardsPage
