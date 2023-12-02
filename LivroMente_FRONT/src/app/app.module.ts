import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Views/header/header.component';
import { NextDirective } from './next.directive';
import { PrevDirective } from './prev.directive';
import { UploadService } from './upload.service';
import { CadastroLivroComponent } from './Views/cadastro-livro/cadastro-livro.component';

@NgModule({
  declarations: [
    AppComponent,
    NextDirective,
    PrevDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HeaderComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
