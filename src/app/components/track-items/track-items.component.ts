import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NotificationsType } from 'src/app/enum/notifications-type.enum';
import { Loan } from 'src/app/model/loan';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-track-items',
  templateUrl: './track-items.component.html',
  styleUrls: ['./track-items.component.css']
})
export class TrackItemsComponent implements OnInit {

  loans: Loan[] = [];
  selectedLoan: Loan = null;

  constructor(private itemService: ItemServiceService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.track();
  }

  public track(){
    this.itemService.track().subscribe(
      (response) => {
        this.loans = response;
      },
      (error) => {
        this.notificationService.notify(NotificationsType.ERROR, "Something went wrong...")
      }
    );
  }

  public onSelectItem(loan: Loan): void{
    this.selectedLoan = loan;
    document.getElementById('openReturnModal'); 
  }

  public returnItem(form: NgForm, loan: Loan){

    if(confirm(`You are going to forward return operation for ${loan.firstName} ${loan.lastName};`+
                `\nItem: ${loan.item.model} (${loan.item.code})` +
                `\n\nVerify your data` +
                `\nBorn at: ${form.value.bornAt}` +
                `\nDate of birth: ${form.value.dateOfBirth}`+
                `\nCity: ${form.value.city}`+
                `\nAddress: ${form.value.address} ${form.value.civicNumber}`
                )){

    const data = new FormData();
    data.append('nome', loan.firstName);
    data.append('cognome', loan.lastName);
    data.append('cittaDiNascita', form.value.bornAt);
    data.append('dataDiNascita', form.value.dateOfBirth);
    data.append('citta', form.value.city);
    data.append('numero', form.value.civicNumber);
    data.append('via', form.value.address);
    data.append('modello', loan.item.model);
    data.append('seriale', loan.item.code);
    data.append('loanId', loan.id.toString());
    data.append('itemId', loan.item.id.toString());

    this.itemService.downloadAndReturn(data).subscribe(
      () => {
        this.notificationService.notify(NotificationsType.SUCCESS, "Operation executed. Check your download directory for the module");
        this.track();
        document.getElementById('return-module-close').click();
      },
      (error) => {
        this.notificationService.notify(NotificationsType.ERROR, error.error.message);
        document.getElementById('return-module-close').click();
      }
    );

  }

  }

}
