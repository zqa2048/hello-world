import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Suspense, Component, Fragment } from 'react';
import { List } from 'antd';
import { connect } from 'dva';

const ChangePwdModal = React.lazy(() => import('./ChangePwd'));
const ChangePhoneModal = React.lazy(() => import('./ChangePhone'));
const ChangeEmailModal = React.lazy(() => import('./ChangeEmail'));

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="account-settings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="account-settings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="account-settings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class SecurityView extends Component {
  state = {
    passwordVisible: false,
    phoneVisible: false,
    emailVisible: false,
    confirmLoading: false,
  };

  showModel = type => {
    this.setState({
      [type]: true,
    });
  };

  closeModal = type => {
    this.setState({
      [type]: false,
    });
  };

  getData = () => {
    const { currentUser } = this.props;
    const { phone, email } = currentUser;
    let encryptionPhone;

    if (phone) {
      encryptionPhone = `${phone.slice(0, 3)}****${phone.slice(-4)}`;
    }

    return [
      {
        title: formatMessage(
          {
            id: 'account-settings.security.password',
          },
          {},
        ),
        description: (
          <Fragment>
            {formatMessage({
              id: 'account-settings.security.password-description',
            })}
            ：{passwordStrength.strong}
          </Fragment>
        ),
        actions: [
          <a key="Modify" onClick={() => this.showModel('passwordVisible')}>
            <FormattedMessage id="account-settings.security.modify" defaultMessage="Modify" />
          </a>,
        ],
      },
      {
        title: formatMessage(
          {
            id: 'account-settings.security.phone',
          },
          {},
        ),
        description: `${formatMessage(
          {
            id: 'account-settings.security.phone-description',
          },
          {},
        )}：${encryptionPhone}`,
        actions: [
          <a key="Modify" onClick={() => this.showModel('phoneVisible')}>
            <FormattedMessage id="account-settings.security.modify" defaultMessage="Modify" />
          </a>,
        ],
      },
      {
        title: formatMessage({ id: 'account-settings.security.email' }),
        description: `${formatMessage(
          {
            id: 'account-settings.security.email-description',
          },
          {},
        )}：${email}`,
        actions: [
          <a key="Modify" onClick={() => this.showModel('emailVisible')}>
            <FormattedMessage id="account-settings.security.modify" defaultMessage="Modify" />
          </a>,
        ],
      },
    ];
  };

  render() {
    const data = this.getData();
    const { phoneVisible, passwordVisible, emailVisible, confirmLoading } = this.state;
    return (
      <Fragment>
        <Suspense fallback={<div>Loading...</div>}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        {passwordVisible && (
          <ChangePwdModal
            visible={passwordVisible}
            confirmLoading={confirmLoading}
            show={() => this.showModal('passwordVisible')}
            close={() => this.closeModal('passwordVisible')}
            changePwdSuccess={() => this.changeSuccess('passwordVisible')}
          />
        )}
        {phoneVisible && (
          <ChangePhoneModal
            visible={phoneVisible}
            confirmLoading={confirmLoading}
            show={() => this.showModal('phoneVisible')}
            close={() => this.closeModal('phoneVisible')}
            changePhoneSuccess={() => this.changeSuccess('phoneVisible')}
          />
        )}
        {emailVisible && (
          <ChangeEmailModal
            visible={emailVisible}
            confirmLoading={confirmLoading}
            show={() => this.showModal('emailVisible')}
            close={() => this.closeModal('emailVisible')}
            changeEmailSuccess={() => this.changeSuccess('emailVisible')}
          />
        )}
        </Suspense>
      </Fragment>
    );
  }
}

export default SecurityView;
