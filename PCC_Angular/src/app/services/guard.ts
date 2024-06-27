import { inject } from "@angular/core";
import { Router } from "@angular/router";

// Guard pour le Consul
export const AuthGuardConsul = () => {
  const router = inject(Router);
  let user: any;
  let role: any;

  if (localStorage.getItem("userConnect")) {
    user = JSON.parse(localStorage.getItem("userConnect") || "");
  }
  role = user.user.role;


  if (role !== "ROLE_USER") {
    router.navigateByUrl('/');
    return false;
  }
  return true;
}

// Guard pour le Ministre
export const AuthGuardMinistre = () => {
  const router = inject(Router);
  let user: any;
  let role: any;

  if (localStorage.getItem("userConnect")) {
    user = JSON.parse(localStorage.getItem("userConnect") || "");
  }
  role = user.user.role;
  if (role !== "ROLE_ADMIN") {
    router.navigateByUrl('/');
    return false;
  }

  return true;
}
