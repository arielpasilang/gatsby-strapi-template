import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import StrapiBlog from "../components/Strapi";
import Hero from "../components/Hero";
import Seo from "../components/Seo";

class IndexPage extends React.Component {
	separator = React.createRef();

	scrollToContent = e => {
		this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
	};

	render() {
		const {
			data: {
				bgDesktop: {
					resize: { src: desktop }
				},
				bgTablet: {
					resize: { src: tablet }
				},
				bgMobile: {
					resize: { src: mobile }
				}
			}
		} = this.props;

		const strapiPosts = this.props.data.posts.edges.map(post => post.node);
		const backgrounds = {
			desktop,
			tablet,
			mobile
		};

		return (
			<React.Fragment>
				<Seo
					title="GatsbyJS + Strapi Template Home Page"
					description="GatsbyJS + Strapi Template Home Page"
				/>
				<ThemeContext.Consumer>
					{theme => (
						<Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
					)}
				</ThemeContext.Consumer>

				<hr ref={this.separator} />

				<ThemeContext.Consumer>
					{theme => <StrapiBlog posts={strapiPosts} theme={theme} />}
				</ThemeContext.Consumer>

				<style jsx>{`
					hr {
						margin: 0;
						border: 0;
					}
				`}</style>
			</React.Fragment>
		);
	}
}

IndexPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const query = graphql`
	query StrapiQuery {
		posts: allStrapiPost(sort: { fields: created_at }) {
			edges {
				node {
					id
					title
					created_at(formatString: "MMM-DD-YYYY")
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
					ogType
					ogTitle
					ogDescription
					ogUrl
					ogSiteName
					body
				}
			}
		}

		bgDesktop: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
			resize(width: 1200, quality: 90, cropFocus: CENTER) {
				src
			}
		}
		bgTablet: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
			resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
				src
			}
		}
		bgMobile: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
			resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
				src
			}
		}
	}
`;

//hero-background
