import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { NewLoanComponent } from './components/new-loan/new-loan.component';
import { RegisterComponent } from './components/register/register.component';
import { TrackItemsComponent } from './components/track-items/track-items.component';
import { HistoryComponent } from './components/history/history.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthenticationGuard]},
  {path: 'items', component: ItemsComponent, canActivate: [AuthenticationGuard]},
  {path: 'newItem', component: NewItemComponent, canActivate: [AuthenticationGuard]},
  {path: 'newLoan', component: NewLoanComponent, canActivate: [AuthenticationGuard]},
  {path: 'trackItems', component: TrackItemsComponent, canActivate: [AuthenticationGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthenticationGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthenticationGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
