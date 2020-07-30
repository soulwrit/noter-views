import React from 'react';
const test = {
   name: 'test',
   path: '/test',
   component: React.lazy(() => import('./Test'))
};
const notFound = {
   path: '/404',
   to: '/404',
   component: React.lazy(() => import('./Error/404'))
};
const login = {
   name: '登录',
   path: '/login',
   component: React.lazy(() => import('./User/Login'))
};
const register = {
   name: '注册',
   path: '/register',
   component: React.lazy(() => import('./User/Register'))
};
const index = {
   name: '工作台',
   path: '/index',
   component: React.lazy(() => import('./Index/Index'))
};
const editor = {
   name: '编辑器',
   icon: 'calendar',
   path: index.path + '/editor',
   component: React.lazy(() => import('./Editor'))
};
const reader = {
   name: '阅读器',
   icon: 'form',
   path: index.path + '/reader',
   component: React.lazy(() => import('./Reader'))
};
const forum = {
   name: '论坛',
   icon: 'view-gallery',
   path: index.path + '/forum',
   component: React.lazy(() => import('./Forum'))
};
const about = {
   name: '关于开发者',
   icon: 'view-gallery',
   path: index.path + '/about',
   component: React.lazy(() => import('./About/Index'))
};
export default {
   test,
   notFound,
   login,
   register,
   index,

   editor,
   forum,
   reader,
   about
};