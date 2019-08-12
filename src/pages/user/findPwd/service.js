import request from '@/utils/request';

export async function forgetPassword(params) {
  return request('/api/admin/forgetPassword', {
    method: 'POST',
    data: params,
  });
}
