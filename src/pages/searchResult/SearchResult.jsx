import React, { useEffect, useState } from "react";
import "./SearchResult.scss";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  console.log(data);

  const fetchSearchResult = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (item) => {
        setData(item);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchSearchResultNext = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1)
    fetchSearchResult();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                `
                {`Search ${
                  data?.results.length > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
              className="content"
                dataLength={data.results.length || []} 
                next={fetchSearchResultNext}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner/>}
              >
               {
                data?.results.map((item,index)=>{
                  if(item.media_type ==="person") return ;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true}/>
                  )
                })
               }
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry , Results not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
