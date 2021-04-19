import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn())
      this.router.navigateByUrl('/main');
    else
      this.router.navigateByUrl('/login');
  }

  public onLogin(user: User): void{
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        //Primo argomento: cosa fare in caso di successo
        (response: HttpResponse<User>) =>{
          const token = response.headers.get('Jwt-Token');
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/main');
          this.showLoading = false;
        },
        //Secondo argomento: cosa fare in caso di errore
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationsType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  sendErrorNotification(notificationType: NotificationsType, message: string) {
    if(message) 
      this.notificationService.notify(notificationType, message);
    else
      this.notificationService.notify(notificationType, 'AN ERROR OCCURRED, PLEASE TRY AGAIN');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    //come dire for(Subscription sub: subscriptions) { sub.unsuscribe }
  }

}
