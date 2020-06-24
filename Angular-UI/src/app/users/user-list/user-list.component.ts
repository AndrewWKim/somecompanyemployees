import { Component,ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UserForTable } from '../shared/user-for-table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles:[]
})
export class UserListComponent implements AfterViewInit{

  columnsToDisplay: string[] = ['FirstName', 'LastName', 'Age', 'Gender', 'Action'];
  dataSource = new MatTableDataSource<UserForTable>();

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  constructor(private service: UserService, 
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.setUsersList();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  setUsersList = () => {
    this.service.getUserForTableList().subscribe(
      result => {
      this.dataSource.data = result as UserForTable[];
    })
  }

  editUser(Id){
    this.router.navigate(['/edit/user',Id]);
  }

  deleteUser(id){
    if (confirm('Are you sure to delete this user ?')) {
      this.service.deleteUser(id).subscribe( data => {
        this.service.getUserForTableList();
        this.setUsersList();
        this.toastr.warning('Deleted successfully', '');
      }
      )
    }
  }

  routeToDetails(Id){
    this.router.navigate(['/user',Id]);
  }

  createNewUser(){
    this.router.navigate(['/create-user']);
  }
}
