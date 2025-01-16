import { Component, OnInit } from '@angular/core';
import { RouteService } from './Services/actual-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    showMenu: boolean = true;

    constructor( private  routerService: RouteService, private route:Router) {  }
    
    ngOnInit(): void {
        this.route.events.subscribe( ev => {
            console.log("Evento Router", ev)
        })
    this.routerService.getCurrentRoute().subscribe(route => {
        this.showMenu = !route.includes('login')
    })

    }

} 


