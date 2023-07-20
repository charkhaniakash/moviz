import React, { useState } from 'react'
import './VideoSection.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import { FiPlay } from 'react-icons/fi';


const VideoSection = ({ data, loading }) => {


    const [show, setShow] = useState('false')
    const [videoId, setVideoId] = useState(null)

    console.log(data)

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };


    const playButtonStyle = {
        color: 'white',
        width: '60px',
        height: '60px',
        margin: 'auto'
    };

    const playButtonContainerStyle = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className='sectionHeading' >Official Video</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((item) => (
                            <div key={item?.id}
                                onClick={() => {
                                    setVideoId(item.key)
                                    setShow(true)
                                }}
                            >
                                <div className='videoThumbnail'>
                                    <img src={`https://img.youtube.com/vi/${item?.key}/mqdefault.jpg`} alt="" />
                                    <div style={playButtonContainerStyle}>
                                        <FiPlay style={playButtonStyle} />
                                    </div>
                                </div>

                                <div style={{ color: 'white' }} className='videoTitle'>{item?.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )
                }

            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />

        </div>
    )
}

export default VideoSection

