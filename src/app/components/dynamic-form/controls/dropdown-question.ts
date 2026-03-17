import { QuestionBase } from '@/app/components/dynamic-form/model/question-base';
import { controlTypeEnum } from '@/app/components/dynamic-form/const/controlType.enum';

export class DropdownQuestion extends QuestionBase<string>{
    override controlType = controlTypeEnum.DROPDOWN;
}
