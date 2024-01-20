import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SizeComponent } from './size/size.component';
import { TagComponent } from './tag/tag.component';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { ColorComponent } from './color/color.component';
import { CategoryComponent } from './category/category.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    SizeComponent,
    TagComponent,
    BrandLogoComponent,
    ColorComponent,
    CategoryComponent,
    UserTypeComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    NgbModule, //for ng-bootstrap tabs
    NgxDatatableModule //For ngx-datatable
  ]
})
export class MasterModule { 
  constructor(){
    console.log('Master module loaded!');
  }
}
