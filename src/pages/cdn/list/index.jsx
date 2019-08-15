import React, { useEffect } from 'react';
import { Alert, Button, Table, Card, Icon, Tag } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import router from 'umi/router';
import style from './style.less';

const TableTitle = (
  <>
    <h3>
      <FormattedMessage id="cdn-list.basic.description" />
    </h3>
    <div>
      <Icon type="question-circle" />
      <a>
        <FormattedMessage id="cdn-list.what.is.a" />
      </a>
    </div>
  </>
);

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
    render: text => (
      <div>
        {text} &nbsp; <Tag color="#108ee9">剩386天</Tag>
      </div>
    ),
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

let CDNListTable = ({ dispatch, listData, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'cdn/fetchList',
      payload: {
        guid: '1234',
      },
    });
  }, []);

  return (
    <Table
      title={() => TableTitle}
      bodyStyle={{
        background: 'white',
        border: 'solid 1px #e8e8e8',
        borderBottom: 'none',
      }}
      columns={columns}
      dataSource={listData}
      loading={loading}
    />
  );
};

CDNListTable = connect(({ cdn, loading }) => ({
  listData: cdn.cdnList,
  loading: loading.effects['cdn/fetchList'],
}))(CDNListTable);

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

      <Button
        type="primary"
        icon="plus"
        className={style['add-btn']}
        onClick={() => router.push('/cdn/new')}
      >
        <FormattedMessage id="cdn-list.add.btn" />
      </Button>
      <CDNListTable />
    </Card>
  </PageHeaderWrapper>
);

export default CDNList;
