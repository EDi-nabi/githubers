// 1. set proper username and token
// 2. rename this file to github.config.ts
// 3. have fun
// For instruction on how to create personal access token visit:
// https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

// limit: fill the array with repo names or leave it empty and kill your browser with thousands of requests

export const githubConfig = {
  url: 'https://api.github.com',
  username: 'YOUR_GITHUB_USERNAME',
  token: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN',
  organization: 'angular',
  initPerPage: 100,
  reposPerPage: 30,
  contributorsPerPage: 30,
  limit: ['zone.js', 'material.angular.io', 'router-builds', 'angular', 'material2', 'angular-cli', 'angular.js', 'material', 'protraktor'],
};
