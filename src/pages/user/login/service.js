import request from '@/utils/request';

export async function accountLogin(params) {
  return request('/api/admin/adminlogin', {
    method: 'POST',
    data: params,
  });
}
