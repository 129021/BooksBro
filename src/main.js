import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vant/lib/index.css'

// 引入scss


// 导入轮播图插件（从vant）
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Badge,
    Sidebar,
    SidebarItem,Collapse, CollapseItem ,Tab, Tabs ,Card,Tag,Button,
    Image as VanImage,Form, Field, CellGroup
} from 'vant';


createApp(App).use(Swipe).use(SwipeItem).use(Lazyload, {loading: require('./assets/images/default.png')}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use( CollapseItem ).use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form).use(Field).use(CellGroup).use(store).use(router).mount('#app')