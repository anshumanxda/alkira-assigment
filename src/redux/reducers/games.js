import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/httpClient";

const initialState = {
  data: [],
  requestState: "",
  meta: {
    total_pages: 0,
    current_page: 1,
    next_page: 0,
    per_page: 1,
    total_count: 0,
  },
  currentTeamId: 0,
  modalOpen: false,
};

export const getGames = createAsyncThunk(
  "games/getGames",
  async ({ id, onSuccess }) => {
    try {
      const result = await axios.request({
        url: `v1/games?seasons[]=2021&team_ids[]=${id}&per_page=1`,
        method: "get",
      });
      onSuccess?.();
      return result?.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    toggleModal(state, { payload }) {
      state.modalOpen = payload;
    },
    setCurrentTeamId(state, { payload }) {
      state.currentTeamId = payload;
    },
  },
  extraReducers: {
    [getGames.pending]: (state) => {
      state.requestState = "loading";
    },
    [getGames.fulfilled]: (state, { payload = {} }) => {
      state.requestState = "success";
      state.data = { ...payload.data?.[0] };
      state.meta = { ...payload.meta };
    },
    [getGames.rejected]: (state) => {
      state.requestState = "error";
    },
  },
});

export const { toggleModal, setCurrentTeamId } = gamesSlice.actions;

export default gamesSlice.reducer;
