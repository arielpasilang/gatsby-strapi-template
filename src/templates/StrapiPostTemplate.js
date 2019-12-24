import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/StrapiPost";
import { ThemeContext } from "../layouts";

const StrapiPostTemplate = props => {
	const post = props.data.strapiPost;
	const { next, prev } = props.pageContext;

	return (
		<React.Fragment>
			<Seo
				title={post && post.title}
				description={post && post.ogDescription}
				image={post && post.ogImage && post.ogImage.publicURL}
			/>
			<ThemeContext.Consumer>
				{theme => (
					<Article theme={theme}>
						<Post post={post} next={next} prev={prev} theme={theme} />
					</Article>
				)}
			</ThemeContext.Consumer>
		</React.Fragment>
	);
};

export default StrapiPostTemplate;

export const query = graphql`
	query strapiPost($id: String) {
		strapiPost(id: { eq: $id }) {
			id
			title
			created_at(formatString: "YYYY-DD-MM")
			updated_at
			author {
				id
				firstName
				lastName
				email
			}
			categories {
				id
				category
			}
			cover {
				publicURL
			}
			ogImage {
				publicURL
			}
			ogType
			ogTitle

			ogDescription
			ogUrl
			ogSiteName
			body
		}
	}
`;
