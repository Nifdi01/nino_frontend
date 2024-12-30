// customDateRangeStyles.js
const customDateRangeStyles = {
  root: {
    backgroundColor: '#1F2937', // Tailwind's bg-gray-800
    color: '#FFFFFF', // Text color
    borderRadius: '0.5rem',
    padding: '1rem', // Optional: Add padding if needed
  },
  calendar: {
    backgroundColor: '#1F2937', // Tailwind's bg-gray-800
    color: '#FFFFFF', // Text color
    borderRadius: '0.5rem',
  },
  monthAndYear: {
    backgroundColor: '#1F2937', // Tailwind's bg-gray-800
    color: '#9CA3AF', // Tailwind's text-gray-400
    fontSize: '1rem',
    padding: '0.5rem 0', // Optional: Adjust padding
  },
  day: {
    base: {
      backgroundColor: '#1F2937', // Tailwind's bg-gray-800
      color: '#FFFFFF', // Text color
      borderRadius: '0.25rem',
      padding: '0.5rem',
    },
    hover: {
      backgroundColor: '#2563EB', // Tailwind's blue-600
      color: '#FFFFFF',
      borderRadius: '0.25rem',
    },
    selected: {
      backgroundColor: '#4F46E5', // Tailwind's indigo-600
      color: '#FFFFFF',
      borderRadius: '0.25rem',
    },
    today: {
      border: '1px solid #3182ce', // Tailwind's blue-500
      color: '#3182ce',
      borderRadius: '0.25rem',
    },
  },
};

export default customDateRangeStyles;
