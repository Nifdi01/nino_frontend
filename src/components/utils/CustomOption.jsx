import Select, { components } from "react-select";
import { CircleCheck } from "lucide-react";
import customSelectStyles from "../utils/CustomSelectStyles";
import { useMemo } from "react"; // Import useMemo for performance optimization

// Custom Option with Checkmark
const CustomOption = (props) => {
  const { data, isSelected, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className="flex items-center px-2 py-1 cursor-pointer">
      {isSelected ? <CircleCheck className="text-green-500 w-4 h-4 mr-2" /> : <div className="w-4 h-4 mr-2" />} 
      {data.label}
    </div>
  );
};


const CustomSelect = ({ optionName, valueOptions, selectedOptions, setSelectedOptions }) => {
  // Sort options so that selected items appear first
  const sortedOptions = useMemo(() => {
    return [...valueOptions].sort((a, b) => {
      const aIsSelected = selectedOptions.some((selected) => selected.value === a.value);
      const bIsSelected = selectedOptions.some((selected) => selected.value === b.value);

      if (aIsSelected && !bIsSelected) return -1; // a comes first
      if (!aIsSelected && bIsSelected) return 1; // b comes first
      return 0; // no change in order
    });
  }, [valueOptions, selectedOptions]);

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      options={sortedOptions} // Use the sorted options
      value={selectedOptions}
      onChange={setSelectedOptions}
      className="w-full"
      placeholder={`Select ${optionName}`}
      styles={customSelectStyles}
      components={{ Option: CustomOption }} // Custom behavior
      hideSelectedOptions={false} // Ensure selected options are not hidden
    />
  );
};

export default CustomSelect;