import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  payam = "Borge";
  constructor() { }

  ngOnInit(): void {
    this.openMail(this.payam);
    
  }

   myFunc(id:any) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show"; 
      x.previousElementSibling.className += " w3-red";
    } else { 
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" w3-red", "");
    }
  }
   openMail(personName:any) {
    this.payam = personName;
    var i;
    var x = document.getElementsByClassName("person");
    for (i = 0; i < x.length; i++) {
      (<HTMLElement>x[i]).style.display = "none";
    }
    x = document.getElementsByClassName("test");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" w3-light-grey", "");
    }
    document.getElementById(personName).style.display = "block";
    
  }

}
