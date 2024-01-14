import { Component, OnInit } from '@angular/core';
import { SidebarMenuItemsService } from '../../services/sidebar-menu-items.service';
import { SidebarMenuItem } from '../../interface/sidebar-menu-item';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _sidebarMenuItems:SidebarMenuItemsService, private _authService:AuthService){}

  //Images
  adminUserImage = '/assets/images/dashboard/user.png';
  shoplogoImage = '/assets/images/dashboard/sahosoft-mall-logo.png';

  //userDetails
  userDetails:any;

  MenuItems:SidebarMenuItem[] = [];
  //Perform data binding operations in ngOnInit()
  ngOnInit(){
    //SidebarMenuItems
    this.MenuItems = this._sidebarMenuItems.SIDEBAR_MENU_ITEMS;
    console.log('Sidebar MenuItems: ',this.MenuItems);

    //Get loggedIn userDetails from localStorage
    this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
  }


  //Open Submenu based on 'active' class
  //if active class is applied on parentItem -> apply 'menu-open' class on childItem
  openSubMenu(item:any){
    item.active = !item.active;
  }

  performAction(actionName:string){
    if(actionName === 'logOut'){
      this.logOut();
    }
  }
  
  //LogOut
  logOut(){
    console.log('button clicked!');
    this._authService.logOut();
  }
}
