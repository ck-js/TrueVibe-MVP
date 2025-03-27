import { createWebHistory, createRouter } from 'vue-router'
import useAuthUser from "@/composables/UseAuthUser";


const routes = [
    {
      name: "Home",
      path: '/',
      component: () => import("@/pages/Login.vue"), 
      
    },
    ,
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register.vue"),
  },
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("@/pages/EmailConfirmation.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    name: "ForgotPassword",
  path: "/forgot-password",
  component: () => import("@/pages/ForgotPassword.vue"),
  },
  {
    name: "UpdatePassword",
    path: "/update-password",
    component: () => import("@/pages/UpdatePassword.vue"),

  },
  {name: "Me",
    path: "/me",
    component: () => import("@/pages/Me.vue"),
    meta: {
      requiresAuth: true,
    },
    
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "Matches",
    path: "/matches",
    component: () => import("@/pages/Matches.vue"),
    meta: {
      requiresAuth: true,
    },

  },
  {
    name: "Growth",
    path: "/growth",
    component: () => import("@/pages/Growth.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    name: "Report",
    path: "/report",
    component: () => import("@/pages/Report.vue"),
    meta: {
      requiresAuth: true,
    }
  },
    {
      name: "QuizAuth",
      path: "/quiz-auth",
      component: () => import("@/pages/QuizAuth.vue"),
      meta: {
        requiresAuth: true,
      },
    }
  

  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthUser();

  // Check if there is a redirect query parameter
  if (to.query.redirect) {
    const redirect = to.query.redirect;
    // Remove the redirect query parameter and navigate to the intended route
    next({ path: redirect, query: {} });
  } else if (!isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes("fromEmail")) {
    // Redirect to login if the route requires authentication and the user is not logged in
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router



