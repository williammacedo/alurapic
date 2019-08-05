import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {
    const valor = control.value;
    
    if(valor.trim() && !/^[a-z0-9_\-]+$/.test(valor)) {
        return {lowerCase: true};
    }
    return null;
}