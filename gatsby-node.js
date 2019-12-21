const path = require(`path`);
var slugify = require("slugify");

const makeRequest = (graphql, request) =>
	new Promise((resolve, reject) => {
		// Query for nodes to use in creating pages.
		resolve(
			graphql(request).then(result => {
				if (result.errors) {
					reject(result.errors);
				}
				return result;
			})
		);
	});

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	const StrapiPosts = makeRequest(
		graphql,
		`query {
		  allStrapiPost(sort:{fields:created_at}){
		    edges{
		      node{
		        id
		        title
		        created_at
		        categories{
		          category
		        }
		      }
		    }
		  }
		}
 `
	).then(result => {
		const items = result.data.allStrapiPost.edges;

		items.forEach(({ node }, index) => {
			const slug = slugify(node.title, {
				replacement: "-", // replace spaces with replacement
				remove: null, // regex to remove characters
				lower: true // result in lower case
			});
			const next = index === 0 ? undefined : items[index - 1].node;
			const prev = index === items.length - 1 ? undefined : items[index + 1].node;
			createPage({
				path: slug,
				component: path.resolve(`./src/templates/StrapiPostTemplate.js`),
				context: {
					id: node.id,
					prev,
					next
				}
			});
		});

		// Create category list
		const categorySet = new Set();
		items.forEach(edge => {
			const {
				node: {
					categories: [{ category }]
				}
			} = edge;

			if (category && category !== null) {
				categorySet.add(category);
			}
		});

		// Create category pages
		const categoryList = Array.from(categorySet);
		categoryList.forEach(category => {
			createPage({
				path: `/category/${slugify(category)}/`,
				component: path.resolve(`./src/templates/StrapiCategoryTemplate.js`),
				context: {
					category
				}
			});
		});
	});

	return Promise.all([StrapiPosts]);
};
