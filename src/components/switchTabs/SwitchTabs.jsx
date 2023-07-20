import React, { useState } from 'react'

import './SwitchTabs.scss'

const SwitchTabs = ({ data, onTabChange }) => {


    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)



    const activeTab = (tab, index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 500)
        onTabChange(tab, index)
    }


    return (
        <div className='switchingTabs'>
            <div className='tabItems'>
                {data.map((tab, index) => (
                    <span
                        className={`tabItem ${selectedTab === index ? "active" : ""} `}
                        key={index}
                        onClick={() => activeTab(tab, index)} >
                        {tab}
                    </span>
                ))}
                {/* <span className='moveBg' style={{left}} /> */}
            </div>
        </div>
    )
}

export default SwitchTabs
