const fetch = require("node-fetch");
const prettier = require("prettier");

async function fetchCode(githubApiUrl) {
  const response = await fetch(githubApiUrl);
  console.log(response.statusCode);
  const text = await response.text();
  return text;
}

async function fetchAndFormat(githubApiUrl) {
  const githubCode = await fetchCode(githubApiUrl);
  return prettier.format(githubCode, { parser: "babel" });
}

module.exports = { fetchAndFormat };
