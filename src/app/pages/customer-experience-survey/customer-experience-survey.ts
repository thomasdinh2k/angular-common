import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicForm } from '@/app/components/dynamic-form/dynamic-form';
import { FormItemBase } from '@/app/components/dynamic-form/model/FormItem.base';
import { CustomerExperienceSurveyService } from '@/app/pages/service/customer-experience-survey.service';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
    selector: 'app-customer-experience-survey',
    imports: [CommonModule, DynamicForm, ButtonModule, DrawerModule],
    templateUrl: './customer-experience-survey.html',
    styleUrl: './customer-experience-survey.scss'
})
export class CustomerExperienceSurvey {
    private readonly customerExperienceSurveyService = inject(CustomerExperienceSurveyService);

    formItems$: Observable<FormItemBase<string>[]> = this.customerExperienceSurveyService.getFormItems();
    formConfigCode = this.customerExperienceSurveyService.getFormConfigCode();
    isConfigDrawerVisible = false;
}
