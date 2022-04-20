import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Row, Col, Table, Select, AutoComplete, Space, notification, Popconfirm } from 'antd'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'
import { useHistory } from 'react-router-dom'
//apis 
import { getProduct, deleteProduct } from 'apis/product'
import { getAllCategory } from 'apis/category'
//components
import styles from './product.module.scss'
import columns from './columns'
import { ACTION, ROUTES } from 'consts'

const { Option } = Select
export default function Product() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [dataProducts, setDataProducts] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [paramsFilter, setParamsFilter] = useState('')
    const [valueSort, setValueSort] = useState(null)
    const [valueCategory, setValueCategory] = useState(null)
    const [options, setOptions] = useState([])
    const [valueSearch, setValueSearch] = useState(null)

    const _getProducts = async (params) => {
        try {
            setLoading(true)
            const res = await getProduct(params)
            if (res.status === 200) {
                if (Array.isArray(res.data)) {
                    const data = [...res.data]
                    setDataProducts(data)
                    // thêm data cho autoComplete
                    const dataOptions = data.map((item) => ({
                        value: item.title && item.title,
                        id: item.id && item.id
                    }))
                    if (dataOptions.length !== 0) {
                        setOptions(dataOptions)
                    }
                } else {
                    const data = [res.data]
                    setDataProducts(data)
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const _getCategory = async () => {
        try {
            const res = await getAllCategory()
            if (res.status === 200) {
                setDataCategory(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleFilterByCategory = (value) => {
        if (value) {
            setValueSort(null)
            setValueSearch(null)
            setValueCategory(value)
            setParamsFilter(`/category/${value}`)
        }
        else {
            setValueSearch(null)
            setValueCategory(null)
            setParamsFilter('')
        }
    }
    const handleSort = (value) => {
        if (value) {
            setValueSort(value)
            setValueCategory(null)
            setValueSearch(null)
            setParamsFilter(`?${queryString.stringify({ sort: value })}`)
        }
        else {
            setValueSearch(null)
            setValueSort(null)
            setParamsFilter('')
        }
    }
    const handleSelect = (value) => {
        if (value && value.id && value.id > 0) {
            setValueSort(null)
            setValueCategory(null)
            setParamsFilter(`/${value.id}`)
            setValueSearch(value)
        } else {
            setValueSearch(null)
            setParamsFilter('')
        }
    }
    const handleSearch = (value) => {
        if (value) setValueSearch(value)
        else {
            setValueSearch('')
            setParamsFilter('')
        }
    }
    const handleClearFilter = () => {
        setParamsFilter('')
        setValueSort(null)
        setValueCategory(null)
        setValueSearch(null)
    }
    const handleDeleteProduct = async (id) => {
        try {
            if (id) {
                const res = await deleteProduct(`/${id}`)
                if (res.status === 200) {
                    notification.success({
                        message: 'Bạn đã xóa sản phẩm thành công!'
                    })
                }
            }
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Xóa sản phẩm không thành công!'
            })
        }
    }
    const handleUpdateProduct = (value) => {
        if (value.id) {
            history.push({ pathname: ROUTES.ADD_PRODUCT, state: value })
        }
    }

    useEffect(() => {
        _getProducts(paramsFilter)
    }, [paramsFilter])

    useEffect(() => {
        _getCategory()
    }, [])

    return (
        <div className={styles['product-container']}>
            <PageHeader title="SẢN PHẨM" subTitle="Tất cả sản phẩm" extra={[
                <Button className={styles['product-button-create']} type='primary' onClick={() => history.push(ROUTES.ADD_PRODUCT)} >Tạo sản phẩm</Button>
            ]} />
            <div className={styles['product-content']}>
                <Row gutter={20} style={{ marginBottom: 26 }}>
                    <Col span={8}>
                        <h4>Tìm kiếm Tên sản phẩm</h4>
                        <AutoComplete
                            allowClear
                            value={valueSearch}
                            style={{ width: '100%' }}
                            options={options}
                            placeholder="Nhập tên sản phẩm"
                            filterOption={(inputValue, option) =>
                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onSearch={(value) => handleSearch(value)}
                            onSelect={(value, option) => handleSelect(option)}
                            onClear={handleSearch}
                        />
                    </Col>
                    <Col span={6}>
                        <h4>Sắp xếp theo ID</h4>
                        <Select
                            allowClear
                            onChange={(value => handleSort(value))}
                            placeholder='Chọn sắp xếp'
                            style={{ width: '100%' }}
                            value={valueSort}
                        >
                            <Option value='asc'>Tăng dần</Option>
                            <Option value='desc'>Giảm dần</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <h4>Lọc theo ngành hàng</h4>
                        <Select
                            showSearch
                            allowClear
                            value={valueCategory}
                            onChange={(value => handleFilterByCategory(value))}
                            placeholder='Chọn ngành hàng'
                            style={{ width: '100%' }}>
                            {
                                dataCategory.map((item, index) => (
                                    <Option key={index} value={item}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={3}>
                        <h4>&nbsp;</h4>
                        <Button
                            danger
                            type='primary'
                            style={{ display: (paramsFilter === '' ? 'none' : 'block') }}
                            onClick={handleClearFilter}
                        >
                            Xóa bộ lọc
                        </Button>
                    </Col>
                </Row>
                <Table
                    loading={loading}
                    dataSource={dataProducts}
                    columns={columns.map(column => {
                        if (column.key === 'STT') {
                            return {
                                ...column,
                                render: (text, record, index) => index + 1
                            }
                        }
                        if (column.key === 'image') {
                            return {
                                ...column,
                                render: (text) => <img src={text} alt="img-product" width={50} height={50} />
                            }
                        }
                        if (column.key === 'price') {
                            return {
                                ...column,
                                render: (text) => (text || 0) + ' USD'
                            }
                        }
                        if (column.key === 'description') {
                            return {
                                ...column,
                                render: (text) => <p className={styles['product-description']}>{text}</p>
                            }
                        }
                        if (column.key === 'action') {
                            return {
                                ...column,
                                render: (text, record) => (
                                    <Space wrap={true}>
                                        <Button
                                            type='primary'
                                            onClick={() => handleUpdateProduct(record)}
                                            className={styles['product-button-edit']}
                                        >
                                            Sửa
                                        </Button>
                                        <Popconfirm
                                            title="Bạn có muốn xóa sản phẩm này không ?"
                                            onConfirm={() => handleDeleteProduct(record.id || '')}
                                            okText='Có'
                                            cancelText='Không'
                                            placement='topRight'
                                        >

                                            <Button
                                                danger
                                                type='primary'
                                            >
                                                Xóa
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                )
                            }
                        }
                        return column
                    })} bordered scroll={{ y: 500 }} />
            </div>
        </div>
    )
}