import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

function News(props) {
    const [Articles, setArticles] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [TotalResults, setTotalResults] = useState(0);
    const [Page, setPage] = useState(1);
    // const [TotalPage, setTotalPage] = useState(1);

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const fetchNews = async () => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${Page}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(80);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        // setTotalPage(Math.ceil(parsedData.totalResults/props.pageSize));
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`
        fetchNews();
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = () => {
        setTimeout(async() => {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${Page+1}`;
            setPage(Page+1);
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(Articles.concat(parsedData.articles));
        }, 500)
    };

    return (
        <>
            <h1 className='text-center' style={{margin: '100px 0 35px 0'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {Loading && <Spinner/>}

            <InfiniteScroll
            dataLength={Articles.length}
            next={fetchMoreData}
            hasMore={Articles.length !== TotalResults}
            loader={<Spinner/>}
            endMessage={!Loading &&
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            >
                <div className="container">
                    <div className="row">
                        {Articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
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

export default News

