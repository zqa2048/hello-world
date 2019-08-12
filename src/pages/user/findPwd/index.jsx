import { Button, Col, Form, Input, Popover, Progress, Row, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './style.less';
// import { sleep } from '../../../utils/utils';

import { phoneAndEmailVerify } from '../../../utils/validators';

const FormItem = Form.Item;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="find-password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="find-password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="find-password.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ loading }) => ({
  submitting: loading.effects['forgetPassword/submit'],
}))
class FindPwd extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    // eslint-disable-next-line react/no-unused-state
    error: false,
  };

  interval = undefined;

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { dispatch, form } = this.props;

    return new Promise((resolve, reject) => {
      form.validateFields(['emailOrPhone'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const phoneReg = /^1[0-9]{10}$/;
          const emailReg = /^[.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          const val = values.emailOrPhone;
          const isPhone = phoneReg.test(val);
          const isEmail = emailReg.test(val);
          this.countDownCaptcha();

          if (isPhone) {
            dispatch({
              type: 'login/getCaptcha',
              payload: {
                type: 1,
                value: val,
              },
            })
              .then(resolve)
              .catch(reject);
          } else if (isEmail) {
            dispatch({
              type: 'login/getCaptcha',
              payload: {
                type: 2,
                value: val,
              },
            })
              .then(resolve)
              .catch(reject);
          } else {
            reject();
          }
        }
      });
    });
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true,
      },
      (err, values) => {
        if (!err) {
          const submitValues = {
            emailOrPhone: values.emailOrPhone,
            password: values.password,
            repeatPassword: values.repeatPassword,
            captcha: values.captcha,
          };

          dispatch({
            type: 'forgetPassword/submit',
            payload: { ...submitValues },
          })
            .then(() => {
              const account = form.getFieldValue('emailOrPhone');
              message.success('密码修改成功！');
              router.push({
                pathname: '/user/findPwd-result',
                state: {
                  account,
                },
              });
            })
            .catch();
        }
      },
    );
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
      callback(
        formatMessage({
          id: 'find-password.password.twice',
        }),
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        help: formatMessage({
          id: 'find-password.password.required',
        }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });

      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }

      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true,
          });
        }

        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  countDownCaptcha() {
    let count = 59;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="find-password.login.forgot-password" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('emailOrPhone', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  validator: phoneAndEmailVerify,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'find-password.emailOrPhone.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FormattedMessage id="find-password.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: 'find-password.password.placeholder',
                  })}
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('repeatPassword', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'find-password.confirm-password.required',
                  }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: 'find-password.confirm-password.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'find-password.verification-code.required',
                      }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({
                      id: 'find-password.verification-code.placeholder',
                    })}
                  />,
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({
                        id: 'find-password.register.get-verification-code',
                      })}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="find-password.find.comfirm" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="find-password.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(FindPwd);
