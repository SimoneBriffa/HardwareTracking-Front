import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { Item } from 'src/app/model/item';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];

  constructor(private itemService: ItemServiceService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAll(true);
  }

  public getAll(showNotification: boolean): void{
    this.itemService.getAll().subscribe(
      (response: Item[]) => {
        this.items = response;
        if(showNotification)
            this.sendNotification(NotificationsType.SUCCESS, `${response.length} items loaded`);
      },
      (error) => {
        this.sendNotification(NotificationsType.ERROR, error.error.message);
      }
    );

    }

    public delete(id: number): void{
      if(confirm("Are you sure?")){
      this.itemService.delete(id).subscribe( 
        () => {
          this.sendNotification(NotificationsType.SUCCESS, "Item deleted");
          this.getAll(false);
      }); 
    }
    }


    private sendNotification(notificationType: NotificationsType, message: string): void{
      if(message)
        this.notificationService.notify(notificationType, message);
      else
        this.notificationService.notify(notificationType, 'An error occurred. Please try again');
    }
    /*
    public delete(id: number){
      this.itemService.delete(id).subscribe( 
        (response) =>  {
          this.sendNotification(NotificationsType.SUCCESS, "Item Deleted Succesfully");
          this.getAll(false);
        },
        (error) =>{
          this.sendNotification(NotificationsType.ERROR, error.error.message);
        });
          
    } */


  }


 