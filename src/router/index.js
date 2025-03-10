import { createWebHistory, createRouter } from 'vue-router'
import useAuthUser from "@/composables/UseAuthUser";


const routes = [
    {
      name: "Home",
      path: '/',
      component: () => import("@/pages/Quiz.vue"), 
      // redirect: '/quiz'
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

  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuthUser();

  // Check if the user is navigating to a specific route
  if (to.query.redirect_to) {
    // Navigate to the intended route specified in the redirect_to query parameter
    next({ path: to.query.redirect_to });
  } else if (!isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes("fromEmail")) {
    // Redirect to login if the route requires authentication and the user is not logged in
    next({ name: "Login" });
  } else {
    next();
  }
})
export default router



