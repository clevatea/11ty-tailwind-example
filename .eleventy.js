const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path = require("path");

const prettier = require("prettier");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("randomItem", (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random();
    });
    return arr.slice(0, 1);
  });
  eleventyConfig.addFilter("isoString", (date = Date.now()) => new Date(date).toISOString());
  eleventyConfig.addWatchTarget("src/**/*");
  eleventyConfig.addWatchTarget("./dist/main.css");

  eleventyConfig.setWatchThrottleWaitTime(100);

  /**
   * use prettier auto format for output build  
   * remove if you dont need 
   * use minify instead https://www.11ty.dev/docs/config/#transforms-example-minify-html-output
   */
  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser.
        const parser = extname.replace(/^./, "");
        return prettier.format(content, {
          "printWidth": 140,
          "useTabs": false,
          "tabWidth": 2,
          "semi": true,
          "bracketSpacing": true,
          "endOfLine": "auto",
          parser
        });

      default:
        return content;
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};