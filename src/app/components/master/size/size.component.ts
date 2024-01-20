import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { DbOperations } from 'src/app/shared/utility/db-operations';
import { Global } from 'src/app/shared/utility/global';
//custom validation
import { characterFieldValidator, noWhiteSpaceValidator } from 'src/app/shared/validations/validations.validator';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit,OnDestroy {
  
  //Access ngbNav templateReference variable using @ViewChild()
  @ViewChild('nav') elNav:any;

  componentName:string = "Size Master";

  //FormGroupInstance
  fData:FormGroup;

  //Button Text | DbOperations
  buttonText:string;
  dbOpeartion:DbOperations;

  //All Data
  objRows:any[] = [];
  //Single Data
  objRow:any;

  constructor(private _fb:FormBuilder,private _httpService:HttpService,private _toastr:ToastrService){}
  
  ngOnInit(){
    this.setFormData();
    this.getAllData();
  }

  //Model to add/update formData
  setFormData(){
    //Set ButtonText | DbOperation
    this.buttonText = "Add";
    this.dbOpeartion = DbOperations.Create;

    //formModel
    this.fData = this._fb.group({
      id:[0],
      name:['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(6),noWhiteSpaceValidator.validNoWhiteSpace,characterFieldValidator.validCharacterField])]
    })
  }

  //Reset formDta
  resetFormData(){
    this.fData.reset({
      id:0,
      name:''
    });

    //Reset ButtonText | DbOperation
    this.buttonText = "Add";
    this.dbOpeartion = DbOperations.Create;

    //Call GetAllRecords API again with refreshed data
    this.getAllData();

    //change from 'addTab' -> 'viewTab'
    this.elNav.select('viewTab');
  }

  //Getter method for formControls
  get formControls(){
    return this.fData.controls;
  }

  //______
  //Submit (Add/Update)
  //______
  submit(){
    //if form is invalid -> do nothing
    if(!this.fData.valid){
      return;
    }

    //Calling API -> add/Update
    switch(this.dbOpeartion){

      //Add
      //----
      case DbOperations.Create:
        //Call Save API here!
        this._httpService.post(Global.BASE_API_URL+'SizeMaster/Save/',this.fData.value).subscribe(res=>{
          if(res.isSuccess){
            this._toastr.success("Record Saved Successfully!",this.componentName);
            //Reset formData, including refreshing all data after adding record
            this.resetFormData();
          }else{
            this._toastr.error(res.error,this.componentName);
          }
        });
        break;

      //Update
      //-------
      case DbOperations.Update:
        //Call Update API here!
        this._httpService.post(Global.BASE_API_URL+'SizeMaster/Update/',this.fData.value).subscribe(res=>{
          if(res.isSuccess){
            this._toastr.success("Record Updated Successfully!",this.componentName);
            //Reset formData, including refreshing all data after adding record
            this.resetFormData();
          }else{
            this._toastr.error(res.error,this.componentName);
          }
        });
        //Reset formData after add/update record
        this.resetFormData();
        break;
    }
  } 

  //_____
  //Edit
  //_____
  edit(id:number){
    //Set ButtonText | DbOperation
    this.buttonText = "Update";
    this.dbOpeartion = DbOperations.Update;

    //Find the singleData by Id from objRows
    this.objRow = this.objRows.find(x=>x.id === id);
    //fill the record details in form
    this.fData.patchValue({
      id: this.objRow.id,
      name: this.objRow.name
    });

    //Open Add/Edit View (addTab)
    this.elNav.select('addTab');
  }

  //_______
  //Delete
  //_______
  delete(id:number){
    //sweetaler2 modal
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger mx-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //Call Delete API here!
        this._httpService.post(Global.BASE_API_URL+"SizeMaster/Delete/",{id:id}).subscribe(res=>{
          console.log(res.Data);
          if(res.IsSuccess){
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            //Call GetAllRecords API again with refreshed data
            this.getAllData();
          }else{
            this._toastr.error(res.Errors,this.componentName);
          }
        })
      } 
      else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your record is safe :)",
          icon: "error"
        });
      }
    });
  }

  //_______
  //Cancel
  //_______
  cancel(){
    //Reset formData
    this.resetFormData();
  }


  //_______
  //Get All
  //_______
  getAllData(){
    //Call GetAll API here!
    this._httpService.get(Global.BASE_API_URL+'SizeMaster/GetAll').subscribe(res=>{
      if(res.isSuccess){
        this.objRows = res.data;
      }else{
        this._toastr.error(res.errors,this.componentName);
      }
    });
  }

  //Tab Change 
  onTabChange(event:any){
    //Reset formData
    this.resetFormData();
  }

  ngOnDestroy(): void {
    this.objRows = null;
    this.objRow = null;
  }
}
