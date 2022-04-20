import React from 'react'
import { ROUTES } from 'consts'
import { Switch, Route, HashRouter } from 'react-router-dom'
import LayoutWeb from 'components/Layout'
//components
import Overview from './overview'
import Product from './product'
import AddProduct from './add-product'
import Warehouse from './warehouse'
import Login from './login'

export default function Views() {
    const DEFINE_ROUTER = [
        {
            path: ROUTES.OVERVIEW,
            Component: () => <Overview />,
            title: 'Tổng quan',
            exact: true,
        },
        {
            path: ROUTES.ADD_PRODUCT,
            Component: () => <AddProduct />,
            title: 'Thêm sản phẩm',
            exact: true,
        },
        {
            path: ROUTES.PRODUCT,
            Component: () => <Product />,
            title: 'Tổng quan',
            exact: true,
        },
        {
            path: ROUTES.WAREHOUSE,
            Component: () => <Warehouse />,
            title: 'Tổng quan',
            exact: true,
        },
    ]
    return (
        <HashRouter>
            <Switch>
                {/* <Route path="/" exact={true}>
                    <Login />
                </Route> */}
                {DEFINE_ROUTER.map(({ Component, ...rest }, index) => (
                    <Route {...rest} key={index}>
                        <LayoutWeb>
                            <Component />
                        </LayoutWeb>
                    </Route>
                ))}
            </Switch>
        </HashRouter>
    )
}