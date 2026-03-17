import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionControl } from '@/app/components/dynamic-form/services/question-control';
import { QuestionBase } from '@/app/components/dynamic-form/model/question-base';
import { DynamicFormQuestion } from '@/app/components/dynamic-form/components/dynamic-form-question/dynamic-form-question';

/**
 * Dynamic Form Implementation on Angular Docs
 * https://angular.dev/guide/forms/dynamic-forms#
 */
@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, DynamicFormQuestion],
    template: `
        <div>
            <form [formGroup]="form()" (ngSubmit)="onSubmit()">
                @for (question of questions(); track question) {
                    <div class="form-row">
                        <app-dynamic-form-question [question]="question" [form]="form()" />
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
    private readonly qcs = inject(QuestionControl);

    readonly questions = input<QuestionBase<string>[] | null>([]);
    readonly form = computed<FormGroup>(() => this.qcs.toFormGroup(this.questions() as QuestionBase<string>[]));
    payload = '';

    onSubmit(): void {
        console.log(this.form());

        this.payload = JSON.stringify(this.form().getRawValue());
    }
}
