import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceToken from './deviceToken';
import profileData from './profileData';
import eventData from './eventData';
import eventId from './eventId';
import transaction from './transaction';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  deviceToken,
  profileData,
  eventData,
  eventId,
  transaction,
});

export default reducer;
