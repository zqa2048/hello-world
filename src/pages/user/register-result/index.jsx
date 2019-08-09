import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import styles from './style.less';

const actions = mailCompany => (
    <div className={styles.actions}>
      <a
        href={`http://mail.${mailCompany}`}
      >
        <Button size="large" type="primary">
          <FormattedMessage id="user-register-result.register-result.view-mailbox" />
        </Button>
      </a>
      <Link to="/">
        <Button size="large">
          <FormattedMessage id="user-register-result.register-result.back-home" />
        </Button>
      </Link>
    </div>
  );

const RegisterResult = ({ location }) => {
  const {
    account,
  } = location.state;
  const index = account.indexOf('@') + 1;
  const mailCompany = account.slice(index);
  return (
    <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="user-register-result.register-result.msg"
          values={{
            email: location.state ? location.state.account : 'AntDesign@example.com',
          }}
        />
      </div>
    }
    subTitle={formatMessage({
      id: 'user-register-result.register-result.activation-email',
    })}
    extra={actions(mailCompany)}
  />
  )
};

export default RegisterResult;
