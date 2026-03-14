import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';

export const DynamicFieldTypes = {
    TEXT: 'text',
    // PASSWORD: 'password',
    // TEXTAREA: 'textarea',
    // CHECKBOX: 'checkbox',
    // SWITCH: 'switch',
    // RADIO: 'radio',
    // SELECT: 'select',
    // MULTISELECT: 'multiselect',
    // DATE: 'date',
    // FILE: 'file',
    // CUSTOM: 'custom',
    // SELECT_LAZY: 'select-lazy',
    // MULTISELECT_LAZY: 'multiselect-lazy'
} as const;

export type DynamicFieldType = (typeof DynamicFieldTypes)[keyof typeof DynamicFieldTypes];

export interface DynamicFormItem<T = any> {
    /* ===== Identity ===== */
    key: string;
    type: DynamicFieldType;

    /* ===== Value ===== */
    // value?: T;
    //
    // /* ===== UI ===== */
    // label?: string;
    // placeholder?: string;
    // placeholderParams?: Record<string, any>;
    // hint?: string;
    //
    // readonly?: boolean;
    // disabled?: boolean;
    // hidden?: boolean;
    //
    // /* ===== Validation ===== */
    // isRequired?: boolean;
    // validators?: ValidatorFn[];
    // asyncValidators?: AsyncValidatorFn[];
    //
    // /* ===== Layout ===== */
    // order?: number;
    //
    // /**
    //  * group id (for same row)
    //  * same group => same row
    //  */
    // group?: string | number;
    // /** ===== Group-level Validation ===== */
    // validatorsGroup?: ValidatorFn[];
    // asyncValidatorsGroup?: AsyncValidatorFn[];
    //
    // /**
    //  * number of columns in this group (1 | 2 | 3 | 4)
    //  * default = auto
    //  */
    // // groupCols?: 1 | 2 | 3 | 4;
    //
    // /**
    //  * span inside group (like grid-column)
    //  */
    // // colSpan?: 1 | 2 | 3 | 4;
    //
    // groupLabel?: string;
    //
    // classes?: {
    //     control?: string;
    //     label?: string;
    //     group?: string;
    //     wrapper?: string;
    // };
    //
    // rules?: {
    //     disabled?: boolean | ((ctx: any) => boolean);
    //     readonly?: boolean | ((ctx: any) => boolean);
    //     hidden?: boolean | ((ctx: any) => boolean);
    //     required?: boolean | ((ctx: any) => boolean);
    //     options?: any[] | ((ctx: any) => any[]);
    // };
    //
    // /* ===== Data-driven fields ===== */
    // options?: DynamicOption[];
    //
    // /* ===== Wrapper-specific props ===== */
    // // props: Record<string, any> | any;
    //
    // /* ===== Conditional logic ===== */
    // visibleWhen?: (formValue: any, form: FormGroup) => boolean;
    // disabledWhen?: (formValue: any, form: FormGroup) => boolean;
    //
    // /* ===== Advanced ===== */
    // children?: DynamicFormItem[];
    // formControlTemplate?: any;
    // customMessages?: Record<string, string>;
}

export interface DynamicOption {
    label: string;
    value: any;
    disabled?: boolean;
    active?: boolean;
}
