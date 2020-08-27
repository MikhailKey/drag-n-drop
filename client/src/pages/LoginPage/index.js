import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { loginSchema } from './loginSchema';
import { useHttp } from '../../hooks/httpHook';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

//MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
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
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const LoginPage = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles(props);
  const { request, loading, error, clearError } = useHttp();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema(),
    onSubmit: async values => {
      const data = await request('/auth/login', 'post', values);
      if (data) {
        auth.login(data.token, data.userId)
      }
    },
  });
  return (
    <Grid className={classes.loginCard}>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardHeader title="Авторизация" />
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
              Войти
            </Button>
            <Button component={Link} to="/register" variant="outlined">
              Регистрация
            </Button>
          </CardActions>
        </form>
      </Card>
    </Grid>
  )
}

export default LoginPage
