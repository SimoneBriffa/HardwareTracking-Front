import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { Item } from 'src/app/model/item';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit {

  constructor(private itemService: ItemServiceService,
              private notificationService: NotificationService,
              private router: Router) { }

  items: Item[] = [];
  availableItems: Item[] = [];
  selectedItemId: number = -1;

  ngOnInit(): void {
    this.loadAvailableItems();
    }

    public loadAvailableItems(){
      this.itemService.getAll().subscribe(
        (response) => {
          this.items = response;
          for(let item of this.items){
            console.log(item.lent);
            if(!item.lent)
              this.availableItems.push(item);
        }
        });
    }

    public onSelectItem(selectedItemId: number): void{
      this.selectedItemId = selectedItemId;
      document.getElementById('openLoanModal'); //va al pulsante, JavaScript purissimo ((((:
    }

    public lent(info: NgForm, itemId: number){

      if(confirm(`Verify data:\n\n-First Name: ${info.value.firstName}`+
                  `\n-Last Name: ${info.value.lastName}` +
                  `\n-Email: ${info.value.email}` +
                  `\n-Delivery mode: ${info.value.deliveryMode}`)){
      
      const formData= new FormData();
      formData.append('firstName', info.value.firstName);
      formData.append('lastName', info.value.lastName);
      formData.append('email', info.value.email);
      formData.append('deliveryMode', info.value.deliveryMode);
      formData.append('itemId', itemId.toString());

      this.itemService.newLoan(formData).subscribe(
        (response) => {
          this.loadAvailableItems();
          document.getElementById('new-loan-close').click();
          this.notificationService.notify(NotificationsType.SUCCESS, "New loan have been forward");
        },
        (error) => {
          document.getElementById('new-loan-close').click();
          this.notificationService.notify(NotificationsType.ERROR, "Something went wrong...");
        }
      );

      }
    }

    

  }


