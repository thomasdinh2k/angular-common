import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DropdownFormItem } from '@/app/components/dynamic-form/controls/dropdown';
import { TextBoxFormItem } from '@/app/components/dynamic-form/controls/text-box';
import { FormItemBase } from '@/app/components/dynamic-form/model/FormItem.base';

@Injectable({
    providedIn: 'root'
})
export class CustomerExperienceSurveyService {
    getFormItems() {
        const formItems = this.buildFormItems();

        return of(formItems);
    }

    getFormConfigCode() {
        const formItems = this.buildFormItems();
        const entries = formItems
            .map((formItem) => {
                const formItemType = formItem.controlType === 'dropdown' ? 'DropdownFormItem' : 'TextBoxFormItem';
                const properties = [
                    `key: '${formItem.key}'`,
                    `label: '${this.escapeString(formItem.label)}'`,
                    ...(formItem.type ? [`type: '${formItem.type}'`] : []),
                    ...(formItem.required ? ['required: true'] : []),
                    `order: ${formItem.order}`,
                    ...(formItem.options?.length
                        ? [
                              `options: [\n${formItem.options
                                  .map((option) => `            { key: '${option.key}', value: '${this.escapeString(option.value)}' }`)
                                  .join(',\n')}\n        ]`
                          ]
                        : [])
                ];

                return `    new ${formItemType}({\n        ${properties.join(',\n        ')}\n    })`;
            })
            .join(',\n');

        return [
            "import { DropdownFormItem } from '@/app/components/dynamic-form/controls/dropdown';",
            "import { TextBoxFormItem } from '@/app/components/dynamic-form/controls/text-box';",
            "import { FormItemBase } from '@/app/components/dynamic-form/model/FormItem.base';",
            '',
            'const formItems: FormItemBase<string>[] = [',
            entries,
            '];'
        ].join('\n');
    }

    private buildFormItems() {
        return [
            new TextBoxFormItem({
                key: 'fullName',
                label: 'Full Name',
                required: true,
                order: 1
            }),
            new TextBoxFormItem({
                key: 'email',
                label: 'Email Address',
                type: 'email',
                required: true,
                order: 2
            }),
            new TextBoxFormItem({
                key: 'phone',
                label: 'Phone Number',
                type: 'tel',
                order: 3
            }),
            new DropdownFormItem({
                key: 'ageRange',
                label: 'Age Range',
                required: true,
                order: 4,
                options: [
                    { key: '18-24', value: '18-24' },
                    { key: '25-34', value: '25-34' },
                    { key: '35-44', value: '35-44' },
                    { key: '45-54', value: '45-54' },
                    { key: '55+', value: '55+' }
                ]
            }),
            new DropdownFormItem({
                key: 'visitFrequency',
                label: 'How often do you use our service?',
                required: true,
                order: 5,
                options: [
                    { key: 'first-time', value: 'This is my first time' },
                    { key: 'monthly', value: 'A few times a month' },
                    { key: 'weekly', value: 'At least once a week' },
                    { key: 'daily', value: 'Almost every day' }
                ]
            }),
            new DropdownFormItem({
                key: 'primaryGoal',
                label: 'What was your main reason for visiting today?',
                required: true,
                order: 6,
                options: [
                    { key: 'purchase', value: 'Make a purchase' },
                    { key: 'support', value: 'Get customer support' },
                    { key: 'browse', value: 'Browse products or services' },
                    { key: 'account', value: 'Manage my account' },
                    { key: 'other', value: 'Other' }
                ]
            }),
            new DropdownFormItem({
                key: 'easeOfUse',
                label: 'How easy was it to complete what you came for?',
                required: true,
                order: 7,
                options: [
                    { key: 'very-easy', value: 'Very easy' },
                    { key: 'easy', value: 'Easy' },
                    { key: 'neutral', value: 'Neutral' },
                    { key: 'difficult', value: 'Difficult' },
                    { key: 'very-difficult', value: 'Very difficult' }
                ]
            }),
            new DropdownFormItem({
                key: 'staffExperience',
                label: 'How would you rate the helpfulness of our team?',
                required: true,
                order: 8,
                options: [
                    { key: 'excellent', value: 'Excellent' },
                    { key: 'good', value: 'Good' },
                    { key: 'average', value: 'Average' },
                    { key: 'poor', value: 'Poor' }
                ]
            }),
            new DropdownFormItem({
                key: 'valueForMoney',
                label: 'How do you feel about the value for money?',
                required: true,
                order: 9,
                options: [
                    { key: 'excellent', value: 'Excellent' },
                    { key: 'good', value: 'Good' },
                    { key: 'fair', value: 'Fair' },
                    { key: 'poor', value: 'Poor' }
                ]
            }),
            new DropdownFormItem({
                key: 'recommendation',
                label: 'How likely are you to recommend us to a friend?',
                required: true,
                order: 10,
                options: [
                    { key: 'very-likely', value: 'Very likely' },
                    { key: 'likely', value: 'Likely' },
                    { key: 'not-sure', value: 'Not sure' },
                    { key: 'unlikely', value: 'Unlikely' }
                ]
            }),
            new TextBoxFormItem({
                key: 'bestPart',
                label: 'What was the best part of your experience?',
                required: true,
                order: 11
            }),
            new TextBoxFormItem({
                key: 'improvementSuggestion',
                label: 'What should we improve next?',
                required: true,
                order: 12
            }),
            new TextBoxFormItem({
                key: 'followUpDate',
                label: 'Preferred follow-up date',
                type: 'date',
                order: 13
            })
        ];
    }

    private escapeString(value: string) {
        return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    }
}
