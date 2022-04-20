import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { ROUTES } from 'consts'
import { Link, useLocation } from 'react-router-dom'
import styles from './layout.module.scss'
import { MenuUnfoldOutlined, BankOutlined, CodeSandboxOutlined, HddOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout
export default function LayoutWeb({ children }) {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    const menu = [
        {
            path: ROUTES.OVERVIEW,
            title: 'Tổng quan',
            icon: <BankOutlined />,
            pathsChild: [],
        },
        {
            path: ROUTES.PRODUCT,
            title: 'Sản phẩm',
            icon: <CodeSandboxOutlined />,
            pathsChild: [ROUTES.ADD_PRODUCT]
        },
        // {
        //     path: ROUTES.WAREHOUSE,
        //     title: 'Kho hàng',
        //     icon: <HddOutlined />,
        //     pathsChild: []
        // },
    ]
    const toggle = () => {
        setCollapsed(!collapsed)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsed={collapsed}>
                <Menu style={{ height: '100%' }} defaultSelectedKeys={[1]}>
                    <div className={styles['logo']} style={{ padding: collapsed ? 10 : 0 }}>
                        <img src='https://gudlogo.com/wp-content/uploads/2019/04/logo-hau-can-logistic-3.png' alt="logo" />
                    </div>
                    {
                        menu.map((item, index) => (
                            <Menu.Item
                                style={{
                                    backgroundColor:
                                        (location.pathname === item.path || item.pathsChild.includes(location.pathname)) &&
                                        'rgb(189 216 238)',
                                }}
                                key={index}
                                icon={item.icon}
                                className={styles['layout-menu-item']}
                            >
                                <Link to={item.path}>
                                    {item.title}
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#fff' }}>
                    {
                        collapsed ?
                            <MenuFoldOutlined style={{ fontSize: 20 }} onClick={toggle} /> :
                            <MenuUnfoldOutlined style={{ fontSize: 20 }} onClick={toggle} />

                    }
                </Header>
                <Content style={{ padding: 20 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}