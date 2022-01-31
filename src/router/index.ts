import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PlayersListView from "../views/PlayersListView.vue";
import PlayerStats from "../components/PlayerStats.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "PlayersListView",
    component: PlayersListView,
    children: [
      {
        name: "PlayerStats",
        path: "/player_stats/:id",
        component: PlayerStats,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
