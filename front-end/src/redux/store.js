import { configureStore , combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// if you have more than one reducer you need to compine this using
// method called comnbine reducers

const rootReducer = combineReducers ({
  user : userReducer,
});


const persistConfig ={
    key: 'root',
    storage, 
    version:1
};

// we use this rootReducer to create our persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>  // middleware to prevant default error
     getDefaultMiddleware( {serializableCheck: false} ),
})

export const persistor = persistStore(store);