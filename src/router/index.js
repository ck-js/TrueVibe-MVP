import { createWebHistory, createRouter } from 'vue-router'
import useAuthUser from "@/composables/UseAuthUser";


const routes = [
    {
      name: "Home",
      path: '/', 
      redirect: '/quiz'
    },
    {
      name: "quiz",
      path: "/quiz",
      component: () => import("@/pages/Quiz.vue"),
    },
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
router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Login" };
  }
})
export default router









