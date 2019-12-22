import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {

  @HostBinding('class.card') cardClass = true;


}
