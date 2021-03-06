import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Row, Col, Tabs, List, Avatar, Card } from 'antd'
import styles from './overview.module.scss'
import { getUser } from 'apis/user'
import { getProduct } from 'apis/product'
//icons
import { IconCart, IconOther, IconProduct, IconUser } from './icons'
import { getCarts } from 'apis/cart'

const { TabPane } = Tabs
export default function Overview() {
    const [users, setUsers] = useState([])
    const [products, getProducts] = useState([])
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)
    const [totalProduct, setTotalProduct] = useState(0)
    const [totalUser, setTotalUser] = useState(0)
    const [totalcart, setTotalCart] = useState(0)

    const _getCarts = async () => {
        try {
            const res = await getCarts()
            if (res.status === 200) {
                setTotalCart(res.data?.length)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const _getUser = async () => {
        try {
            setLoadingUser(true)
            const res = await getUser()
            if (res.status === 200) {
                const userNew = res.data.slice(0, 5)
                setUsers(userNew)
                setTotalUser(res.data?.length)
            }
            setLoadingUser(false)
        } catch (error) {
            console.log(error);
            setLoadingUser(false)
        }
    }
    const _getProduct = async () => {
        try {
            setLoadingProduct(true)
            const res = await getProduct()
            if (res.status === 200) {
                const listProduct = res.data.slice(0, 5)
                getProducts(listProduct)
                setTotalProduct(res.data?.length)
            }
            setLoadingProduct(false)
        } catch (error) {
            setLoadingProduct(false)
            console.log(error);
        }
    }
    const listProduct = (
        <List
            loading={loadingProduct}
            itemLayout="horizontal"
            dataSource={products}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<img width={30} alt='img' src={item.image} />}
                        title={<>{item.title}</>}
                    />
                </List.Item>
            )}
        />
    )
    const listUser = (
        <List
            loading={loadingUser}
            itemLayout="horizontal"
            dataSource={users}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={<>{item.name ? `${item.name?.firstname} ${item.name?.lastname}` : ''}</>}
                    />
                </List.Item>
            )}
        />
    )
    const data = [
        {
            title: 'T???ng s???n ph???m',
            total: totalProduct,
            icon: <IconProduct />
        },
        {
            title: 'T???ng kh??ch h??ng',
            total: totalUser,
            icon: <IconUser />
        },
        {
            title: 'T???ng gi??? h??ng',
            total: totalcart,
            icon: <IconCart />
        },
        {
            title: 'kh??c',
            total: 0,
            icon: <IconOther />
        },
    ];
    useEffect(() => {
        _getUser()
        _getProduct()
        _getCarts()
    }, [])
    return (
        <div className={styles['overview-container']}>
            <PageHeader title="T???NG QUANG" subTitle="Th??ng tin quan tr???ng" />
            <div className={styles['overview-content']}>
                <Row gutter={40}>
                    <Col span={12}>
                        <div className={styles['overview-content-left']}>
                            <Tabs defaultActiveKey='1'>
                                <TabPane key='1' tab='Top 5 s???n ph???m m???i nh???t'>
                                    {listProduct}
                                </TabPane>
                                <TabPane key='2' tab='Top 5 kh??ch h??ng m???i nh???t' >
                                    {listUser}
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className={styles['overview-content-right']}>
                            <div className={styles["overview-card"]}>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <div className={styles[`overview-card-item-${index + 1}`]}>
                                                <div className={styles[`overview-card-item-content`]}>
                                                    <div className={styles[`overview-card-item-content-icon`]}>{item.icon}</div>
                                                    <h1 style={{ fontSize: 25 }}>{item.total}</h1>
                                                    <h2>{item.title}</h2>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}