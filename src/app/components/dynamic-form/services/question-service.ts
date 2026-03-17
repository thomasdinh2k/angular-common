import { Injectable } from '@angular/core';
import { QuestionBase } from '@/app/components/dynamic-form/model/question-base';
import { DropdownQuestion } from '@/app/components/dynamic-form/controls/dropdown-question';
import { TextBoxQuestion } from '@/app/components/dynamic-form/controls/text-box-question';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    getQuestions() {
        const questions: QuestionBase<string>[] = [
            new DropdownQuestion({
                key: 'favouriteAnimal',
                label: 'Favourite Animal',
                options: [
                    { key: 'cat', value: 'Cat' },
                    { key: 'dog', value: 'Dog' },
                    { key: 'horse', value: 'Horse' },
                    { key: 'capybara', value: 'Capybara' }
                ],
                required: true,
                order: 3,
            }),

            new TextBoxQuestion({
                key: 'firstName',
                label: 'First Name',
                value: 'Thomas',
                required: true,
                order: 1
            }),

            new TextBoxQuestion({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
            })
        ];

        return of(questions.sort((a, b) => a.order - b.order));
    }
}
