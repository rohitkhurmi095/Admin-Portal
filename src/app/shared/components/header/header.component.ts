import { Component } from '@angular/core';
import { CollapseSidebarService } from '../../services/collapse-sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public _collapseSidebarService:CollapseSidebarService){}

  adminUserImage = '/assets/images/dashboard/user.png';
  shoplogoImage = '/assets/images/dashboard/sahosoft-mall-logo.png';

  
  //collapseSidebar based on click on 'align-left' icon in header
  collapseSidebar(){
    this._collapseSidebarService.collapseSidebar = !this._collapseSidebarService.collapseSidebar;
  }

  //TogglerHeaderOptions based on click on 'more-horizontal' icon in Mobile View
  showHeaderOptions: boolean = false;
  toggleHeaderOptions(){
    this.showHeaderOptions = !this.showHeaderOptions;
  }
}
