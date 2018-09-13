import React from 'react';

//Third-party components
import StarRatings from 'react-star-ratings';

const Header = (props) => {
    let {oneStar, twoStar, threeStar, fourStar, fiveStar} = props.stars;
    return (
        <div>
            <h1>Shakespeare Reviews</h1>
            <StarRatings
                        rating={Number(props.average)}
                        starDimension="20px"
                        starSpacing="1px"
                        starRatedColor="#f7c033"
                        starEmptyColor="#e4e1e1"
            /> <span>{props.total}</span>
            <p>{props.average} out of 5 stars</p>
            <div>
                <span>5 star</span>
                    <div id="starbox">
                        <div id="innerStarbox" style={{width: `${oneStar}%`}}></div>
                    </div>
                <span>{Number(oneStar).toFixed(0)}%</span>
            </div>
            <div>
                <span>4 star</span>
                    <div id="starbox">
                        <div id="innerStarbox" style={{width: `${twoStar}%`}}></div>
                    </div>
                <span>{Number(twoStar).toFixed(0)}%</span>
            </div>
            <div>
                <span>3 star</span>
                    <div id="starbox">
                        <div id="innerStarbox" style={{width: `${threeStar}%`}}></div>
                    </div>
                <span>{Number(threeStar).toFixed(0)}%</span>
            </div>
            <div>
                <span>2 star</span>
                    <div id="starbox">
                        <div id="innerStarbox" style={{width: `${fourStar}%`}}></div>
                    </div>
                <span>{Number(fourStar).toFixed(0)}%</span>
            </div>
            <div>
                <span>1 star</span>
                    <div id="starbox">
                        <div id="innerStarbox" style={{width: `${fiveStar}%`}}></div>
                    </div>
                <span>{Number(fiveStar).toFixed(0)}%</span>
            </div>
        </div>
    );
};

export default Header;