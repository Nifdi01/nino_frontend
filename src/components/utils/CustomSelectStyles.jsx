// Define custom styles for react-select
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#374151', // Tailwind's bg-gray-700
    borderColor: state.isFocused ? '#2563EB' : '#374151',
    boxShadow: state.isFocused ? '0 0 0 1px #2563EB' : 'none',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#2563EB',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151', // Tailwind's bg-gray-700
    color: '#FFFFFF',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#2563EB' // Tailwind's blue-600
      : state.isFocused
      ? '#4F46E5' // Tailwind's indigo-600
      : '#374151',
    color: '#FFFFFF',
    '&:active': {
      backgroundColor: '#2563EB',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#2563EB',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    ':hover': {
      backgroundColor: '#1D4ED8',
      color: '#FFFFFF',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9CA3AF', // Tailwind's text-gray-400
  }),
  input: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
};

export default customSelectStyles;