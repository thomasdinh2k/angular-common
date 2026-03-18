import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DropdownFormItem } from '../controls/dropdown';
import { TextBoxFormItem } from '../controls/text-box';
import { FormItemBase } from '../model/FormItem.base';

@Injectable({
    providedIn: 'root'
})
export class FormItemService {

    getFormItems() {
        const formitems: FormItemBase<string>[] = [
            new DropdownFormItem({

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

            new TextBoxFormItem({
                key: 'firstName',
                label: 'First Name',
                value: 'Thomas',
                required: true,
                order: 1
            }),

            new TextBoxFormItem({
                key: 'emailAddress',
                label: 'Email',
                type: 'email',
                order: 2
            })
        ];

        return of(formitems.sort((a, b) => a.order - b.order));
    }
}
