import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
  userConstacts:null
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.Token;
			state.userConstacts = action.payload.userConstacts;
//			console.log(state.user, state.token, state.userConstacts)
		},

		logoutUser: (state) => {
			state.user = null;
			state.token = null;
      state.userConstacts = null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { loginUser, logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;














// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       state.user = action.payload.user;
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       console.log(state.user)
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { loginUser, logoutUser, setUser } = userSlice.actions;

// export default userSlice.reducer;
