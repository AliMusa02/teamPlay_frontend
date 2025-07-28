// src/redux/teamSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../API/const";

export const fetchTeams = createAsyncThunk("team/fetchTeams", async () => {
    const res = await api("/api/teams/", { method: "GET" });
    return res.data;
});

const teamSlice = createSlice({
    name: "team",
    initialState: {
        teams: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload;
                state.loading = false;
            })
            .addCase(fetchTeams.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default teamSlice.reducer;


