import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent {
  
  //Access ngbNav templateReference variable using @ViewChild()
  @ViewChild('nav') elNav:any;

  //Tab Change 
  //-----------
  onTabChange(event:any){
    if(event.activeId == 'addTab'){
      console.log('Add Tab');
    }else{
      console.log('View Tab');
    }
  }
}
