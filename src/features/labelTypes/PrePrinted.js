import React from 'react';

const PrePrinted = () => {
  const columnNames = [
    { label: 'Product Code', value: 'q123' },
    { label: 'Description', value: 'TAL-A' },
    { label: 'Head Office Stock Level', value: '300' },
    { label: 'Stock in Transit', value: '0' },
    { label: 'Branch stock level', value: '0' },
    { label: 'Total Available Stock', value: '300' },
    { label: 'Suggested stock level', value: '250' },
    { label: 'Growth Percentage', value: '5%' },
    { label: 'Filter for fast moving labels', value: 'Yes' },
    { label: 'Suggested order quantity - displayed for branch user role', value: '200' },
    { label: 'Suggested Factory Order - displayed for head office user role', value: '300' },
    { label: 'Estimated sales volume for the next month', value: '250' },
    { label: 'Order Quantity', value: '200' },
    { label: 'Estimated Order Quantity', value: '250' },
  ];

  return (
    <table>
      <thead>
        <tr>
          {columnNames.map((column) => (
            <th key={column.label}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Add rows of data here */}
      </tbody>
    </table>
  );
};

export default PrePrinted;