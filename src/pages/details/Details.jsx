import React from 'react'
import './Details.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailBannerPage from './detailsBanner/DetailBannerPage'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'
import Similar from './carosels/Similar'
import Recommendation from './carosels/Recomendation'

const Details = () => {


  const {id, mediaType} = useParams()
  console.log(id)
  console.log(mediaType)
  const {data , loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits , loading:louding} = useFetch(`/${mediaType}/${id}/credits`)
  console.log(data)


  return ( 
    <div>
      <DetailBannerPage video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={louding}  />
      <VideoSection data={data} loading={loading} />
      <Similar id={id} mediaType={mediaType} />
      <Recommendation id={id} mediaType={mediaType} />

    </div>
  )
}

export default Details
