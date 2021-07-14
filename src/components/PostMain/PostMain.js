import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment, addReply } from "actions/postsActions";

import StarRatings from "../../../node_modules/react-star-ratings";
import { Modal } from "@material-ui/core";

import "./PostMain.scss";

const PostMain = (props) => {
  const [state, setState] = useState({
    commentVal: "",
    replyVal: "",
    isModal: false,
    commentId: null,
  });

  const inputChangeHandler = (e) => {
    setState({ ...state, [e.target.title]: e.target.value });
  };

  const commentAdder = () => {
    let post = props.posts.find((el) => el.id === props.post.id);
    post.comments.push({
      body: state.commentVal,
      reply: "",
      id: post.comments.length,
      rating: Math.random() * 5,
    });
    props.addComment(post, props.post.id);
    setState({ ...state, commentVal: "" });
  };

  const replyAdder = () => {
    props.addReply(state.replyVal, props.post.id, state.commentId);
    toggleModal(null);
  };

  const toggleModal = (num) => {
    setState({
      ...state,
      isModal: !state.isModal,
      commentId: num,
    });
  };

  return (
    <>
      <Modal
        className="app-posts__modal"
        open={state.isModal}
        onClose={toggleModal}
      >
        <>
          <input
            className="app-posts__modal__input"
            value={state.replyVal}
            onChange={inputChangeHandler}
            title="replyVal"
          ></input>
          <button
            className="app-posts__modal__button"
            onClick={() => replyAdder()}
          >
            Add Reply
          </button>
        </>
      </Modal>
      <div className={props.className}>
        <div
          className={
            props.post.selected ? "app-post-disabled" : "app-post-body"
          }
        >
          <h2>{props.post.title}</h2>
          <hr />
          <p>{props.post.body}</p>
        </div>
        {props.post.comments.map((el, idx) => {
          return (
            <div key={idx}>
              <div className="app-post-comment">
                <p className="app-post-comment__body">{el.body}</p>
                <StarRatings
                  className="app-post-comment__rating"
                  rating={el.rating}
                  starDimension="15px"
                  starRatedColor="black"
                />
                {el.reply === "" && (
                  <button
                    className="app-post-comment__reply-button"
                    onClick={() => toggleModal(el.id)}
                  >
                    &#8701;
                  </button>
                )}
              </div>
              {el.reply !== "" && (
                <div className="app-post-comment__reply">{el.reply}</div>
              )}
            </div>
          );
        })}
        <div className="app-post-main-add-comment">
          <input
            className="app-post-main-add-comment__input"
            value={state.commentVal}
            onChange={inputChangeHandler}
            title="commentVal"
          />
          <button
            className="app-post-main-add-comment__button"
            onClick={commentAdder}
          >
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = {
  addComment,
  addReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostMain);
