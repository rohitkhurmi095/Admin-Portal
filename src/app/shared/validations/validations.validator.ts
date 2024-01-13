//====================================
//Custom Validations in ReactiveForms
//====================================
//Note:
// only alphanumeric & space : /^[0-9a-zA-Z ]+$/
// only numbers : /[0-9]+/
// char & space only : /^[a-zA-Z ]+$/
// Email Validation : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/

import { FormControl,FormGroup } from "@angular/forms";

//--------------------------------
//1. Alphanumeric Fields Validator 
//--------------------------------
//alphanumeric fields + space
export class alphanumericFieldValidator{
    static validAlphanumericField(fc:FormControl){
        if(fc.value!=undefined && fc.value!=null && fc.value!=''){
            const regx = /^[0-9a-zA-Z ]+$/;
            if(regx.test(fc.value)){
                return null;
            }else{
                return {validAlphanumericField:true};
            }
        }else{
            return null;
        }
    }
}

//----------------------------
//2. Numeric Field Validator 
//--------------------------
//only numeric fields
export class numericFieldValidator{
    static validNumericField(fc:FormControl){
        if(fc.value!=undefined && fc.value!=null && fc.value!=''){
            const regx = /[0-9]+/;
            if(regx.test(fc.value)){
                return null;
            }else{
                return {validNumericField:true};
            }
        }else{
            return null;
        }
    }
}

//-----------------------------
//3. Character Field Validator 
//-----------------------------
//only character field + space
export class characterFieldValidator{
    static validCharacterField(fc:FormControl){
        if(fc.value!=undefined && fc.value!=null && fc.value!=''){
            const regx = /^[a-zA-Z ]+$/;
            if(regx.test(fc.value)){
                return null;
            }else{
                return {validCharacterField:true};
            }
        }else{
            return null;
        }
    }
}

//-------------------------
//4. Email Field Validator
//-------------------------
export class emailFieldValidator{
    static validEmailField(fc:FormControl){
        if(fc.value!=undefined && fc.value!=null && fc.value!=''){
            const regx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
            if(regx.test(fc.value)){
                return null;
            }else{
                return {validEmailField:true};
            }
        }else{
            return null;
        }
    }
}

//---------------------------
//5. No WhiteSpace Validator 
//---------------------------
export class noWhiteSpaceValidator{
    static validNoWhiteSpace(fc:FormControl){
        if(fc.value!=undefined && fc.value!=null && fc.value!=''){
            var trimmedString = fc.value.toString().trim();
              
            if(trimmedString.length === 0){
                return null;
            }else{
                return {validNoWhiteSpace:true};
            }
        }else{
            return null;
        }
    }
}

//-----------------------
//6. MustMatch Validator
//-----------------------
export function mustMatchValidator(fc1Name:string,fc2Name:string){
    return(fg:FormGroup)=>{
        //Get formControlInstance from formControlName and FormGroup instance
        const fc1 = fg.controls[fc1Name];  //password
        const fc2 = fg.controls[fc2Name]; //confirmPassword

        //Don't check for this validation if 2nd Field(ConfirmPassword already has some other error)
        if(fc2.errors && !fc2.errors['mustMatch']){
            return null;
        }

        //check validation
        if(fc1.value == fc2.value){
            fc2.setErrors(null);
        }else{
            fc2.setErrors({mustMatch:true});
        }
    }
}
