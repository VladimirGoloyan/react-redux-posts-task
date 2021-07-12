import React, { Component } from "react";

import Button from "components/Button/Button";
import calcAv from "utils/averageCalculator";

import "./PostColumn.scss";

class PostColumn extends Component {
  ratingColorPicker = (rating) => {
    if (rating > 4) return "green";
    else if (rating > 3) return "yellow";
    else return "red";
  };

  render() {
    const average = calcAv(this.props.post.comments);

    return (
      <div className={this.props.className}>
        <div className={`app-post-column__body ${this.ratingColorPicker(average)}`}>
          <h2>{this.props.post.title}</h2>
          <h2>{average}</h2>
        </div>
        <Button onClick={this.props.remove}>-</Button>
      </div>
    );
  }
}

export default PostColumn;
