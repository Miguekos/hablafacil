import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Index from "@/views/HablaFacil/index";
import LoginApp from "@/views/Login/index";
import AdminHablaFacil from "@/views/HablaFacil/AdminHablaFacil";
import AdminPlanesAccion from "@/views/PlanAccion/AdminPlanesAccion";
import IdPlanAccion from "@/views/PlanAccion/IdPlanAccion";
import EditPlanAccion from "@/views/PlanAccion/EditPlanAccion";

/* import mainPlan from "@/layout/mainPlan"; */

import MainLayout from "@/layout/MainLayout";

Vue.use(Router);

const router = new Router({
  mode: "history",
  /* SCROLL  */
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      component: LoginApp,
      // component: () => import("@/views/Dashboard/SuperAdmin"),
      name: "Login",
      // beforeEnter: (to, from, next) => {
      //   const user = store.state.users.user;
      //   if (user.isAuth) {
      //     return next("/habla-facil");
      //   } else {
      //     return next();
      //   }
      // }
    },
    {
      path: "/habla-facil",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "hablaFacil",
          component: Index
        },
        {
          path: "admin",
          component: AdminHablaFacil
        }
      ]
    },
    {
      path: "/planes-accion",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "planAccion",
          component: AdminPlanesAccion
        },
        {
          path: ":id",
          component: IdPlanAccion
        },
        {
          path: "edit/:id",
          component: EditPlanAccion
        }
      ]
    },
    {
      path: "/dashboard",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "user",
          name: "dashPersonal",
          component: () => import("@/views/Dashboard/PersonalAdmin")
        },
        {
          path: "admin",
          name: "dashAdmin",
          component: () => import("@/views/Dashboard/SuperAdmin")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const user = true;
    if (!user) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
