import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";
import App from "./App.vue";
import Login from "./views/Login.vue";
import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(VueRouter);
Vue.use(elementUI);

Vue.prototype.$http = Axios;

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/todoList",
      component: () => import("./views/TodoList.vue")
    },
    { 
      path: '*',
      component: Login
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");