import { AfterViewInit, Component, Input } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-feather-icon',
  templateUrl: './feather-icon.component.html',
  styleUrls: ['./feather-icon.component.scss']
})
export class FeatherIconComponent implements AfterViewInit{
  
  //Icon Type
  @Input() icon;

  //Generally this is kept in ngOnInit()
  // but in a parent-child relationship, this will work after child component has been rendered
  ngAfterViewInit(){
    feather.replace();
  }
}
