import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '@/app/components/dynamic-form/model/question-base';
import { QuestionService } from '@/app/components/dynamic-form/services/question-service';
import { DynamicForm } from '@/app/components/dynamic-form/dynamic-form';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero-job-application',
    imports: [DynamicForm, CommonModule],
    templateUrl: './hero-job-application.html',
    styleUrl: './hero-job-application.scss'
})
export class HeroJobApplication {
    questions$: Observable<QuestionBase<string>[]> = inject(QuestionService).getQuestions();
}
