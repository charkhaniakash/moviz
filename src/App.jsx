import { useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {

  const dispatch = useDispatch()

  const { url } = useSelector((state) => state.home)
  console.log(url)
  useEffect(() => {
    fetchApiConfig()
    generesCall()
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((data) => {
        const url = {
          backdrop: data?.images?.secure_base_url + "w780",
          poster: data?.images?.secure_base_url + "w780",
          profile: data?.images?.secure_base_url + "w780"
        }
        dispatch(getApiConfiguration(url))
      })
  }

  const generesCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}
    endPoints.forEach((url) => (
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    ))
    const data = await Promise.all(promises)
    console.log(data)
    data?.map(({ genres }) => {
      console.log(genres)
      return genres?.map((item) => (
        allGenres[item.id] = item
      ))
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/exp' element={<Explore />} />
        <Route path='/search/:query' element={<SearchResult />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
