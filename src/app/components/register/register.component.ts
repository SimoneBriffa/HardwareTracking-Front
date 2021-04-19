import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn())
      this.router.navigateByUrl('/main');
  }

  public onRegister(user: User): void{
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        //Primo argomento: cosa fare in caso di successo
        (response: User) =>{
          this.showLoading = false;
          this.sendNotification(NotificationsType.SUCCESS, `SISTEMIIIIISTAAAAAAAA`);
          this.router.navigateByUrl('/login');
        },
        //Secondo argomento: cosa fare in caso di errore
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationsType.ERROR, "Format errors...");
          this.showLoading = false;
        }
      )
    );
  }

  sendNotification(notificationType: NotificationsType, message: string) {
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
