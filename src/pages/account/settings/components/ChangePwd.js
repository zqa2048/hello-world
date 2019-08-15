import React, { Component } from 'react';
import { Form, Input, Button, Modal, Row, Col, Alert, Select, message } from 'antd';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class ChangePwdModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      error: false,
      success: false,
      errorTip: '',
    };
  }

  componentDidUpdate(preProps) {
    if (preProps.visible !== this.props.visible) {
      if (!this.props.visible) {
        clearInterval(this.interval);
        this.props.form.resetFields();
      }
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
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

  handleOk = () => {
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const phoneReg = /^\d+$/;
        const val = values.emailOrPhone;
        const isPhone = phoneReg.test(val);

        const submitValues = {
          emailOrPhone: values.emailOrPhone,
          password: values.password,
          repeatPassword: values.repeatPassword,
          captcha: values.captcha,
          type: isPhone ? '1' : '2',
        };

        dispatch({
          type: 'user/changePwd',
          payload: submitValues,
        })
          .then(res => {
            // console.log(res);
            if (res && res.status === 'ok') {
              this.setState({
                success: true,
                error: false,
              });
              message.success('密码修改成功！');
              // console.log('123 :');
              // this.handleCancel();
              this.props.changePwdSuccess();
            } else {
              this.setState({
                error: true,
                errorTip: res.errorTip,
              });
              this.handleCancel();
            }
          })
          // eslint-disable-next-line no-shadow
          .catch(err => console.error(err));
      }
    });
  };

  handleCancel = () => {
    this.props.close();
  };

  dbleCheckPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && (value.length < 6 || value.length > 16)) {
      callback(formatMessage({ id: 'account-settings.security.password.strength.msg' }));
    }
    if (value && value !== getFieldValue('password')) {
      callback(formatMessage({ id: 'account-settings.security.input.twice' }));
    }
    callback();
  };

  countDownCaptcha() {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  renderMessage = (content, type) => (
    <Alert style={{ marginBottom: 24 }} message={content} type={type} showIcon />
  );

  render() {
    const { count, success, error, errorTip } = this.state;
    const { visible, confirmLoading, currentUser } = this.props;
    const { getFieldDecorator } = this.props.form;

    const { email = '', phone = '' } = currentUser;
    const options = [email, phone];

    return (
      <Modal
        title={formatMessage({ id: 'account-settings.security.change-current-password' })}
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        <Form>
          {success &&
            this.renderMessage(
              formatMessage({ id: 'account-settings.security.modify-success' }),
              'success',
            )}
          {!success && error && errorTip && this.renderMessage(errorTip, 'error')}
          <FormItem>
            {getFieldDecorator('emailOrPhone', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                size="large"
                placeholder={formatMessage({
                  id: 'account-settings.security.select-email-or-mobile',
                })}
              >
                {options
                  .filter(opt => !!opt)
                  .map(opt => (
                    <Option key={opt} value={opt}>
                      {opt}
                    </Option>
                  ))}
              </Select>,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'account-settings.security.password.required',
                  }),
                },
                {
                  min: 6,
                  max: 16,
                  message: formatMessage({
                    id: 'account-settings.security.password.strength.msg',
                  }),
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: 'account-settings.security.new-password',
                })}
              />,
            )}
            <FormItem />
            <FormItem>
              {getFieldDecorator('repeatPassword', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'account-settings.security.confirm-password.required',
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
                    id: 'account-settings.security.confirm-new-password',
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
                          id: 'account-settings.security.verification-code.no-empty',
                        }),
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder={formatMessage({
                        id: 'account-settings.security.verification-code.required',
                      })}
                    />,
                  )}
                </Col>
                <Col span={8}>
                  <Button size="large" disabled={count} onClick={this.onGetCaptcha}>
                    {count
                      ? `${count} s`
                      : formatMessage({
                          id: 'account-settings.security.get-verification-code',
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

export default ChangePwdModal;
