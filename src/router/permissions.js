import Router from "./index";
import { getToken } from "@/unitls/cookies";
Router.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  } else {
    if (to.name === "Login") {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});
