import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormItemBase } from './model/FormItem.base';
import { DynamicFormItem } from './components/dynamic-form-item/dynamic-form-item';
import { FormItemControl } from './services/question-control';

/**
 * Dynamic Form Implementation on Angular Docs
 * https://angular.dev/guide/forms/dynamic-forms#
 */
@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, DynamicFormItem],
    template: `
        <div>
            <form [formGroup]="form()" (ngSubmit)="onSubmit()">
                @for (item of formItems(); track item) {
                    <div class="form-row">
                        <app-dynamic-form-item [formItem]="item" [form]="form()" />
                    </div>
                }

                <div class="form-row mt-5">
                    <button class=" outline cursor-pointer" type="submit" [class.text-red-700]="!form().valid" [disabled]="!form().valid">Save</button>
                </div>
            </form>

            @if (payload) {
                <div class="form-row">
                    <strong>Saved the following values</strong> <br />
                    {{ payload }}
                </div>
            }
        </div>
    `
})
export class DynamicForm {
    private readonly qcs = inject(FormItemControl);

    readonly formItems = input<FormItemBase<string>[] | null>([]);
    readonly form = computed<FormGroup>(() => this.qcs.toFormGroup(this.formItems() as FormItemBase<string>[]));
    payload = '';

    onSubmit(): void {
        console.log(this.form());

        this.payload = JSON.stringify(this.form().getRawValue());
    }
}
