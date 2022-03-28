// import {
//   nextTick
// } from 'vue';
import {
  createRouter,
  createWebHistory
} from 'vue-router'
// import Home from '../views/Home.vue'

const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const Detail = () => import('../views/detail/Detail.vue');
const Profile = () => import('../views/profile/Profile.vue');
const Shopcart = () => import('../views/shopcart/Shopcart.vue');


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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  // 如果没有登录，到login
  next();
  document.title = to.meta.title;
})

export default router