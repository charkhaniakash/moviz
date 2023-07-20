import React from 'react'
import './Cast.scss'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyLoadImage/Img'
import { useSelector } from 'react-redux'
import avatar from "../../../assets/avatar.png";


const Cast = ({ data, loading }) => {


  const { url } = useSelector((state) => state.home)
  console.log(url)

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };



  return (
    <div className="castSection">
      <ContentWrapper>
        <div className='sectionHeading'>
          Top cast
        </div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              return (
                <div key={item?.id} className='listItem'>
                  <div className='profileImg'>
                    <Img src={item?.profile_path ? (url.profile + item?.profile_path) : avatar} alt="" />
                  </div>
                  <div className='name'>{item?.name}</div>
                  <div className='character'>{item?.character}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Cast
