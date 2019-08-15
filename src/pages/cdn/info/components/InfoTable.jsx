import React from 'react';

const InfoTable = () => (
  <table className="table">
    <thead>
      <tr>
        <th width="100">名称</th>
        <th>suprio.me</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>加速域名</th>
        <th>suprio.me</th>
      </tr>
      <tr>
        <td>源站地址</td>
        <td>68.183.185.171</td>
      </tr>
      <tr className="success">
        <td>服务器</td>
        <td>
          香港 - 47.89.39.53
          <label className="label label-danger">* 将你的域名解析到这里</label>
        </td>
      </tr>
      <tr>
        <td>购买时间</td>
        <td>2019-08-05 12:30:28</td>
      </tr>
      <tr>
        <td>到期时间</td>
        <td>
          2020-09-05
          <div className="label label-info">还剩 386 天</div>
        </td>
      </tr>
    </tbody>
  </table>
);

export default InfoTable;
