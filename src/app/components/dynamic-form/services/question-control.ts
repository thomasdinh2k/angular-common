import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormItemBase } from '../model/FormItem.base';

@Injectable({
    providedIn: 'root'
})
export class FormItemControl {
    toFormGroup(formitems: FormItemBase<string>[]): FormGroup {
        const group: any = {};

        formitems.forEach(formitem => {
            group[formitem.key] = formitem.required
                ? new FormControl(formitem.value || '', Validators.required)
                : new FormControl(formitem.value);
        })

        return new FormGroup(group);
    }
}
