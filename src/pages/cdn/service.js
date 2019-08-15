import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/cdn/list', {
    method: 'POST',
    data: params,
  });
}
