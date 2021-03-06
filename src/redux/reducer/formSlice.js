import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCharacters = createAsyncThunk(
  'starwars/fetchChar',
  async () => {
    return axios.get('https://swapi.dev/api/people')
    .then((res)=>{
        return res.data.results;
    })
    // The value we return becomes the `fulfilled` action payload
  }
);

export const fetchFilms = createAsyncThunk(
  'starwars/fetchFilms',
  async (payload) => {
    let filmArr = [];
    let resData = [];

    await payload.forEach((item,index)=>{
      filmArr.push(axios.get(item));
    })

    await axios.all([...filmArr]).then(axios.spread((...responses) => {
        responses.forEach((item)=>{
          resData.push(item.data);
        })
        // use/access the results 
      }))
      return resData;
    // The value we return becomes the `fulfilled` action payload
  }
);

export const slice = createSlice({
  name: 'starwars',
  initialState : {
    status: '',
    data:[],
    selectedFilmsAPI:[],
    filmList:[],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data.push(action.payload);
      })
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.filmList = (action.payload);
      });
  },

});

export const { resetFilms } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChar = (state) => state.starwars.data;
export const selectFilms = (state) => state.starwars.filmList;
export const loading = (state) => state.starwars.status;

export default slice.reducer;
