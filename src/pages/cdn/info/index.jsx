import React, { useEffect } from 'react';
import { Button, Card, Icon, Tabs } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import router from 'umi/router';
import InfoTable from './components/InfoTable';
import SettingsForm from './components/SettingsForm';
import style from './style.less';

const { TabPane } = Tabs;

const CDNInfo = () => (
  <PageHeaderWrapper content={<FormattedMessage id="cdn-list.basic.description" />}>
    <Card bordered={false}>
      <Tabs onChange={() => {}} type="card">
        <TabPane tab="Tab 1" key="1">
          <InfoTable />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <SettingsForm />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Tab 4" key="4">
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </Card>
  </PageHeaderWrapper>
);

export default CDNInfo;
