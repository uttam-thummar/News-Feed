import React from 'react'

function NewsItem(props) {
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
        <>
            <div className="my-3">
                <div className="card">
                    <div className='d-flex justify-content-end position-absolute start-0'>
                        <span className="badge bg-warning text-dark">
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl?imageUrl:'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">
                            {title}
                        </h5>
                        <p className="card-text">{description !== null ? description.slice(0,88) + '...' : ''}</p>
                        <p className="card-text"><small className="text-muted fw-bold">By {author?author:'Unknown'} on {new Date(date).toLocaleString()}</small></p>
                        <div className='d-flex justify-content-end'>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark rounded-3">Read More</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NewsItem

