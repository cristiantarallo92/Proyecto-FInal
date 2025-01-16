import { Component, OnInit } from '@angular/core';
import { mainManu, profileMenu } from '../../../Models/menuOptions.model'
import { Menu } from 'src/app/Models/menu.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor( private  router:Router) { }
   
  ngOnInit(): void {
  }
  
  menuOps:Menu[] = mainManu;
  profileOps:Menu[] = profileMenu;
}
