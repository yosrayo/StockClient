import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { MustMatch } from '../../_helpers/must-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  user:User;
  users:User[];
  list=[] as any ;
  us=[] as any;
 exist:boolean;
 registerUserData =  {} as any;
 emailid;
 userlogin;
  constructor(private formBuilder: FormBuilder,private userService:UserService ,private router: Router) { }

  
  ngOnInit(): void {

    this.userlogin = new FormGroup({
      emailid: new FormControl(),
      passwd: new FormControl()
   });
    this.user=new User();
this.userService.getUsers().subscribe((res) => {
  this.list = res;
});

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.exist=false;
    
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }else {
        this.user.id=Math.random();
        this.user.firstName=this.firstName;
        this.user.lastName=this.lastName;
        this.user.email=this.email;
        this.user.password=this.password;
        this.user.role="user";
        for(let us of this.list){
        if(this.user.email==us.email){
          alert("email address email exist");
           this.exist=true;
          }
        }
        if(this.exist===false){
          
       
this.userService.create(this.user as User).subscribe(user=>{this.users.push(user)});
alert("ajouter avec succés");
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        //alert('SUCCESS!!');
      console.log(this.registerForm.value);



     window.location.replace("login");
     
   
        }
      
  }
}

 registerUser() {
    this.userService.create(this.registerUserData)
    .subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => console.log(err)
    );

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
