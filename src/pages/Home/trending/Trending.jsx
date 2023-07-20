import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import Carousel from '../../../components/carousel/Carousel'


const Trending = () => {

    const [endPoint, setEndPoint] = useState("day")

    const { data ,loading } = useFetch(`/trending/movie/${endPoint}`)
    console.log(data)

    const onTabChange = (tab) => {
        setEndPoint(tab === "Day" ? "day" : "week")
        console.log(tab === "Day")
    }

    return (
        <div className='caroselSection'>
            <ContentWrapper>
                <div className='caresolTitle'>This is trending</div>
                <SwitchTabs onTabChange={onTabChange} data={["Day", "Week"]} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default Trending
