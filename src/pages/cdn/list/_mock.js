import { mockDelay as delay } from '@/utils/utils';

const proxy = {
  'POST /api/cdn/list': (req, res) => {
    const { guid } = req.body;
    if (guid === '1234') {
      res.send({
        code: 0,
        data: [
          {
            key: '1',
            id: 1,
            name: 'suprio.me',
            origin: 'suprio.me',
            site: '68.183.185.171',
            set: 'A',
            time: '2020-09-05',
          },
          {
            key: '2',
            id: 2,
            name: 'test.me',
            origin: 'test.me',
            site: '68.183.180.101',
            set: 'B',
            time: '2020-09-05',
          },
        ],
      });
    } else {
      res.send({
        code: -1,
        error: 'error',
        errorTip: 'captcha is not correct!',
      });
    }
  },
};

export default delay(proxy, 1000);
