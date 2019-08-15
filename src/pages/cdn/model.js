import { queryList } from './service';

const Model = {
  namespace: 'cdn',
  state: {
    cdnList: [],
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      if (response.code === 0) {
        yield put({
          type: 'setList',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    setList(state, { payload }) {
      return { ...state, cdnList: payload };
    },
  },
};
export default Model;
