import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-noresults',
  templateUrl: './noresults.component.html',
  styleUrls: ['./noresults.component.css']
})
export class NoresultsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const image : HTMLElement = document.getElementById('iconShow') ;
    image.innerHTML += this.icon;
  }

  @Input() item: string;
  @Input() icon: string;
}
