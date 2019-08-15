import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryUsers() {
  return request('/api/currentUser');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function getCaptcha(params) {
  return request('/api/login/captcha', {
    method: 'POST',
    data: params,
  });
}
export async function updateUserInfo(params) {
  return request('/api/users/updateUserInfo', {
    method: 'POST',
    data: params,
  });
}
export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province) {
  return request(`/api/geographic/city/${province}`);
}

export async function changePwd(params) {
  return request('/api/users/changePwd', {
    method: 'POST',
    data: params,
  });
}

export async function changePhone(params) {
  return request('/api/users/changePhone', {
    method: 'POST',
    data: params,
  });
}

export async function changeEmail(params) {
  return request('/api/users/changeEmail', {
    method: 'POST',
    data: params,
  });
}
