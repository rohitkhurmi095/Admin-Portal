import { Component, OnInit } from '@angular/core';
import { CollapseSidebarService } from '../../services/collapse-sidebar.service';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public _collapseSidebarService:CollapseSidebarService, private _authService:AuthService){}

  adminUserImage = '/assets/images/dashboard/user.png';
  shoplogoImage = '/assets/images/dashboard/sahosoft-mall-logo.png';

  //userDetails
  userDetails:any;
  
  ngOnInit(){
    //Get loggedIn userDetails from localStorage
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  }

  //collapseSidebar based on click on 'align-left' icon in header
  collapseSidebar(){
    this._collapseSidebarService.collapseSidebar = !this._collapseSidebarService.collapseSidebar;
  }

  //TogglerHeaderOptions based on click on 'more-horizontal' icon in Mobile View
  showHeaderOptions: boolean = false;
  toggleHeaderOptions(){
    this.showHeaderOptions = !this.showHeaderOptions;
  }
  
  //LogOut
  logOut(){
    this._authService.logOut();
  }
}
