// https://www.11ty.dev/docs/plugins/image/#eleventy-transform
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: "html",
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
			sizes: "100vw"
		},
	});
};