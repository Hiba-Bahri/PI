import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  if (localStorage.getItem("userRole")==='admin'){
    return true;
  }else{
    router.navigate(['/login'])
    return false

  }
};

export const authGuardpm:CanActivateFn= (route,state)=>{
  const router = inject (Router)
  if(localStorage.getItem("userRole")==='project manager'){
    return true;
  }else{
    router.navigate(['/login'])
    return false
  }
}
