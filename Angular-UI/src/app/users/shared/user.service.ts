import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Location} from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl= environment.apiUrl;

  constructor(private http:HttpClient, private location: Location, private router: Router) { }

  getUserForTableList(){
    return this.http.get(this.rootUrl+"/users");
  }

  getUser(id){
    return this.http.get(this.rootUrl+"/users/user/"+id);
  }

  postUser(user){
    return this.http.post(this.rootUrl+"/users",user);
  }

  putUser(user){
    return this.http.put(this.rootUrl+"/users/"+ user.Id,user);
  }

  deleteUser(id){
    return this.http.delete(this.rootUrl+"/users/"+id);
  }

  goBack() {
    this.location.back();
  }

  goToMain(){
    this.router.navigate(['./users']);
  }
}