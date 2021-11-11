import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  phone: number;
  address: string;
  email: string;
  password: string;
  user:User;
  list=[] as any ;
 exist:boolean;
 registerUserData =  {} as any;

  constructor(private formBuilder: FormBuilder,private userService:UserService ,private router: Router) { }

  
  ngOnInit(): void {
    this.user=new User();
    
this.userService.getUsers().subscribe((res) => {
  this.list = res;
});

  }
 
  

 registerUser() {
 
    this.userService.create(this.registerUserData)
    .subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => console.log(err)
    );

    alert("ajouter avec succés");
  }

  
}
