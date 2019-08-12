export default {
  'POST  /api/admin/forgetPassword': (_, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
};
