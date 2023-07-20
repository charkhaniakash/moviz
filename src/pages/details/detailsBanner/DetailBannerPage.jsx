import React, { useState } from 'react'
import './DetailBannerPage.scss'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import PosterFallback from "../../../assets/no-poster.png";
import Genres from '../../../components/genres/Genres'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
// import { PlayIcon } from "../Playbtn";
import { FiPlay } from "react-icons/fi";
import CircleRating from '../../../components/circleRating/CircleRating'

const DetailBannerPage = ({ video, crew }) => {

    console.log(video)


    const { id, mediaType } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector((state) => state.home)

    const [show, setShow] = useState('false')
    const [videoId, setVideoId] = useState(null)


    const releaseDate = data?.release_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

    const gen = data?.genres?.map((item) => item.id)
    console.log(gen)


    // director
    const director = (crew || []).filter((item) => item.job === "Director")
    // console.log(director)

    //  writter

    const writter = (crew || []).filter((item) => item.job === "Writter" || item.job === "Original Music Composer" || item.job === "Costume Design")
    console.log(writter)
    
    const start = () => {

    }

    function round(num) {
        return num.toFixed(1)
    }

    const hours = Math.floor(data?.runtime / 60);
    const min = data?.runtime % 60;

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {data && (
                        <>
                            <div className='backdrop-img' >
                                <Img src={url?.backdrop + data?.backdrop_path} alt="" />
                            </div>
                            <div className='opacity-layer'></div>

                            <ContentWrapper>
                                <div className='content'>
                                    <div className='left'>
                                        {data.poster_path ? (
                                            <Img src={url.poster + data?.poster_path} className="posterImg" alt="" />
                                        ) : (
                                            <Img src={PosterFallback} className="posterImg" alt="" />
                                        )}
                                    </div>
                                    <div className='right'>
                                        <div className='title'>
                                            {data?.title} ({year})
                                        </div>
                                        <div className='subtitle'>
                                            {data?.tagline}
                                        </div>
                                        <Genres data={gen} />

                                        <div className="row">
                                            <CircleRating rating={round(data?.vote_average)} />
                                            <div className='playbtn'>
                                                <FiPlay style={{ height: '50px', weight: '50px' }}
                                                    onClick={() => {
                                                        setShow(true)
                                                        setVideoId(video?.key)
                                                    }} />
                                                <span className='text'>
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data?.overview}
                                            </div>
                                        </div>
                                        <div className='info'>
                                            {data.status && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>Status :{" "}</span>
                                                    <span className='text'>
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>Release Date :{" "}</span>
                                                    <span className='text'>
                                                        {data?.release_date}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>Runtime :{" "}</span>
                                                    <span className='text'>
                                                        {hours}h {min}m
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Director:{" "}
                                                </span>
                                                <span className='text'>
                                                    {director?.map((item, i) => (
                                                        <span key={i}>
                                                            {item?.name}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writter?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Writter:{" "}
                                                </span>
                                                <span className='text'>
                                                    {writter?.map((item, i) => (
                                                        <span key={i}>
                                                            {item?.name}
                                                            {i !== writter.length - 1 && ','} {/* Add comma if it's not the last item */}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailBannerPage
