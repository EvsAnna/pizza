import {Component, ContentChild, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'custom-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent{
  @Input() title:string = '';

  constructor() { }

  toUpper() {
    return this.title.toUpperCase();
  }

  toLower() {
    return this.title.toLowerCase();
  }

}
