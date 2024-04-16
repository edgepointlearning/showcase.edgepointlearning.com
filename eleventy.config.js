module.exports = function(eleventyConfig) {

  // reload dev server from postcss output in package.json
  eleventyConfig.setServerOptions({
    watch: ["_site/styles.css"],
  });

  // watch tailwind config for changes
  eleventyConfig.addWatchTarget('./tailwind.config.js');

  // passhthrough static files
  eleventyConfig.addPassthroughCopy({ "./src/static": "/" });

  // opt out of emulated passthrough during --serve
  eleventyConfig.setServerPassthroughCopyBehavior("copy");

  // import external configs
  eleventyConfig.addPlugin(require('./src/_11ty/eleventy-img.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/html.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/postcss.js'))

  // Return all the tags used in a collection
  // https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js
  eleventyConfig.addFilter("getAllTags", collection => {
    let tagSet = new Set();
    for(let item of collection) {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });
	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

  return {
    dir: {
      input: 'src',
      layouts: '_layouts',
    }
  };
};