import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

public user: User = new User();

  constructor(private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private router: Router) { }

ngOnInit(): void {
  this.user = this.authenticationService.getUserFromLocalCache();
}

}
