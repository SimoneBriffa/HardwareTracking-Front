import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication-service.service';
import { NotificationService } from './services/notification.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgControl } from '@angular/forms';
import { NotificationModule } from './notification.module';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemsComponent } from './components/items/items.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { NewLoanComponent } from './components/new-loan/new-loan.component';
import { TrackItemsComponent } from './components/track-items/track-items.component';
import { HistoryComponent } from './components/history/history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    ItemsComponent,
    SidebarComponent,
    NewItemComponent,
    NewLoanComponent,
    TrackItemsComponent,
    HistoryComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NotificationService, AuthenticationService, AuthenticationGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
