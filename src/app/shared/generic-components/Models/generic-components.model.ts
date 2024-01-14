export interface UIConfig {
    isRequired?: boolean;
    showHintLabel?: boolean;
    overrideKeyValue?: boolean;
    enableSearch?: boolean;
    showMaxlength?: boolean;
}

export interface ErrorTypeConfig {
    errorTypesList?: string[];
    patternType?: string;
}

//For Dropdown select
export interface SelectOption {
    value: string;
    viewValue: string;
}

