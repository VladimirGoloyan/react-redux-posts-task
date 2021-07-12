import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setCurrentPosts,
  searchPosts,
  addPostToColumn,
  ratingSorter,
} from "actions/postsActions";
import { pageChanger, postsPerPageChanger } from "actions/pagesActions";

import PostMain from "components/PostMain/PostMain";
import PostColumn from "components/PostColumn/PostColumn";
import Button from "components/Button/Button";

//import ratingSorter from "utils/ratingSorter";
import postsMockup from "data-mockup/posts-mockup";

import "./Posts.scss";

const Posts = (props) => {
  
  const posts = postsMockup;

  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    console.log("Props :", props);
    props.setCurrentPosts(props.pages.currentPage, props.pages.postsPerPage);
  }, [props.pages]);

  const searchValueChanger = (e) => {
    setSearchVal(e.target.value);
  };

  const searchHandler = () => {
    props.searchPosts(searchVal);
  };

  const pageCounter = () => {
    let pagesArr = [];
    for (let i = 0; i < posts.length / props.pages.postsPerPage; i++)
      pagesArr.push(i + 1);
    return pagesArr;
  };

  const pageChanger = (page) => {
    props.pageChanger(page);
  };

  const postsPerPageChanger = (count) => {
    props.postsPerPageChanger(count);
  };

  const postAdder = (col) => {
    props.addPostToColumn(col);
    if (props.posts[col].posts.length >= 2)
      props.ratingSorter(col, props.posts[col].sortDir);
  };

  return (
    <>
      {console.log("Props :", props)}
      <div className="app-posts">
        <div className="app-posts__main">
          <div className="app-posts__main__search">
            <input
              className="app-posts__main__search__input"
              value={searchVal}
              onChange={searchValueChanger}
            />
            <button
              className="app-posts__main__search__button"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
          {props.posts[0].length !== 0 ? (
            props.posts[0].map((post, idx) => {
              return (
                <PostMain
                  className="app-posts__main__container"
                  post={post}
                  key={idx}
                  addReply={() => {
                    this.toggleModal();
                  }}
                />
              );
            })
          ) : (
            <div> Loading ...</div>
          )}
          <div className="app-posts__pagination">
            <div className="app-posts__pagination__items">
              <span>Posts per page</span>
              {[1, 2, 3].map((el) => {
                return (
                  <span
                    className="app-posts__pagination__items__count"
                    key={el}
                    onClick={() => postsPerPageChanger(el)}
                  >
                    {el}
                  </span>
                );
              })}
            </div>
            <div className="app-posts__pagination__pages">
              <span>Change page</span>
              {pageCounter().map((el) => {
                return (
                  <span
                    className="app-posts__pagination__pages__item"
                    key={el}
                    onClick={() => pageChanger(el)}
                  >
                    {el}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="app-posts__columns">
          Col1
          <div className="app-posts__columns__buttons">
            <Button onClick={() => postAdder(1)}> Add Post </Button>
            {props.posts[1].posts.length >= 2 && (
              <Button onClick={() => console.log("object")}>
                {props.posts[1].sortDir ? (
                  <i className="arrow up"></i>
                ) : (
                  <i className="arrow down"></i>
                )}
              </Button>
            )}
          </div>
          {props.posts[1].posts &&
            props.posts[1].posts.map((post, idx) => {
              return (
                <PostColumn
                  className="app-posts__columns__container"
                  post={post}
                  key={idx}
                  remove={() => console.log("object")}
                />
              );
            })}
        </div>
        <div className="app-posts__columns">
          Col2
          <div className="app-posts__columns__buttons">
            <Button onClick={() => postAdder(2)}> Add Post </Button>
            {props.posts[2].posts.length >= 2 && (
              <Button onClick={() => console.log("click")}>
                {props.posts[2].sortDir ? (
                  <i className="arrow up"></i>
                ) : (
                  <i className="arrow down"></i>
                )}
              </Button>
            )}
          </div>
          {props.posts[2].posts &&
            props.posts[2].posts.map((post, idx) => {
              return (
                <PostColumn
                  className="app-posts__columns__container"
                  post={post}
                  rating={post}
                  key={idx}
                  remove={() => console.log("click")}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    pages: state.pages,
  };
};

const mapDispatchToProps = {
  setCurrentPosts,
  searchPosts,
  pageChanger,
  postsPerPageChanger,
  addPostToColumn,
  ratingSorter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
