import { Component, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [FontAwesomeModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faUserCircle = faUserCircle;
}
