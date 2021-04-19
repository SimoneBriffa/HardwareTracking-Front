import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public onLogOut(): void{
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationsType.SUCCESS, `You've been logged out succesfully`);
  }

  private sendNotification(notificationType: NotificationsType, message: string): void{
    if(message)
      this.notificationService.notify(notificationType, message);
    else
      this.notificationService.notify(notificationType, 'An error occurred. Please try again');
  }

}
