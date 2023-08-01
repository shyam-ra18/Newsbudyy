import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class extends Component {
  pagesize = 15;
  // apikey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color="#E66B04"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pagesize={this.pagesize}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pagesize={this.pagesize}
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pagesize={this.pagesize}
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              exact
              path="/Science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="Science"
                  pagesize={this.pagesize}
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pagesize={this.pagesize}
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pagesize={this.pagesize}
                  country="in"
                  category="technology"
                />
              }
            ></Route>
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pagesize={this.pagesize}
                  country="in"
                  category="business"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }
}
