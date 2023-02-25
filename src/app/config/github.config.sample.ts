// 1. set proper username and token
// 2. rename this file to github.config.ts
// 3. have fun
// For instruction on how to create personal access token visit:
// https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/

export const githubConfig = {
  url: 'https://api.github.com',
  username: 'YOUR_GITHUB_USERNAME',
  token: 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN',
  organization: 'angular',
  initPerPage: 100,
  reposPerPage: 30,
  contributorsPerPage: 30,
};
