// import {
//   nextTick
// } from 'vue';
import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
// import Home from '../views/Home.vue'

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Detail = () => import('../views/detail/Detail');
const Profile = () => import('../views/profile/Profile');
const Shopcart = () => import('../views/shopcart/Shopcart');
const Register = () => import('../views/profile/Register');


const routes = [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '图书兄弟'
    }
  },
  {
    path: '/',
    name: 'Default',
    component: Home,
    meta: {
      title: '图书兄弟'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: '商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta: {
      title: '购物车'
    }
  },

  {
    path: '/register',
    name: 'Register',
    component:Register ,
    meta: {
      title: '注册'
    }
  },




]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  // 如果没有登录，到login
  next();
  document.title = to.meta.title;
})

export default router