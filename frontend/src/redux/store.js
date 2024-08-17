import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import playerReducer from "./slice/playerSlice";
import userReducer from "./slice/userSlice";

const persistConfig = { key: "root", storage, version: 1 };
const reducers = combineReducers({
	player: playerReducer,
	user: userReducer,
});
const persistedReducers = persistReducer(persistConfig, reducers);
export const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}),
});















// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   persistReducer,
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import userReducer from "./slice/userSlice";

// const persistConfig = { key: "root", storage, version: 1 };
// const reducers = combineReducers({
//   user: userReducer,
// });
// const persistedReducers = persistReducer(persistConfig, reducers);
// export const store = configureStore({
//   reducer: persistedReducers,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
//       },
//     }),
// });