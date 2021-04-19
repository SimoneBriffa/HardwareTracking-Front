import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationsType } from '../enum/notifications-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }

  public notify(type: NotificationsType, message: string){
    this.notifier.notify(type, message);
  }



}
