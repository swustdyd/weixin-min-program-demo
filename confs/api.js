const config = require('./base.js')

const api = {
  checkLogin: 'user/checkLogin',
  getMovies: 'movie/getMovies',
  postComment: 'comment/commit',
  getComment: 'comment/getComment',
  cutImg: 'util/cutImg',
  newOrUpdateMovie: 'movie/newOrUpdate',
  deleteMovie: 'movie/delete',
  uploadPoster: 'movie/uploadPoster',
  getMoviesByGroup: 'movie/getMoviesByGroup',
  signup: 'user/signup',
  signin: 'user/signin',
  logout: 'user/logout',
  getUsers: 'user/getUsers',
  updatePwd: 'user/updatePwd',
  deleteUser: 'user/delete',
  editUser: 'user/edit',
  uploadIcon: 'user/uploadIcon',
  getDoubanMovies: 'movie/getDoubanMovies',
  getGroupInfoOfDouban: 'movie/getGroupInfoOfDouban',
  getLanguage: 'movie/getLanguage',
  getMovieDetail: 'movie/getMovieDetail',
  searchMovie: 'movie/searchMovie'
};

for (const key in api) {
  api[key] = `${config.serverHost}:${config.serverPort}/${api[key]}`;
}

module.exports = api;