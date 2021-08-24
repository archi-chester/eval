import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {RestService} from '../rest.service';
import {Observable} from 'rxjs';
import {Button1} from '../interfaces';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  buttons: Observable<Button1[]>;

  constructor(private restService: RestService) {
    this.buttons = this.restService.getButton();
  }

  ngOnInit(): void {
  }

  public eventText(button1: any): void {
    this.newItemEvent.emit(button1);
  }

}
