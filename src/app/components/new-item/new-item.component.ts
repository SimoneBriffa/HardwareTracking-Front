import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { Item } from 'src/app/model/item';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  constructor(private itemService: ItemServiceService,
              private router: Router, 
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  addItem(item: NgForm){

        const formData = new FormData();
        formData.append('model', item.value.model);
        formData.append('license', item.value.license);
        formData.append('codes', item.value.codes);

        this.itemService.add(formData).subscribe(
          //Primo argomento: cosa fare in caso di successo
          (response: Item[]) =>{
            this.sendNotification(NotificationsType.SUCCESS, `New item(s) added to database`);
            this.router.navigateByUrl('/main');
          },
          //Secondo argomento: cosa fare in caso di errore
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationsType.ERROR, errorResponse.error.message);
          }
      );
    }


  sendNotification(notificationType: NotificationsType, message: string) {
    if(message) 
      this.notificationService.notify(notificationType, message);
    else
      this.notificationService.notify(notificationType, 'AN ERROR OCCURRED, PLEASE TRY AGAIN');
  }


}
