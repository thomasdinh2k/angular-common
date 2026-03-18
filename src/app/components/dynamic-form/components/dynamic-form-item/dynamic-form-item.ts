import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { controlTypeEnum } from '@/app/components/dynamic-form/const/controlType.enum';
import { FormItemBase } from '../../model/FormItem.base';

@Component({
    selector: 'app-dynamic-form-item',
    imports: [ReactiveFormsModule],
    templateUrl: './dynamic-form-item.html',
    styleUrl: './dynamic-form-item.scss'
})
export class DynamicFormItem {
    readonly formItem = input.required<FormItemBase<string>>();
    readonly form = input.required<FormGroup>();

    get isValid() {
        return this.form().controls[this.formItem().key].valid;
    }

    protected readonly controlTypeEnum = controlTypeEnum;
}
