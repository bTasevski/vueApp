import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PlayersList from "../views/ListView.vue";
import PlayerStats from "../components/PlayerStats.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "PlayersList",
    component: PlayersList,
    children: [
      {
        name: "PlayerStats",
        path: "/player_stats/:id",
        component: PlayerStats,
      },
    ],
  },

  {
    path: "/about",
    name: "About",

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
