import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SizeComponent } from './size/size.component';
import { TagComponent } from './tag/tag.component';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { ColorComponent } from './color/color.component';
import { CategoryComponent } from './category/category.component';
import { UserTypeComponent } from './user-type/user-type.component';


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
    MasterRoutingModule
  ]
})
export class MasterModule { }
