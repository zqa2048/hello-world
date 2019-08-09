import { Button, Col, Form, Input, Popover, Progress, Row, Select, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="user-register.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="user-register.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="user-register.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ userRegister, loading }) => ({
  userRegister,
  submitting: loading.effects['userRegister/submit'],
}))
class FindPwd extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    // eslint-disable-next-line react/no-unused-state
    error: false,
  };

  interval = undefined;

  componentDidUpdate() {
    const { userRegister, form } = this.props;
    const account = form.getFieldValue('email');

    if (userRegister.status === 'ok') {
      message.success('注册成功！');
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { dispatch, form } = this.props;

    return new Promise((resolve, reject) => {
      form.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          this.countDownCaptcha();

          if (values.mobile) {
            dispatch({
              type: 'userLogin/getCaptcha',
              payload: values.mobile,
            })
              .then(status => {
                if (status && status.code === 0) {
                  this.setState({
                    // eslint-disable-next-line react/no-unused-state
                    error: false,
                  });
                } else {
                  clearInterval(this.interval);
                  this.setState({
                    count: 0,
                    // eslint-disable-next-line react/no-unused-state
                    error: true,
                  });
                }
              })
              .catch(reject);
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
          const { prefix } = this.state;
          const submitValues = {
            email: values.email,
            password: values.password,
            repeatPassword: values.repeatPassword,
            lang: 'zh-CN',
            mobile: values.mobile,
            captcha: values.captcha,
          };

          dispatch({
            type: 'userRegister/submit',
            payload: { ...submitValues, prefix },
          })
            .then(status => {
              // eslint-disable-next-line no-console
              console.log(status);
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
          id: 'user-register.password.twice',
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
          id: 'user-register.password.required',
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
    const { count, prefix, help, visible } = this.state;
    return (
      <Modal
        title={formatMessage({ id: 'app.login.forgot-password' })}
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form>
          {success &&
            this.renderMessage(
              formatMessage({ id: 'app.security-view.modify-success' }),
              'success'
            )}
          {!success &&
            error &&
            errorTip &&
            this.renderMessage(errorTip, 'error')}
          <FormItem>
            {getFieldDecorator('PhoneOrEmail', {
              rules: [
                {
                  validator: phoneAndEmailVerify,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'validation.phone-email.required',
                })}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('Password', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'validation.password.required',
                  }),
                },
                {
                  min: 6,
                  max: 16,
                  message: formatMessage({
                    id: 'validation.password.strength.msg',
                  }),
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: 'validation.new-password.required',
                })}
              />
            )}
            <FormItem />
            <FormItem>
              {getFieldDecorator('PasswordAgain', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'validation.confirm-password.required',
                    }),
                  },
                  {
                    validator: this.dbleCheckPassword,
                  },
                ],
                validateTrigger: 'onBlur',
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: 'validation.confirm-new-password.required',
                  })}
                />
              )}
            </FormItem>
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator('Code', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({
                          id: 'validation.verification-code.required',
                        }),
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder={formatMessage({
                        id: 'validation.verification-code.required',
                      })}
                    />
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    size="large"
                    disabled={count}
                    onClick={() => this.onGetCaptcha()}
                  >
                    {count
                      ? `${count} s`
                      : formatMessage({
                          id: 'app.common.get-verification-code',
                        })}
                  </Button>
                </Col>
              </Row>
            </FormItem>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FindPwd);
