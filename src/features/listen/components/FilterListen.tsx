import React from 'react';
import {Filter} from '../../../components/filter';

const FilterListen = () => {
  const filterItems = [
    {
      label: 'Name (A-Z)',
      value: 'all',
    },
    {
      label: 'Name (Z-A)',
      value: 'recorded',
    },
    {
      label: 'Position (Designers)',
      value: 'not-recorded',
    },
    {
      label: 'Position (Developers)',
      value: 'all',
    },
    {
      label: 'Position (Others)',
      value: 'recorded',
    },
    {
      label: 'Joined lately',
      value: 'not-recorded',
    },
  ];
  return (
    <Filter
      onSelected={value => console.log(value)}
      filterItems={filterItems}
    />
  );
};

export default FilterListen;
