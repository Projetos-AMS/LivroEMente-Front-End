import { Component } from '@angular/core';
import { MenuAdmComponent } from "../menu-adm/menu-adm.component";

@Component({
  selector: 'app-painel-adm',
  standalone: true,
  imports: [MenuAdmComponent],
  templateUrl: './painel-adm.component.html',
  styleUrl: './painel-adm.component.css'
})
export class PainelAdmComponent {

}
