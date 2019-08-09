import request from '@/utils/request';

export async function register(params) {
  return request('/api/admin/registerAdmin', {
    method: 'POST',
    data: params,
  });
}
