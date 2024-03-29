import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './manage/add-product/add-product.component';
import { ProductListComponent } from './manage/product-list/product-list.component';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { 
  constructor(){
    console.log('Products module loaded!');
  }
}
