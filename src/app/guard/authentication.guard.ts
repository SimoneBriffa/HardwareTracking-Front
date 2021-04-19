import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsType } from '../enum/notifications-type.enum';

import { AuthenticationService } from '../services/authentication-service.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})

/*Per creare questa classe bisogna chiamare ng g guard /guard/authentication --skipTests;
skipTests non è importante, evita solo di creare il file .js di test, appunto. 

Questa è la classe per la restrizione degli accessi */


export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, 
              private router: Router, 
              private notificationService: NotificationService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }
  
  private isUserLoggedIn(): boolean {
      if(this.authenticationService.isLoggedIn())
        return true;
      else{
        this.router.navigate(['/login']);
        this.notificationService.notify(NotificationsType.ERROR, 
                `You need to log in to access this page`.toUpperCase());
        return false;
      }
  }

}
