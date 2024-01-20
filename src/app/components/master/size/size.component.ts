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
  objRows:[] = [];
  //Single Data
  objRow:any;

  //TestData -----------------------------------------
  testRows = [
    {"id":1,"name": "1AC","createdOn": "20/01/2024"},
    {"id":2,"name": "2AC","createdOn": "07/12/2019"},
    {"id":3,"name": "3AC","createdOn": "07/12/2019"},
    {"id":4,"name": "4AC","createdOn": "07/12/2019"},
    {"id":5,"name": "5AC","createdOn": "07/12/2019"},
    {"id":6,"name": "6AC","createdOn": "07/12/2019"}
  ];
  testRow:any;
  //---------------------------------------------------

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
      case DbOperations.Create:
        //Call Delete API here!
        console.log(this.fData.value);
        //Reset formData after add/update record
        this.resetFormData();
        break;
      case DbOperations.Update:
        //Call Update API here!
        console.log(this.fData.value);
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
    this.testRow = this.testRows.find(x=>x.id === id);
    //fill the record details in form
    this.fData.patchValue({
      name: this.testRow.name
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
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
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
  }

  //Tab Change 
  onTabChange(event:any){
    //Reset formData
    this.resetFormData();
  }

  ngOnDestroy(): void {
    this.testRows = null;
    this.testRow = null;
  }
}
