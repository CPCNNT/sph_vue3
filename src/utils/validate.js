import { useForm, useField } from 'vee-validate'

const phoneRule = value => {
  if (!value || !value.trim()) {
    return '手机号是必填的！'
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    return '手机号格式有误！'
  } else {
    return true
  }
}

const passwordRule = value => {
  if (!value || !value.trim()) {
    return '登录密码是必填的！'
  } else if (!/^\S{8,20}$/.test(value)) {
    return '登录密码须为8到20位且不能包含空格！'
  } else {
    return true
  }
}

const vCodeRule = value => {
  if (!value || !value.trim()) {
    return '验证码是必填的！'
  } else if (!/^\d{6}$/.test(value)) {
    return '验证码是6位整数！'
  } else {
    return true
  }
}

const agreeRule = value => value ? true : '必须同意协议并勾选才能注册！'

export const registerValidate = () => {
  const registerSchema = {
    phone: phoneRule,
    code: vCodeRule,
    password: passwordRule,
    password2: value => {
      if (!value || !value.trim()) {
        return '确认密码是必填的！'
      } else if (value !== password.value) {
        return '确认密码必须与登陆密码一致！'
      } else {
        return true
      }
    },
    agree: agreeRule
  }

  const { errors, meta, isSubmitting, handleSubmit } = useForm({
    validationSchema: registerSchema,
    initialValues: {
      phone: '',
      code: '',
      password: '',
      password2: '',
      agree: false
    }
  })

  const { value: phone } = useField('phone')
  const { value: code } = useField('code')
  const { value: password } = useField('password')
  const { value: password2 } = useField('password2')
  const { value: agree } = useField('agree')

  return {
    errors, meta, isSubmitting, handleSubmit, phone, code, password, password2, agree
  }
}

export const loginValidate = () => {
  const loginSchema = {
    phone: value => {
      if (!value || !value.trim()) {
        return '手机号不能为空！'
      } else if (!/^\d{11}$/.test(value)) {
        return '手机号格式有误！'
      } else {
        return true
      }
    },
    password: value => {
      if (!value || !value.trim()) {
        return '密码不能为空！'
      } else if (!/^\S{6,20}$/.test(value)) {
        return '密码须为6到20位且不能包含空格！'
      } else {
        return true
      }
    }
  }
  const { errors, meta, isSubmitting, handleSubmit } = useForm({
    validationSchema: loginSchema,
    initialValues: {
      phone: '',
      password: ''
    }
  })
  const { value: phone } = useField('phone')
  const { value: password } = useField('password')
  return {
    errors, meta, isSubmitting, handleSubmit, phone, password
  }
}
