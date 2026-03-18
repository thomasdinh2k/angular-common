// Describe all scenarios needed by the form functionality

import { controlTypeType } from '@/app/components/dynamic-form/const/controlType.enum';

export class FormItemBase<T> {
    value: T | undefined;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    options?: { key: string; value: string }[];
    props?: Record<string, any>;

    constructor(options: {
        key: string;
        value?: T;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: controlTypeType;
        type?: string;
        options?: { key: string; value: string }[];
        props?: Record<string, any>;
    }) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.options = options.options || [];
        this.props = options.props;
    }
}
