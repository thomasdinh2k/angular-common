import { Component, input } from '@angular/core';
import { QuestionBase } from '@/app/components/dynamic-form/model/question-base';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { controlTypeEnum } from '@/app/components/dynamic-form/const/controlType.enum';

@Component({
    selector: 'app-dynamic-form-question',
    imports: [ReactiveFormsModule],
    templateUrl: './dynamic-form-question.html',
    styleUrl: './dynamic-form-question.scss'
})
export class DynamicFormQuestion {
    readonly question = input.required<QuestionBase<string>>();
    readonly form = input.required<FormGroup>();

    get isValid() {
        return this.form().controls[this.question().key].valid;
    }

    protected readonly controlTypeEnum = controlTypeEnum;
}
