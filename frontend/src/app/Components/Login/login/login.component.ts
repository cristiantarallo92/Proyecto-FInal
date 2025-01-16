import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
 constructor( private router: Router, private loginService: LoginService) { 

 }

 usuario: string;
 password: string;
 loading: boolean;
 showButton: boolean;
 errorMesagge: boolean;
 userLogged: any;

  ngOnInit(): void { 
      this.loginForm.reset();
      this.loading = false; 
      this.showButton = true;
      this.usuario = "cris";
      this.password = "cris123";
      this.errorMesagge = false; 
  }

  loginForm = new FormGroup({
  user: new FormControl('',[Validators.required]),
  pass: new FormControl('',[Validators.required])
  });

   sendLoginForm() {
    this.loading = true;  
    this.showButton = false;
    this.router.navigate(['menu']);
    setTimeout(()=>{
        this.loginService.getUser(this.loginForm.value.user).then(res => {
            this.loading = false;  
            this.showButton = true;
            if(res[0].username == this.loginForm.value.user && res[0].userpass == this.loginForm.value.pass) {
                this.router.navigate(['menu']);
            } else {
                this.errorMesagge = true;
            }
        }).catch(() =>{
            this.showButton = true;
            this.loading = false;  
            this.errorMesagge = true;
        })
    },2000)    
  } 
  
}  

