import React from 'react'
import { useSelector } from 'react-redux'
import "./Genres.scss"

const Genres = ({ data }) => {

    const { genres } = useSelector((state) => state.home)
    // console.log(genres)

    return (
        <div className='genres'>

            {data?.map((item) => {
                if (!genres[item]?.name) return;
                return (
                    <div key={item} className='genre' style={{ color: 'yellow' }}>
                        {genres[item]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres