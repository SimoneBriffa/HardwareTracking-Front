import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Loan } from 'src/app/model/loan';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { Item } from 'src/app/model/item';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: Loan[] = [];
  items: Item[] = [];
  itemForHistory: Item;

  constructor(private itemService: ItemServiceService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadHistory();
    this.loadItems();
  }

  public loadItems(): void{
    this.itemService.getAll().subscribe(
      (response) => this.items = response
    );
  }

  public loadHistory(): void{
    this.itemService.generalHistory().subscribe(
      (response) => {
        this.history = response;
      },
      (error) => {
        this.notificationService.notify(NotificationsType.ERROR, error.error.message);
      }
    );
  }

  downloadHistory(){
    this.itemService.downloadHistory().subscribe(
      (response) => {
        this.notificationService.notify(NotificationsType.SUCCESS, "Operation executed. Check your download directory!");
      },
      (error) => {
        this.notificationService.notify(NotificationsType.ERROR, error.error.message);
      }
    );
  }

  downloadItemHistory(item: Item){
    this.itemService.itemHistory(item.id).subscribe(
      (response) => {
        this.notificationService.notify(NotificationsType.SUCCESS, "Operation executed. Check your download directory!")
      },
      (error) => {
        this.notificationService.notify(NotificationsType.ERROR, error.error.message);
      }
    ); 
  } 

}
