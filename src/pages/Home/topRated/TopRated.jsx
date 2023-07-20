import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'

const TopRated = () => {


    const [endPoint , setEndPoint] = useState("movie")

    const {data , loading} = useFetch(`/${endPoint}/top_rated`);
    console.log(data)

    const onTabChange = (tab)=>{
        setEndPoint(tab==="Movies"?"movie":"tv")
    }

    return (
        <div className='caroselSection'>
            <ContentWrapper className="" >
                <div className='caresolTitle'>Top Rated</div>
                <SwitchTabs onTabChange={onTabChange} className='' data={['Movies' , "Tv Showes"]} ></SwitchTabs>
            </ContentWrapper>

            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />

        </div>
    )
}

export default TopRated
