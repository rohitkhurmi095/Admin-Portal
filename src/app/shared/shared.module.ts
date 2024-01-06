import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FeatherIconComponent } from './components/feather-icon/feather-icon.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    FeatherIconComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FeatherIconComponent
  ]
})
export class SharedModule { }
