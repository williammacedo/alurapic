import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, filter, switchMap, map, first } from 'rxjs/operators'

import { SignUpService } from './signup.service';
import { query } from '@angular/core/src/render3/query';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) { }

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
            .valueChanges
            .pipe(debounceTime(300), filter(query => query.length > 2))
            .pipe(switchMap(username => {
                return this.signUpService.checkUserNameTaken(username);
            }))
            .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
            .pipe(first());
        }
    }
}