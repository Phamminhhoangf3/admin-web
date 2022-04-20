import React from 'react'
import styles from './loading.module.scss'

import { useSelector } from 'react-redux'

export default function Loading() {
    const loading = useSelector((state) => state.loading)
    return (
        <div className={styles['loading-container']} style={{ display: loading ? 'block' : 'none' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ margin: 'auto', background: 'transparent', display: 'block', shapeRendering: 'auto', width: "140px", height: "140px" }}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle cx="50" cy="50" fill="none" stroke="#a0c3e4" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div >
    )
}