import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login: string;
loginForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  user: User;
  users:User[];
  b=false;
  h: any;
  g:any;
  list:User[];
  gr=false;
  constructor(private router: Router  ,private userService:UserService) { }

  ngOnInit(): void {
    this.userService .getUsers().subscribe((res) => {
      this.list = res;
    });
    this.user= new User();
    this.getUsers();
    
  }
  getUsers()
  {
    this.userService.getUsers().subscribe(users => this.users = users);
    console.log("jjj", this.users);
  }

  get f() { return this.loginForm.controls; }
  
  
  
  connexion()

  {
   
for(let us of this.users)
{
  
 
  if((this.user.email==us.email)&&(this.user.password==us.password))
 { 
this.b=true;
this.h = us ;

localStorage.setItem("nom",JSON.stringify(this.h.role));


 }

}
    if((!this.b)||(JSON.parse(localStorage.getItem('role'))!='user'))
    {
      alert("compte non reconnu!");
      window.location.replace("login")
    }
 
    else {
      if(JSON.parse(localStorage.getItem('role'))=='user')
    {
   window.location.replace("home") 


  }

    }
  }


}
