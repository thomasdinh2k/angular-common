import { Injectable } from '@angular/core';
import { QuestionBase } from '@/app/components/dynamic-form/model/question-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class QuestionControl {
    toFormGroup(questions: QuestionBase<string>[]): FormGroup {
        const group: any = {};

        questions.forEach(question => {
            group[question.key] = question.required
                ? new FormControl(question.value || '', Validators.required)
                : new FormControl(question.value);
        })

        return new FormGroup(group);
    }
}
