import React from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
//css
import styles from './login.module.scss'
import { ACTION, ROUTES } from 'consts'
//apis
import { login } from 'apis/auth'

const clientId = '790280401024-432beas3f4mdmtk8vj9e70jbm2ql26tb.apps.googleusercontent.com'
export default function Login() {
    const [form] = Form.useForm()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogin = async (dataForm) => {
        await form.validateFields()
        try {
            dispatch({ type: ACTION.LOADING, data: true })
            const res = await login(JSON.stringify(dataForm))
            if (res.status === 200) {
                dispatch({ type: ACTION.LOGIN, data: res.data })
                // history.push(ROUTES.PRODUCT)
            }
            dispatch({ type: ACTION.LOADING, data: false })
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.LOADING, data: false })

        }
    };

    const onSuccess = (res) => {
        console.log('[login success] currentUser:', res.profileObj);
    }
    const onFailure = (res) => {
        console.log('[login fail] res:', res)
    }
    return <><div className={styles["login-page"]}>
        <div className={styles["login-box"]}>
            <div className={styles["illustration-wrapper"]}>
                <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
            </div>
            <Form
                form={form}
                className={styles["login-form"]}
                onFinish={handleLogin}
                requiredMark={false}
            >
                <p className={styles["form-title"]}>Wellcome to Ceva logistics</p>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        placeholder="Tên đăng nhập"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div></>
}