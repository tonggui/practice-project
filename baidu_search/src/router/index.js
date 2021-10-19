import Vue from 'vue'
import Router from 'vue-router'
import HelloBaidu from "../components/HelloBaidu";
import SearchRes from "../components/SearchRes"
import News from "../components/News"
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/helloBaidu'
  },
    {
        path: '/helloBaidu',
        name: 'HelloBaidu',
        component: HelloBaidu
    },{
    path: '/searchRes',
    name: 'SearchRes',
    component: SearchRes
  },{
    path: '/news',
    name: 'News',
    component: News
  }

]
var router = new Router({
  routes
})

export default router
