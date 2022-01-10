import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

function News(props) {
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`

    const [Articles, setArticles] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [TotalResults, setTotalResults] = useState(0);
    const [Page, setPage] = useState(1);
    const [TotalPage, setTotalPage] = useState(1);

    const fetchNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${Page}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setTotalPage(Math.ceil(parsedData.totalResults/props.pageSize));
        setLoading(false);
    }

    useEffect(() => {
        fetchNews();
    }, []);

    const handleNextClick = async () => {
        if((Page+1) <= TotalPage){
            setPage(Page+1);
            fetchNews();
        }
    }

    const handlePrevClick = async () => {
        if((Page - 1) > 0){
            setPage(Page-1);
            fetchNews();
        }
    }

    return (
        <div className="container my-3">
            <h1 className='text-center' style={{margin: '35px 0'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {Loading && <Spinner/>}
            <div className="row">
                {!Loading && Articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}
            </div>
            <div className=" d-flex justify-content-between">
                <button disabled={Page<=1} className="btn btn-dark mx-3" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={Page >= TotalPage} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}

News.defaultProps = {
    pageSize: 9,
    country: 'in',
    category: 'general'
}
News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
}

export default NewsOld
