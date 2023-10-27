import React from 'react';
import {Filter} from '../../../components/filter';
import {FilterItems} from '../../../components/filter/filter';
interface IFilterListenProps {
  onSelected: (value: FilterItems) => void;
}
const FilterListen = (props: IFilterListenProps) => {
  const {onSelected} = props;
  const filterItems = [
    {
      label: 'Name (A-Z)',
      value: 'a-z',
    },
    {
      label: 'Name (Z-A)',
      value: 'z-a',
    },
    {
      label: 'Position (Designers)',
      value: 'position=designer',
    },
    {
      label: 'Position (Developers)',
      value: 'position=developers',
    },
    {
      label: 'Position (Others)',
      value: 'position=others',
    },
  ];
  return <Filter onSelected={onSelected} filterItems={filterItems} />;
};

export default FilterListen;
