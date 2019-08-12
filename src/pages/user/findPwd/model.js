import { register } from './service';

const Model = {
  namespace: 'forgetPassword',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'forgetPasswordHandle',
        payload: response,
      });
    },
  },
  reducers: {
    forgetPasswordHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
