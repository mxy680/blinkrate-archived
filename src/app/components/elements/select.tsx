"use client";

import {  
    Select as RelumeSelect, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue
  } from '@relume_io/relume-ui';

type SelectProps = {
    placeholder: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
};

type SelectOption = {
    value: string;
    label: string;
};

const Select = ({ placeholder, options, value, onChange }: SelectProps) => {

    return (
        <RelumeSelect value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder}>{value}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </RelumeSelect>
    );
}

export default Select;