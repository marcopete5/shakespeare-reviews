import React, { Component } from 'react';

//Third-party
import axios from 'axios';
import StarRatings from 'react-star-ratings';


class Review extends Component {
    constructor(props){
        super(props)

        this.state = {
            comment: '',
            loading: true,
            sort: false,
            filter: false
        }
    }

    componentDidMount(){
        axios.get(`http://shakespeare.podium.co/api/reviews/${this.props.id}`,{headers: {Authorization:  'koOheljmQX'}}).then(res => {
            this.setState({comment: res.data.data.body, loading: false})
        })
    }

    toggleFilter = () => {
        this.setState(prevState => {
            return {
                filter: !prevState.filter
            }
        })
    }

    toggleSort = () => {
        this.setState(prevState => {
            return {
                sort: !prevState.sort
            }
        })
    }

    render() {
        if (!this.state.loading){
            this.props.load()
        }
        const newDate = new Date(this.props.publish)
        const date = String(newDate).slice(0, 16)
        return (
            <div id={this.props.id} className="reviewContainer">
                <div>
                    <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" alt='avatar icon' /><span id='author'>{this.props.author}</span>
                    <br/>
                    <StarRatings
                        rating={Number(this.props.rating)}
                        starDimension="15px"
                        starSpacing="0px"
                        starRatedColor="#f7c033"
                        starEmptyColor="#e4e1e1"
                    /> 
                    <br/>
                    <h4 style={{display: 'inline-block'}}>{this.state.comment}</h4>
                    <p>{date}</p>
                </div>
            </div>
        );
    }
}

export default Review;