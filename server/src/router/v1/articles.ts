import ArticleController from '../../controller/ArticleController';

const articles = new ArticleController();

const AuthRoutes = [
  {
    path: '/top',
    method: 'get',
    action: articles.getAll,
  },
];

export default AuthRoutes;
