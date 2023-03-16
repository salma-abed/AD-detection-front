import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { inject } from '@angular/core';

export const haveAccess = (roles?:Array<string>) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if(roles?.length){
    if(roles?.includes(authService?.userRole)){
      return true
    } else {
      router.events
          .subscribe(
            (event: any) => {
              if(event instanceof NavigationEnd) {
                console.log('event.url',event.url);
              }
            });
      console.log("router.url",router.url)
      // return false
      return router.navigate(['/auth/login'],{queryParams:{backUrl:router.url}});
    }
  } else {
    return true
  }
}
