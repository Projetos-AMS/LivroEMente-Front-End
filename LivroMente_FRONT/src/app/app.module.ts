import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Views/header/header.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { AuthGuard } from './account/shared/auth.guard';

import { httpInterceptorProviders } from './http-interceptors';

// import { AccountService } from './account/shared/account.service';
// import { accountGuard } from './account/shared/account.guard';

@NgModule({
  declarations: [
    AppComponent,
    NextDirective,
    PrevDirective,
  //  AccountService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    HeaderComponent,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthGuard,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
