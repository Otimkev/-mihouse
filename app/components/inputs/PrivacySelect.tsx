'use client';

import usePrivacy from "@/app/hooks/userPrivacy";
import Select from "react-select";

export type CustomSelectorValue = {
    label: string;
    value: string;
}

interface CustomSelectorProps {
    value?: CustomSelectorValue;
    onChange: (value: CustomSelectorValue) => void;
}
const PrivacySelect: React.FC<CustomSelectorProps> = ({
    value,
    onChange
}) => {

    const {getAllPrivacy} = usePrivacy();

    return (
        <div>
            <Select
                placeholder="Select privacy mode"
                isClearable
                isSearchable={false}
                options={getAllPrivacy()}
                value={value}
                onChange={(value) => onChange(value as CustomSelectorValue)}
                formatOptionLabel={(options: any) => (
                    <div className=" flex flex-row items-center gap-3">
                        <div>
                            {options.label}
                        </div>
                    </div>         
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg"
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6"
                    }
                })}
            />
        </div>
    )
}

export default PrivacySelect;