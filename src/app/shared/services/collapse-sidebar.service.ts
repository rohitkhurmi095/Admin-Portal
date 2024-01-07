import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollapseSidebarService {
  constructor() { }
 
  //collapseSidebar based on click on 'align-left' icon in header
  //Note: we have collapse Sidebar icon on header component 
  //based on click of this icon class needs to be applied on 'div: page-sidebar' of LayoutComponent and 'div: page-main-header' of HeaderComponent
  //thats why this service is used for communication between these 2 components
  //based on this value - add/remove 'open' class from these 2 div's
  //open class = hide | no open class = show 
  collapseSidebar:boolean = false;
}
