import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function uniqueInListValidator(propertyToCheck:string): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) 
            return null;

        let hasDuplicate =false;
        const listToCheck:string[] = value.map((val:any) => val[propertyToCheck] );

        listToCheck.forEach(val =>{
           const result = listToCheck.filter(element => element === val);
           if(result.length>1)
            hasDuplicate =true;
        })

        return hasDuplicate ? {hasDuplicate:true}: null;
    }
}