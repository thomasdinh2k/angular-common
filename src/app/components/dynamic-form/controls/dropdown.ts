import { FormItemBase } from '@/app/components/dynamic-form/model/FormItem.base';
import { controlTypeEnum } from '@/app/components/dynamic-form/const/controlType.enum';

export class DropdownFormItem extends FormItemBase<string> {
    override controlType = controlTypeEnum.DROPDOWN;
}
