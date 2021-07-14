import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setPosts,
  searchPosts,
  addPostToColumn,
  removePostFromColumn,
  pageChanger,
  postsPerPageChanger,
} from "actions/postsActions";

import PostMain from "components/PostMain/PostMain";
import PostColumn from "components/PostColumn/PostColumn";
import Button from "components/Button/Button";

import ratingSorter from "utils/ratingSorter";
import postsMockup from "data-mockup/posts-mockup";

import "./Posts.scss";
import averageCalculator from "utils/averageCalculator";

const Posts = (props) => {
  const { posts, postsPerPage, currentPage } = props;

  const [searchVal, setSearchVal] = useState("");
  const [search, isSearch] = useState(false);
  const [directions, setDirections] = useState({
    left: false,
    right: false,
  });

  useEffect(() => {
    props.setPosts(postsMockup);
  }, []);

  const searchValueChanger = (e) => {
    setSearchVal(e.target.value);
  };

  const searchHandler = () => {
    let searchResult = posts.filter((el) => {
      if (el.body.includes(searchVal) || el.title.includes(searchVal)) {
        return el;
      }
      el.comments.map((el) => {
        if (el.body.includes(searchVal)) return el;
      });
    });

    props.searchPosts(searchResult);
    isSearch(true);
  };

  const resetSearch = () => {
    props.setPosts(postsMockup);
    isSearch(false);
    setSearchVal("");
  };

  const getCurrentPosts = () => {
    return posts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    );
  };

  const pageCounter = () => {
    let pagesArr = [];
    for (let i = 0; i < postsMockup.length / props.postsPerPage; i++)
      pagesArr.push(i + 1);
    return pagesArr;
  };

  const pageChanger = (page) => {
    props.pageChanger(page);
  };

  const postsPerPageChanger = (count) => {
    props.pageChanger(1);
    props.postsPerPageChanger(count);
  };

  const postAdder = (col) => {
    let postToAdd = posts
      .slice()
      .reverse()
      .find((el) => {
        if (!el.selected) {
          return el;
        }
      });

    if (!postToAdd) {
      console.log("No more posts to add");
      return;
    }
    props.addPostToColumn(col, postToAdd.id);
  };

  const postRemover = (postId) => {
    props.removePostFromColumn(postId);
  };

  const columnSorter = (column) => {
    let posts = [];

    if (column === 1) {
      props.posts.map((el) => {
        if (el.selected === "left") {
          posts.push({ ...el, average: averageCalculator(el.comments) });
        }
      });

      posts = ratingSorter(posts, directions.left);

      return posts;
    }
    props.posts.map((el) => {
      if (el.selected === "right") {
        posts.push({ ...el, average: averageCalculator(el.comments) });
      }
    });

    posts = ratingSorter(posts, directions.right);

    return posts;
  };

  const columnRenderer = (posts) => {
    if (posts.length !== 0) {
      posts = posts.map((post, idx) => {
        return (
          <PostColumn
            className="app-posts__columns__container"
            post={post}
            key={idx}
            remove={() => postRemover(post.id)}
          />
        );
      });

      return posts;
    }
  };

  return (
    <>
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

          {search && (
            <button
              className="app-posts__main__search__button"
              onClick={resetSearch}
            >
              Reset Search
            </button>
          )}
          {props.posts.length !== 0 ? (
            getCurrentPosts().map((post, idx) => {
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
            {columnSorter(1).length >= 2 && (
              <Button onClick={() => setDirections({ left: !directions.left })}>
                {directions.left ? (
                  <i className="arrow up"></i>
                ) : (
                  <i className="arrow down"></i>
                )}
              </Button>
            )}
          </div>
          {columnRenderer(columnSorter(1))}
        </div>
        <div className="app-posts__columns">
          Col2
          <div className="app-posts__columns__buttons">
            <Button onClick={() => postAdder(2)}> Add Post </Button>
            {columnSorter(2).length >= 2 && (
              <Button
                onClick={() => setDirections({ right: !directions.right })}
              >
                {directions.right ? (
                  <i className="arrow up"></i>
                ) : (
                  <i className="arrow down"></i>
                )}
              </Button>
            )}
          </div>
          {columnRenderer(columnSorter(2))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  setPosts,
  searchPosts,
  pageChanger,
  postsPerPageChanger,
  addPostToColumn,
  removePostFromColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
