import React from 'react'
import { PageHeader, Button } from 'antd'
import styles from './warehouse.module.scss'

export default function Warehouse() {
    return (
        <div className={styles['warehouse-container']}>
            <PageHeader title="KHO HÀNG" subTitle="Tất cả kho hàng" extra={[
                <Button type='primary'>Tạo kho hàng</Button>
            ]} />
        </div>
    )
}