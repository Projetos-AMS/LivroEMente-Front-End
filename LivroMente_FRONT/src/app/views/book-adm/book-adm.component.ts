import { Component } from '@angular/core';
import { PainelAdmComponent } from "../painel-adm/painel-adm.component";
import { MenuAdmComponent } from "../menu-adm/menu-adm.component";

@Component({
  selector: 'app-book-adm',
  standalone: true,
  imports: [PainelAdmComponent, MenuAdmComponent],
  templateUrl: './book-adm.component.html',
  styleUrl: './book-adm.component.css'
})
export class BookAdmComponent {

}
