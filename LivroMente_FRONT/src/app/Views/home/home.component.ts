import { Component, Directive, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NextDirective } from 'src/app/next.directive';
import { PrevDirective } from 'src/app/prev.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

// @Directive({
//   selector: '[appNext],[appPrev]'
// })

export class HomeComponent {
  
  constructor(private el: ElementRef) {
    console.log(this.el.nativeElement)
  }

  nextFunc(){
    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName("item");
    elm.append(item[0]);
    console.log(item)
  }

  prevFunc(){
    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var item = elm.getElementsByClassName("item");
    elm.prepend(item[item.length - 1]);
  }
  
  products = [
    {
      name: 'Livro Rosa',
      price: '10'
    },
    {
      name: 'teste2'
    },
    {
      name: 'teste3'
    },
    {
      name: 'teste4'
    },
    {
      name: 'teste5'
    },
    {
      name: 'teste6'
    },
    {
      name: 'teste7'
    },
    {
      name: 'teste8'
    },
    {
      name: 'teste9'
    }
    ]

}
