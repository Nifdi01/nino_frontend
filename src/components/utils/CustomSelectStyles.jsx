const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#374151',
    borderColor: state.isFocused ? '#2563EB' : '#374151',
    boxShadow: state.isFocused ? '0 0 0 1px #2563EB' : 'none',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#2563EB',
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    maxHeight: '45px',
    overflowY: 'auto',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: '6px',
    paddingBottom: '6px',
    '::-webkit-scrollbar': {
      width: '4px',
    },
    '::-webkit-scrollbar-track': {
      background: '#4B5563',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#6B7280',
      borderRadius: '2px',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#2563EB',
    margin: '2px 4px',
    minWidth: 'fit-content', // Changed from fixed width
    maxWidth: '100%', // Allow full width if needed
    whiteSpace: 'normal', // Allow text to wrap
    boxSizing: 'border-box',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    padding: '4px',
    whiteSpace: 'normal', // Allow text to wrap
    overflow: 'visible', // Prevent text truncation
    textOverflow: 'clip', // Prevent ellipsis
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#FFFFFF',
    ':hover': {
      backgroundColor: '#1D4ED8',
      color: '#FFFFFF',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
    color: '#FFFFFF',
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#2563EB'
      : state.isFocused
      ? '#4F46E5'
      : '#374151',
    color: '#FFFFFF',
    '&:active': {
      backgroundColor: '#2563EB',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9CA3AF',
  }),
  input: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
};

export default customSelectStyles;