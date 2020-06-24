import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../shared/user-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles:[]
})
export class UserFormComponent implements OnInit {
  userForAction= new UserInfo();
  userForm: FormGroup;
  action: any;

  constructor(private fb: FormBuilder,
    private service: UserService,
    private activatedroute:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { 
  }

  ngOnInit() {
    this.getCurrentUserInfo();
    this.generateForm();
    this.activatedroute
      .data
      .subscribe(v => this.action = v);
  }

  getCurrentUserInfo(){
    if (this.router.url == '/create-user'){
      this.userForAction = new UserInfo();
    }
    else{
      let id = +this.activatedroute.snapshot.paramMap.get("id");
      this.service.getUser(id).subscribe((data: any)=>{
        this.userForAction = data;
      });
    }
  }

  generateForm(){
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Patronymic: ['', Validators.required],
      Age: ['',[Validators.required,Validators.min(18),Validators.max(100)]],
      Gender: ['', Validators.required],
      Position: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.userForAction.Id){
      this.userForAction.LastUpdateDate= new Date();
      this.service.putUser(this.userForAction).subscribe(res => {
        this.toastr.success('User edited successfully.');
        this.service.goToMain();
      });
    }
    else{
      this.userForAction.RegistrationDate = new Date();
      this.userForAction.LastUpdateDate = new Date();
      this.service.postUser(this.userForAction).subscribe(res => {
        this.toastr.success('User added successfully.');
        this.service.goToMain();
      });
    }
  }

}
