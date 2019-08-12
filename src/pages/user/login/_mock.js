function makeString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  'POST  /api/admin/adminlogin': (req, res) => {
    const { type } = req.body;

    if (type && type === 'account') {
      const { email, password } = req.body;

      if (email.indexOf('@') && password) {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
          code: 0,
          data: {
            admin_token: makeString(96),
            email,
            id: 1,
            isApply: null,
            name: 'admin_email',
            password: null,
            token: null,
          },
          message: 'Login successful',
        });
      }
      return;
    }

    if (type && type === 'mobile') {
      const { mobile, captcha } = req.body;
      if (mobile && captcha === '1234') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
          code: 0,
          data: {
            admin_token: makeString(96),
            mobile,
            id: 1,
            isApply: null,
            name: 'admin_mobile',
            password: null,
            token: null,
          },
          message: 'Login successful',
        });
      }
      return;
    }

    res.send({
      status: 'error',
      type,
      code: -1,
      currentAuthority: 'guest',
      message: 'Login error',
    });
  },
};
