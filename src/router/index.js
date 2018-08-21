import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import store from '../store'


Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next();
    return;
  }
  next('/');
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next();
    return;
  }
  next('/login');
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      // 8/20 - trying to capture the access token post-login
      // Didn't work.  Not sure what's up.
      path: '/:accessToken',
      name: 'LoggedIn',
      component: Home
    }
  ]
});
