import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UploadService } from './services/uploadService/upload.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { HeaderComponent } from './views/components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({ declarations: [
        AppComponent,
        NextDirective,
        PrevDirective,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        CommonModule,
        FormsModule], providers: [UploadService, provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()] })
export class AppModule { }
