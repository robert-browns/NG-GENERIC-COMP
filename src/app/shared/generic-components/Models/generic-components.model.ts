export interface UIConfig {
    isRequired?: boolean;
    showHintLabel?: boolean;
    overrideKeyValue?: boolean;
    enableSearch?: boolean;
    showMaxlength?: boolean;
    hour12Timer?: boolean;
}

export interface ErrorTypeConfig {
    errorTypesList?: string[];
    patternType?: string;
}

//For Dropdown select
export interface SelectOption {
    id: string;
    value: string;
}

