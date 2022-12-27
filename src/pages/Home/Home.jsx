import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { teamsSelector } from '../../redux/selectors'
import { setPaging, getTeams, getAllTeams, setSearch } from '../../redux/reducers/teams'

import SearchBar from '../../components/SearchBar/SearchBar'
import TeamDetailModal from '../../components/TeamDetailModal/TeamDetailModal'
import TeamsTable from '../../components/TeamsTable/TeamsTable'
import Pagination from '../../components/Pagination/Pagination'

import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const { meta: { current_page, total_pages }, requestState } = useSelector(teamsSelector)

  const onPaginationChange = (page) => {
    dispatch(setSearch(''))
    dispatch(setPaging(page))
    dispatch(getTeams())
  }

  useEffect(() => {
    //for search
    dispatch(getAllTeams())
  }, [])

  return (
    <div className='home-container'>
      <h1 className='title'>NBA TEAMS</h1>
      <SearchBar />
      <TeamsTable />
      <TeamDetailModal />
      <Pagination currentPage={current_page} totalPage={total_pages} onChange={onPaginationChange} />
    </div>
  )
}

export default Home