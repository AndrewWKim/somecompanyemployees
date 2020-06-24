import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../shared/user-info';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles:[]
})
export class UserComponent implements OnInit {
  userId = 0;
  currentUserInfo= new UserInfo();

  constructor(private Activatedroute:ActivatedRoute,
    private service: UserService) { }

  ngOnInit() {
    this.userId = +this.Activatedroute.snapshot.paramMap.get("id");
    this.getCurrentUserInfo();
    }

  getCurrentUserInfo(){
    this.service.getUser(this.userId).subscribe((data: any)=>{
        this.currentUserInfo = data;
    })
  }
}
