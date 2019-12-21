import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/StrapiPost";
import { ThemeContext } from "../layouts";
import List from "../components/List/StrapiList";
import Headline from "../components/Article/Headline";
import { FaTag } from "react-icons/fa/";

const StrapiCategoryTemplate = props => {
	// const posts = props.data.strapiCategory.posts;
	const { posts, category } = props.data.strapiCategory;
	return (
		<React.Fragment>
			<ThemeContext.Consumer>
				{theme => (
					<Article theme={theme}>
						<header>
							<Headline theme={theme}>
								<span>Posts in category</span> <FaTag />
								{category}
							</Headline>
							<p className="meta">
								There <strong>{posts.length}</strong> post in the category.
							</p>
							<List posts={posts} theme={theme} />
						</header>
					</Article>
				)}
			</ThemeContext.Consumer>
		</React.Fragment>
	);
};

export default StrapiCategoryTemplate;

export const query = graphql`
	query strapiCategory($category: String) {
		strapiCategory(category: { eq: $category }) {
			id
			category
			posts {
				title
			}
		}
	}
`;
