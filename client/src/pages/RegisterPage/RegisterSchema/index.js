import * as Yup from 'yup'

export function registerSchema() {
    return Yup.object().shape({
        email: Yup.string()
            .required('Введите почту')
            .email('Некорректное написание почты')
            .min(4, 'Слишком коротко'),
        password: Yup.string()
            .required('Введите пароль')
            .min(6, 'Пароль слишком короткий'),
        confirm_password: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Пароли должны совпадать'
        ),
    })
}
