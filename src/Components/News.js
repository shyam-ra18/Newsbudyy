import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';

export class News extends Component {

  static defaulProps = {
    country: 'in',
    pagesize: 9,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsBuddy`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efa3615ddcf740ebb516b2f66f0fe1e6&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url); //Fetch Api 
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
      
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }


  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews()
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efa3615ddcf740ebb516b2f66f0fe1e6&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url); //Fetch Api 
    let parsedata = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults
    })
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: '40px 0px' }}>NewsBuddy - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {  //For loading spinner

                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                  {/* <NewsItem title={element.title.slice(0, 50)} description={element.description && element.description.slice(0,90)} imgurl={element.urlToImage} newsurl={element.url} /> */}
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News