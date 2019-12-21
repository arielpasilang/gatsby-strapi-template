import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
var slugify = require("slugify");

const List = props => {
	const { posts, theme } = props;
	return (
		<React.Fragment>
			<ul>
				{posts.map(category => (
					<li>
						<Link
							to={slugify(category.title, {
								replacement: "-", // replace spaces with replacement
								remove: null, // regex to remove characters
								lower: true // result in lower case
							})}
						>
							{category.title}
						</Link>
					</li>
				))}
			</ul>

			{/* --- STYLES --- */}
			<style jsx>{`
				ul {
					margin: ${theme.space.stack.m};
					padding: ${theme.space.m};
					list-style: circle;
				}
				li {
					padding: ${theme.space.xs} 0;
					font-size: ${theme.font.size.s};
					line-height: ${theme.font.lineHeight.l};
					cursor: pointer;
				}
				li a {
					cursor: pointer;
				}
			`}</style>
		</React.Fragment>
	);
};

List.propTypes = {
	edges: PropTypes.array.isRequired,
	theme: PropTypes.object.isRequired
};

export default List;
