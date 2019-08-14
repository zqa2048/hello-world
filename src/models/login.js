import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { setToken, setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getCaptcha } from '../services/user';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *logout(_, { put }) {
      setToken('');
      setAuthority('');
      reloadAuthorized();

      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },

    *getCaptcha({ payload }, { call }) {
      const response = yield call(getCaptcha, payload);
      return response;
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
