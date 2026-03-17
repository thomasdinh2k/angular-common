import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { DynamicForm } from '@/app/components/dynamic-form/dynamic-form';
import { HeroJobApplication } from '@/app/pages/hero-job-application/hero-job-application';

export default [
    { path: 'hero-application', component: HeroJobApplication},
    { path: 'dynamic-form', component: DynamicForm},
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
