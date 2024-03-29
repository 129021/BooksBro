import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vant/lib/index.css'



// 导入轮播图插件（从vant）
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Badge,
    Sidebar,
    SidebarItem,
    Collapse,
    CollapseItem,
    Tab,
    Tabs,
    Card,
    Tag,
    Button,
    Image as VanImage,
    Form,
    Field,
    CellGroup,
    Stepper,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
    SwipeCell,
    Icon,
    AddressList,
    AddressEdit,
    Area,
    Popup,
    Grid,
    GridItem,
    PullRefresh,
    List,
} from 'vant';


createApp(App).use(Swipe).use(SwipeItem).use(Lazyload, {
    loading: require('./assets/images/default.png')
}).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form).use(Field).use(CellGroup).use(Stepper).use(Checkbox).use(CheckboxGroup).use(SubmitBar).use(SwipeCell).use(Icon).use(AddressList).use(AddressEdit).use(Area).use(Popup).use(Grid).use(GridItem).use(PullRefresh).use(List).use(store).use(router).mount('#app')