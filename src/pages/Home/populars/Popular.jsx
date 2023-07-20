import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel'


const Popular = () => {

    

    const [endPoint , setEndPoint] = useState('movie')

    const {data , loading } = useFetch(`/${endPoint}/popular`)
    console.log(data)


    const onTabChange =(tab)=>{
        setEndPoint(tab==="Movies" ? "movie" : "tv")
    }

    
    return (
        <div className='caroselSection'>
            <ContentWrapper>
                <div className='caresolTitle'>What's popular</div>
                <SwitchTabs onTabChange={onTabChange} data={["Movies", "Tv's"]} />
            </ContentWrapper>
            
            <Carousel data={data?.results} endPoint={endPoint} loading={loading}/>
        </div>
    )
}

export default Popular
