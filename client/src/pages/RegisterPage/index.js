import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { registerSchema } from './RegisterSchema';
import { useHttp } from '../../hooks/httpHook';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
//MUI
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  loginCard: {
    position: 'absolute',
    width: 345,
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
});

const RegisterPage = (props) => {
  const classes = useStyles(props);
  const { request, loading, error, clearError } = useHttp();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    console.log(error);
    if (error.status === 500) {
      setOpenError(true);
    }
  }, [error])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: registerSchema(),
    onSubmit: async values => {
      const data = await request('/auth/register', 'post', { ...values });
      if (data) {
        setOpenSuccess(true);
        setTimeout(() => {
          history.push('/login')
        }, 2000)
      }
    },
  });

  return (
    <Grid className={classes.loginCard}>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardHeader title="Регистрация" />
          <FormControl component="fieldset" error={!!error}>
            <CardContent>
              <TextField
                name="email"
                type="text"
                fullWidth={true}
                label="email"
                onChange={(e) => {
                  formik.handleChange(e);
                  clearError();
                }}
                error={formik.touched.email && formik.errors.email ? true : false}
                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
              />
              <TextField
                name="password"
                type="password"
                fullWidth={true}
                label="Пароль"
                onChange={(e) => {
                  formik.handleChange(e);
                  clearError();
                }}
                error={formik.touched.password && formik.errors.password ? true : false}
                helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
              />
              <TextField
                name="confirm_password"
                type="password"
                fullWidth={true}
                label="Повторите пароль"
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && formik.errors.confirm_password ? true : false}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : null}
              />
              <FormHelperText>{error.message}</FormHelperText>
            </CardContent>
          </FormControl>
          <CardActions>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={loading}
            >
              {
                loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : null
              }
              Зарегестрироваться
            </Button>
            <Button component={Link} to="/login" variant="outlined">
              Войти
            </Button>
          </CardActions>
        </form>
        <Collapse in={openError}>
          <Alert severity="error">Произошла ошибка, попробуйте позже</Alert>
        </Collapse>
        <Collapse in={openSuccess}>
          <Alert severity="success">Пользователь создан успешно</Alert>
        </Collapse>

      </Card>
    </Grid>
  )
}

export default RegisterPage
