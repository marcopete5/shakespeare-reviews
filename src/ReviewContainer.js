import React, { Component } from 'react';
import axios from 'axios';

//My components
import Review from './Review';
import Header from './Header';
import Search from './Search';



class ReviewContainer extends Component {
    constructor(){
        super()

        this.state = {
            reviews: [],
            filteredReviews: [],
            filtering: false,
            loading: true,
            average: '',
            stars: {
                oneStar: '',
                twoStar: '',
                threeStar: '',
                fourStar: '',
                fiveStar: '',
            },
            value: 'Top Rated',
            fValue: 'All Stars',
            searchTerm: ''
        }

        this.count = 0
    }

    componentDidMount(){
        axios.get('http://shakespeare.podium.co/api/reviews', {headers: {Authorization:  'koOheljmQX'}})
            .then(res=> {
                const reviews = res.data.data;
                let average = 0
                reviews.map((review, i) => average += review.rating);
                average /= reviews.length

                let oneStar = 0
                let twoStar = 0
                let threeStar = 0
                let fourStar = 0
                let fiveStar = 0
                reviews.map(review => {
                    let num = Math.ceil(review.rating)
                    switch(num){
                        case 1: 
                            return oneStar++;
                        case 2:
                            return twoStar++;
                        case 3:
                            return threeStar++;
                        case 4: 
                            return fourStar++;
                        case 5: 
                            return fiveStar++;
                        default:
                            return num;
                    }
                })
                const sortedReviews = reviews.sort((a,b) => b.rating - a.rating);

                this.setState(prevState =>{
                        return {
                            ...prevState,
                            reviews: sortedReviews, 
                            average: average.toFixed(2), 
                            stars: {
                                oneStar: oneStar / reviews.length * 100,
                                twoStar: twoStar / reviews.length * 100,
                                threeStar: threeStar / reviews.length * 100,
                                fourStar: fourStar / reviews.length * 100,
                                fiveStar: fiveStar / reviews.length * 100,
                            }
                        }
                })
            })
            
    }

    load = () => {
        this.count++
        if(this.count === this.state.reviews.length) {
            this.setState({loading: false})
        }
    }

    handleSort = e => {
        this.setState({value: e.target.value}, () => this.sort())
    }

    sort = () => {
        if (this.state.value === 'Top Rated'){
            if(this.state.filtering){
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.filteredReviews.sort((a,b) => b.rating - a.rating)
                    }
                })
            }else {
                this.setState(prevState => {
                    return {
                        reviews: prevState.reviews.sort((a,b) => b.rating - a.rating)
                    }
                })
            }
        }else {
            if(this.state.filtering){
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.filteredReviews.sort((a,b) => new Date(b.publish_date) - new Date(a.publish_date))
                    }
                })
            }else {
                this.setState(prevState => {
                    return {
                        reviews: prevState.reviews.sort((a,b) => new Date(b.publish_date) - new Date(a.publish_date))
                    }
                })
            }
        }
    }

    handleFilter = e => {
        this.setState({fValue: e.target.value}, () => this.filter())
    }

    filter = () => {
        switch(this.state.fValue){
            case '1 Star':
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.reviews.filter(review => review.rating <= 1),
                        filtering: true
                    }
                })
                break;
            case '2 Stars':
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.reviews.filter(review => review.rating <= 2 && review.rating > 1),
                        filtering: true
                    }
                })
                break;
            case '3 Stars':
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.reviews.filter(review => review.rating <= 3 && review.rating > 2),
                        filtering: true
                    }
                })
                break;
            case '4 Stars':
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.reviews.filter(review => review.rating <= 4 && review.rating > 3),
                        filtering: true
                    }
                })
                break;
            case '5 Stars':
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.reviews.filter(review => review.rating <= 5 && review.rating > 4),
                        filtering: true
                    }
                })
                break;
            default:
                this.setState(prevState => {
                    return {
                        filteredReviews: prevState.reviews,
                        filtering: false
                    }
                })
                break;
        }
    }

    addComment = (comment, id) => {
        this.setState(prevState => {
            const reviews = [...prevState.reviews]
            const updatedObject = reviews.find(review => {
                return review.id === id 
            })
            updatedObject.comment = comment
            return {
                reviews
            }
        })
    }

    handleSearch = e => {
        let {value} = e.target;
            this.setState(prevState => {
                const rev = [...prevState.reviews]
                return { 
                    searchTerm: value,
                    filtering: this.state.searchTerm.length > 0 ? true : false,
                    filteredReviews: rev.filter(review => review.comment.toLowerCase().includes(prevState.searchTerm.toLowerCase()))
                }
            })        
    }

    render() {
        const mappedReviews = this.state.reviews.map((review, i) => 
                            <Review key = {review.id}
                                    rating = {review.rating}
                                    publish = {review.publish_date}
                                    author = {review.author}
                                    id = {review.id}
                                    load = {this.load}
                                    addComment = {this.addComment}
                             />)
        
        const filteredReviews = this.state.filteredReviews.map((review, i) => 
                            <Review key = {review.id}
                                    rating = {review.rating}
                                    publish = {review.publish_date}
                                    author = {review.author}
                                    id = {review.id}
                                    load = {this.load}
                                    addComment = {this.addComment}
                             />)
        
        const display = this.state.loading ? 'none' : 'block';
        const loader = this.state.loading ? 'block' : 'none';
        return (
            <div>
                <div>
                    
                    <img style={{display: loader, margin: 'auto'}} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt='loading gif'/>
                    <div style={{display: display}}>
                        <Header total={this.state.reviews.length} 
                                average={this.state.average} 
                                stars={this.state.stars}
                                />
                        <Search value={this.state.searchTerm} name='comments' handleChange={this.handleSearch}>
                            Search author reviews
                        </Search>
                        <Search value={this.state.searchTerm} name='authors' handleChange={this.handleSearch}>
                            Search by author
                        </Search>
                        <div className="dropdowns">
                            <div className="filter">
                                <p>SORT BY</p>
                                <select value={this.state.value} onChange={this.handleSort} className="selectOptions">
                                    <option value="Top Rated">Top Rated</option>
                                    <option value="Most Recent">Most Recent</option>
                                </select>
                            </div>
                            <div className="filter">
                                <p>FILTER BY</p>
                                <select value={this.state.fValue} onChange={this.handleFilter}  className="selectOptions">
                                    <option value="All Stars">All Stars</option>
                                    <option value="1 Star">1 Star</option>
                                    <option value="2 Stars">2 Stars</option>
                                    <option value="3 Stars">3 Stars</option>
                                    <option value="4 Stars">4 Stars</option>
                                    <option value="5 Stars">5 Stars</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            {this.state.filtering ? 
                                filteredReviews 
                                :
                                mappedReviews
                                }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewContainer;