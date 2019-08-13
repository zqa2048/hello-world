import {
  queryCity,
  queryCurrent,
  queryProvince,
  query as queryUsers,
  updateUserInfo,
} from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    province: [],
    city: [],
    isLoading: false,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *updateUserInfo(_, { call, put }) {
      const response = yield call(updateUserInfo);
      // console.log(response);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      console.log(response);
      yield put({
        type: 'setProvince',
        payload: response,
      });
    },

    *fetchCity({ payload }, { call, put }) {
      console.log('payload', payload);
      const response = yield call(queryCity, payload);
      // console.log(response);
      yield put({
        type: 'setCity',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    setProvince(state, action) {
      return { ...state, province: action.payload };
    },

    setCity(state, action) {
      return { ...state, city: action.payload };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default UserModel;
