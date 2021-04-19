import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public user: User = new User();

  constructor(private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  this.user = this.authenticationService.getUserFromLocalCache();
  }

  modifyData(user: User): void{
    user.id = this.user.id;
    this.authenticationService.modifyData(user).subscribe(
      response => {
        this.notificationService.notify(NotificationsType.SUCCESS, "Data modified!");
        this.router.navigateByUrl('/main');
      },
      error => {
        this.notificationService.notify(NotificationsType.ERROR, "Something went wrong...");
      }
    );
  }

}
