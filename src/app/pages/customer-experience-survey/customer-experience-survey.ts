import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicForm } from '@/app/components/dynamic-form/dynamic-form';
import { FormItemBase } from '@/app/components/dynamic-form/model/FormItem.base';
import { CustomerExperienceSurveyService } from '@/app/pages/service/customer-experience-survey.service';

@Component({
    selector: 'app-customer-experience-survey',
    imports: [CommonModule, DynamicForm],
    templateUrl: './customer-experience-survey.html',
    styleUrl: './customer-experience-survey.scss'
})
export class CustomerExperienceSurvey {
    formItems$: Observable<FormItemBase<string>[]> = inject(CustomerExperienceSurveyService).getFormItems();
}
