import { useDispatch, useSelector } from 'react-redux';
import { FilterContainer, FilterInpur } from './Filter.styled';
import { filterAction } from 'components/store/filter/filterSlice';
const Filter = () => {
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(filterAction(e.target.value));
  };
  return (
    <FilterContainer>
      <label>Find contacts by name</label>
      <FilterInpur type="text" value={filter} onChange={onChange}></FilterInpur>
    </FilterContainer>
  );
};

export default Filter;
