import { forgetPassword } from './service';

const Model = {
  namespace: 'forgetPassword',
  state: {
  },
  effects: {
    *submit({ payload }, { call }) {
      yield call(forgetPassword, payload);
    },
  },
  reducers: {
  },
};
export default Model;
