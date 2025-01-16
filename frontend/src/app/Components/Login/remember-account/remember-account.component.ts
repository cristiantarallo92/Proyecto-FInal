import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remember-account',
  templateUrl: './remember-account.component.html',
  styleUrls: ['./remember-account.component.css']
})
export class RememberAccountComponent implements OnInit {

  constructor( private router:Router ) { }

  ngOnInit(): void {
      this.rememberAccountForm.reset();
      this.loading = false;
      this.showButton = true;
      this.usuario = 'cris';
      this.email = 'cris@cris123.com';
      this.errorMesagge = false;
  }

  usuario: string;
  email: string;
  loading: boolean;
  showButton: boolean;
  errorMesagge: boolean;
  
  rememberAccountForm = new FormGroup({
    user: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email])
  })

  sendRememberAccountForm() :void {
    setTimeout(()=>{
      this.loading = true;
      this.showButton = false;  
      setTimeout(()=>{ 
          console.log('1')
          this.loading = false;
          this.showButton = true; 
          if(this.usuario == this.rememberAccountForm.value.user && this.email == this.rememberAccountForm.value.email){
              console.log('2')
              console.log("redirect" ,  this.rememberAccountForm.value.user,  this.rememberAccountForm.value.email)
              this.router.navigate([''])
           //this.router.navigate(['menu']);
          } else { 
              console.log('3')
              this.rememberAccountForm.reset();
              this.errorMesagge = true;   
          }
      },1000)
    },250)
  }
}  


