import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";

import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import Author from "./Author";
// import Comments from "./Comments";
import NextPrev from "./NextPrev";

const Share = asyncComponent(() =>
  import("./Share")
    .then(module => {
      return module.default;
    })
    .catch(error => {})
);

const Post = props => {
  const { next: nextPost, prev: prevPost, theme } = props;
  // const author = props.post.
  const author = props.post.author.firstName + " " + props.post.author.lastName;
  const { title, body, created_at } = props.post;
  const category =
    (props.post && props.post.categories.map(item => item.category).join(", ")) || "No Categories";
  return (
    <React.Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta author={author} prefix={created_at} category={category} theme={theme} />
      </header>
      <Bodytext html={body} theme={theme} />
      <footer>
        {/*<Share post={post} theme={theme} /> category={category}*/}
        <Author theme={theme} />
        <NextPrev next={nextPost} prev={prevPost} theme={theme} />
      </footer>
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authornote: PropTypes.string.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default Post;
