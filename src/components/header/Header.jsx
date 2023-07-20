import React, { useEffect, useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import logo from '../../assets/movix-logo.svg'
import './Header.scss'

import { FiMenu, FiSearch, FiXCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'


const Header = () => {


  const [show, setShow] = useState("top")



  const [mobileMenu, setMobileMenu] = useState(false)

  const [lastScrollY, setLastScrollY] = useState(0)
  console.log(lastScrollY)

  const [showSearch, setShowSearch] = useState(false)



  const navigate = useNavigate()


  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)

  }

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)

      setTimeout(() => {
        setShowSearch(false)
      }, 1000)
    }
  }

  const navigateHandler = (type) => {
    if (type === "movies") {
      navigate('/explore/movies')
    }
    else {
      navigate(`/explore/tv`)
    }
    setMobileMenu(false)
  }



  const controlScroll = () => {
    let scrollNum = Math.floor(window.scrollY)
    if (scrollNum > 250) {
      if (scrollNum > lastScrollY && !mobileMenu) {
        setShow('hide')
      }
      else {
        setShow('show')
      }
    }
    else {
      setShow('top')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', controlScroll)
    return () => window.removeEventListener('scroll', controlScroll)
  }, [lastScrollY])

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ""} ${show}`}>
      <ContentWrapper >
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
        <div className='menuItems'>
          <h3 onClick={() => navigateHandler("movies")} >Movies</h3>
          <h3 onClick={() => navigateHandler("tv")} >TV Shows</h3>
          <div className='icon'>
            <FiSearch onClick={setShowSearch} />
          </div>
        </div>
        <div className='mobileMenuItems'>
          <FiSearch onClick={setShowSearch} />
          {mobileMenu ? (<FiXCircle onClick={() => setMobileMenu(false)} />) : (<FiMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper >
            <div className='searchInput'>
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onKeyUp={searchQueryHandler}
              />
              <FiXCircle onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  )
}

export default Header
