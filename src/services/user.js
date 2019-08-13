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
