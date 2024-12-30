// CustomMultiValue.js
import React from 'react';
import { components } from 'react-select';

const CustomMultiValue = (props) => {
  const { index, getValue } = props;
  const maxToShow = 2; // Maximum number of visible tags
  const total = getValue().length;

  if (index < maxToShow) {
    return <components.MultiValue {...props} />;
  }

  if (index === maxToShow) {
    return (
      <components.MultiValue {...props}>
        +{total - maxToShow} more
      </components.MultiValue>
    );
  }

  return null;
};

export default CustomMultiValue;
