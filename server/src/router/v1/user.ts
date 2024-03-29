import UserController from '../../controller/UserController';

const userController = new UserController();

const UserRoutes = [
  {
    path: '/',
    method: 'post',
    action: userController.create,
  },
  {
    path: '/:id',
    method: 'put',
    action: userController.update,
  },
  {
    path: '/:id',
    method: 'delete',
    action: userController.remove,
  },
];

export default UserRoutes;
