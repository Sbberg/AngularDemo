import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


//the messageService property must be public because we are going to bind it in the HTML. Angular only binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
