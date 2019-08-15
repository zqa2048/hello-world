import React from 'react';
import { Alert, Button, Table, Divider, Tag, Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import style from './style.less';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '套餐',
    dataIndex: 'set',
    key: 'set',
  },
  {
    title: '加速域名',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: '源站地址',
    key: 'site',
    dataIndex: 'site',
  },
  {
    title: '结束时间',
    key: 'time',
    dataIndex: 'time',
  },
];

const data = [
  {
    key: '1',
    name: 'suprio.me',
    origin: 'suprio.me',
    site: '68.183.185.171',
    set: 'A',
    time: '2020-09-05',
  },
  {
    key: '2',
    name: 'test.me',
    origin: 'test.me',
    site: '68.183.180.101',
    set: 'B',
    time: '2020-09-05',
  },
];

const CDNList = () => (
  <PageHeaderWrapper content={<FormattedMessage id="cdn-list.basic.description" />}>
    <Card bordered={false}>
      <Alert
        message={
          <div className={style['alert-msg']}>
            <FormattedMessage id="cdn-list.warning.description" />
            <a onClick={() => console.log('a')}>
              {formatMessage({ id: 'cdn-list.warning.weebly.a' })}
            </a>
          </div>
        }
        type="info"
        showIcon
      />

      <Button type="primary" icon="plus" className={style['add-btn']}>
        <FormattedMessage id="cdn-list.add.btn" />
      </Button>
      <Table
        title={() => (
          <h3>
            <FormattedMessage id="cdn-list.basic.description" />
          </h3>
        )}
        bodyStyle={{
          background: 'white',
          borderTop: 'solid 1px #e8e8e8',
          borderLeft: 'solid 1px #e8e8e8',
          borderRight: 'solid 1px #e8e8e8',
        }}
        columns={columns}
        dataSource={data}
      />
    </Card>
  </PageHeaderWrapper>
);

export default CDNList;
