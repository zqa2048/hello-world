import { FormattedMessage } from 'umi-plugin-react/locale';
import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import styles from './style.less';

const actions = () => (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        <FormattedMessage id="user-findPwd-result.findPwd-result.back-login" />
      </Button>
    </Link>
  </div>
);

const FindPwdResult = ({ location }) => (
  <Result
    className={styles.findPwdResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="user-findPwd-result.findPwd-result.msg"
          values={{
            email: location.state ? location.state.account : 'AntDesign@example.com',
          }}
        />
      </div>
    }
    extra={actions()}
  />
);

export default FindPwdResult;
