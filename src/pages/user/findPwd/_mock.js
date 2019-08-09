export default {
  'POST  /api/admin/registerAdmin': (_, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
};
