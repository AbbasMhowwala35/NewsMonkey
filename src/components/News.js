import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'genral'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes,
        category: PropTypes.string,
    }
    constructor(props){
        super(props);
        this.state =  {
            articles: [],
            loading: false,
            page:1
        }
    }
    async updateNews(pageNo){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ed36e7e26af4c8bb66b4afd58dd2920&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data =  await fetch(url);
        let parseData = await data.json()
        this.setState({articles: parseData.articles,
             totalResults: parseData.totalResults,
            loading: false})

    }
    async componentDidMount(){
        this.updateNews();
    }
    handlePrevClick = async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ed36e7e26af4c8bb66b4afd58dd2920&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data =  await fetch(url);
        // let parseData = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
            
        // })
        this.setState({page: this.state.page - 1});
        this.updateNews();
        
    }
    handleNextClick = async ()=>{
        // if (!( this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ed36e7e26af4c8bb66b4afd58dd2920&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data =  await fetch(url);
        //     let parseData = await data.json()
        //     this.setState({
        //         page: this.state.page - 1,
        //         articles: parseData.articles,
        //         loading: false
        //     }) 
        // } 
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }
    
    render() {
        return (
            <div className="container my-3">
                <h1 className="newshead">News Monkey - Latest News</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>
                    <div className="col-md-4" key={element.url}>
                        <NewsItems title={element.title?element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} imageUrl={element.urlToImage?element.urlToImage: ""} 
                        url={element.url?element.url: ""} author={element.author?element.author: ""} date={element.publishedAt?element.publishedAt: ""} source={element.source.name} />   
                    </div>
                )}  
                </div>  
                <div className="container d-flex justify-content-between">                    
                    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>                             
            </div>
        )
    }
}

export default News