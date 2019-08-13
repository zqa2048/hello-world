import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';
import { connect } from 'dva';

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
  // state = {
  //   passwordVisible: false,
  //   phoneVisible: false,
  // };

  changePwd = () => null;

  changeMobile = () => null;

  getData = () => {
    const { currentUser } = this.props;
    const { phone } = currentUser;
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
          <a key="Modify" onClick={() => this.changePwd()}>
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
          <a key="Modify" onClick={() => this.changeMobile()}>
            <FormattedMessage id="account-settings.security.modify" defaultMessage="Modify" />
          </a>,
        ],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;
