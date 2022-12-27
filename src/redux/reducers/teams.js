import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/httpClient";

const initialState = {
  data: [],
  requestState: "",
  meta: {
    total_pages: 0,
    current_page: 1,
    next_page: 0,
    per_page: 8,
    total_count: 0,
  },
  allTeamData: [],
  searchedData: "",
  sorting: {
    sortBy: "name",
    permutation: "asc",
  },
};

export const getTeams = createAsyncThunk(
  "teams/getTeams",
  async (args, { getState }) => {
    try {
      const {
        meta: { per_page, current_page },
      } = getState().teams;
      const result = await axios.request({
        url: `v1/teams?per_page=${per_page}&page=${current_page}`,
        method: "get",
      });
      return result?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getAllTeams = createAsyncThunk(
  "teams/getAllTeams",
  async (args) => {
    try {
      const result = await axios.request({
        url: `v1/teams`,
        method: "get",
      });
      return result?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setPaging(state, { payload }) {
      state.meta.current_page = payload;
    },
    setSearch(state, { payload }) {
      state.searchedData = payload;
    },
    setSorting(state, { payload }) {
      state.sorting = { ...payload };

      //for teamData i.e., 10 items
      const teamArr = [...state.data];
      const sortedTeamArray = teamArr.sort((a, b) => {
        if (payload.permutation === "desc") {
          return b?.[payload.sortBy]?.toLowerCase() >
            a?.[payload.sortBy]?.toLowerCase()
            ? 1
            : -1;
        } else {
          return a?.[payload.sortBy]?.toLowerCase() >
            b?.[payload.sortBy]?.toLowerCase()
            ? 1
            : -1;
        }
      });
      state.data = [...sortedTeamArray];

      //for searched Data
      if (state.searchedData) {
        const allTeamArr = [...state.allTeamData];
        const sortedAllTeamArray = allTeamArr.sort((a, b) => {
          if (payload.permutation === "desc") {
            return b?.[payload.sortBy]?.toLowerCase() >
              a?.[payload.sortBy]?.toLowerCase()
              ? 1
              : -1;
          } else {
            return a?.[payload.sortBy]?.toLowerCase() >
              b?.[payload.sortBy]?.toLowerCase()
              ? 1
              : -1;
          }
        });
        state.allTeamData = [...sortedAllTeamArray];
      }
    },
  },
  extraReducers: {
    [getTeams.pending]: (state) => {
      state.requestState = "loading";
    },
    [getTeams.fulfilled]: (state, { payload = {} }) => {
      state.requestState = "success";
      state.data = [...payload.data];
      state.meta = { ...payload.meta };
    },
    [getTeams.rejected]: (state) => {
      state.requestState = "error";
    },

    [getAllTeams.fulfilled]: (state, { payload = {} }) => {
      state.allTeamData = [...payload.data];
    },
  },
});

export const { setPaging, setSearch, setSorting } = teamsSlice.actions;

export default teamsSlice.reducer;
