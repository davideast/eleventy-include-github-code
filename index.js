const { fetchAndFormat } = require('./github');

module.exports = function(eleventyConfig) {
  // Usage: {% githubcode "davideast/eleventy-embed-githubcode/main/index.js" %}
  eleventyConfig.addLiquidTag("githubcode", function(liquidEnging) {
    return {
      parse: function (tagToken, remainingTokens) {
        this.githubApiUrl = convertToGitHubApiUrl(tagToken.args);
      },
      render: function (scope, hash) {
        return fetchAndFormat(this.githubApiUrl).then(formattedCode => {
          return '```js\n' + formattedCode + '\n```';
        });
      }
    }
  });
};

function convertToGitHubApiUrl(githubPath) {
  return `https://raw.githubusercontent.com/${githubPath}`;
}
