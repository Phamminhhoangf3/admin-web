import React, { useEffect, useState } from 'react'
import { Form, Input, PageHeader, Select, InputNumber, Button, notification } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { ROUTES, ACTION } from 'consts'
import { useDispatch } from 'react-redux'
//apis
import { getAllCategory } from 'apis/category'
// css
import styles from './add-product.module.scss'
import { addProduct, updateProduct } from 'apis/product'

const { TextArea } = Input
export default function AddProduct() {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const [createForm] = Form.useForm()
    const [categories, setCategories] = useState([])

    const _getCategory = async () => {
        try {
            dispatch({ type: ACTION.LOADING, data: true })
            const res = await getAllCategory()
            if (res.status === 200) setCategories(res.data)
            dispatch({ type: ACTION.LOADING, data: false })
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.LOADING, data: false })
        }
    }
    const handleForm = async (value) => {
        createForm.validateFields()
        try {
            dispatch({ type: ACTION.LOADING, data: true })
            const body = { ...value, image: 'test' }
            let res
            if (location.state) {
                const { id } = location.state
                res = await updateProduct(id, JSON.stringify(body))
            } else {
                res = await addProduct(JSON.stringify(body))
            }
            if (res.status === 200) {
                notification.success({
                    message: `${location.state ? 'Cập nhật' : 'Tạo'} sản phẩm thành công!`
                })
                history.push(ROUTES.PRODUCT)
            }
            dispatch({ type: ACTION.LOADING, data: false })
        } catch (error) {
            console.log(error);
            dispatch({ type: ACTION.LOADING, data: false })
            notification.error({
                message: `${location.state ? 'Cập nhật' : 'Tạo'} sản phẩm không thành công!`
            })
        }
    }
    useEffect(() => {
        _getCategory()
        if (location.state) {
            createForm.setFieldsValue(location.state)
        }
    }, [])
    return (
        <div className={styles['add-product-container']}>
            <Form
                layout='vertical'
                form={createForm}
                onFinish={handleForm}
            >
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.push(ROUTES.PRODUCT)}
                    title='Thêm sản phẩm'
                    extra={[
                        <Button type='primary' style={{ minWidth: 100 }} htmlType='submit'>
                            {location.state ? 'Cập nhật' : 'Tạo'}
                        </Button>
                    ]}
                />
                <div className={styles['add-product-content']}>
                    <Form.Item
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                        name="title"
                        label="Tên sản phẩm"
                    >
                        <Input autoFocus placeholder='Nhập tên sản phẩm' allowClear />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                        name="category"
                        label='Danh mục'
                    >
                        <Select placeholder='Chọn danh mục' allowClear >
                            {
                                categories.map((item, index) => (
                                    <Select.Option key={index}>{item && item}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                        name="price"
                        label="Giá tiền"
                    >
                        <InputNumber placeholder='Nhập giá sản phẩm' style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        name="description"
                        label='Mô tả'
                    >
                        <TextArea placeholder="Nhập mô tả" allowClear rows={5} />
                    </Form.Item>
                    {/* <Form.Item
                        rules={[{ required: true, message: 'Vui lòng nhập ' }]}
                        name="image"
                        label='Hình ảnh'
                    >
                    </Form.Item> */}
                </div>
            </Form>
        </div>
    )
}