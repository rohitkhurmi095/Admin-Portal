import { Injectable } from '@angular/core';
import { SidebarMenuItem } from '../interface/sidebar-menu-item';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuItemsService {

  constructor() { }

  //Note: This is service to get dynamic data (JSON form) for Sidebar Menu
  //In RealWorld applications this data may come from WebApi also
  //Get data from SideBar-Menu-Item Service and bind in SidebarComponent
  SIDEBAR_MENU_ITEMS:SidebarMenuItem[] = [
    
    //Dashboard
    {title:'Dashboard',icon:'home',active:true,type:'link',path:'dashboard'},
    
    //Master
    {title:'Master',icon:'clipboard',active:false,type:'menu',children:[
      {title:'Brand Logo',type:'link',path:'master/brand-logo'},
      {title:'Size',type:'link',path:'master/size'},
      {title:'Tag',type:'link',path:'master/tag'},
      {title:'Color',type:'link',path:'master/color'},
      {title:'Category',type:'link',path:'master/category'},
      {title:'User Type',type:'link',path:'master/user-type'}
    ]},

    //Products
    {title:'Products',icon:'box',active:false,type:'menu',children:[
      {title:'Manage',active:false,type:'menu',children:[
        {title:'Product List',type:'link',path:'products/manage/product-list'},
        {title:'Add Product',type:'link',path:'products/manage/add-product'}
      ]}
    ]},

    //Users
    {title:'Users',icon:'user-plus',active:false,type:'menu',children:[
      {title:'User List',type:'link',path:'users/user-list'},
      {title:'Add User',type:'link',path:'users/add-user'}
    ]},

    //Sales
    {title:'sales',icon:'dollar-sign',active:false,type:'menu',children:[
      {title:'orders',type:'link',path:'sales/orders'},
      {title:'transactions',type:'link',path:'sales/transactions'},
    ]},
 
    //Settings
    {title:'Settings',icon:'settings',active:false,type:'menu',children:[
      {title:'Profile',type:'link',path:'settings/profile'},
    ]},

    //Invoice
    {title:'Invoice',icon:'archive',active:false,type:'link',path:'invoice'},
    
    //Reports
    {title:'Reports',icon:'bar-chart',active:false,type:'link',path:'reports'},

    //LogOut
    {title:'LogOut',icon:'log-out',active:false,type:'link',path:'auth/login'},
  ]

}
