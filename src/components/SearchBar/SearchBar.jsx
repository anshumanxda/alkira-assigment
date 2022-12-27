import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import { teamsSelector } from "../../redux/selectors";
import { setSearch, setSorting } from '../../redux/reducers/teams';

import SearchIcon from '../../assets//search_icon.svg'

import "./SearchBar.css"

const SearchBar = () => {
  const dispatch = useDispatch()
  const { searchedData } = useSelector(teamsSelector)
  const handleChange = (e) => {
    dispatch(setSearch(e.target.value.toLowerCase()))
    dispatch(setSorting({
      sortBy: '',
      permutation: ''
    }))
  }
  return (
    <div className='search-input-container'>
      <InputGroup className="mb-3 bruh">
        <Form.Control

          className='search-input pb-2'
          onChange={handleChange}
          value={searchedData}
        />
      </InputGroup>
      <img src={SearchIcon} alt="search icon" className='search-icon' />
    </div>
  )
}

export default SearchBar