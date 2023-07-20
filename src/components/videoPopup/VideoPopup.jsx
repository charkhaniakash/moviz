import React from 'react'
import "./VideoPopup.scss"
import ReactPlayer from 'react-player'
import { CloseButton } from 'react-bootstrap'


const VideoPopup = ({ videoId, setVideoId, show, setShow }) => {

    const hideClose = () => {
        setVideoId(null)
        setShow(false)
    }

    return (
        <div>
            <div className={`videoPopup ${show ? 'visible' : " " }`}>
            <div className="opacityLayer" onClick={hideClose}> </div>
                <div className="videoPlayer">
                    <span className="closeBtn" onClick={hideClose}>
                    close
                    </span>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        width='100%'
                        height='100%'
                        controls
                    />
                </div>
            </div>
        </div>
    )
}

export default VideoPopup
