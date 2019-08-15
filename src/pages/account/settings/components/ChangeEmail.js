import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { Form, Input, Button, Modal, Row, Col, Alert, message } from 'antd';
import { connect } from 'dva';
import { EmailVerify } from '@/utils/validators';

const FormItem = Form.Item;

@connect(({ user }) => ({
  user,
  currentUser: user.currentUser,
}))
@Form.create()
class ChangeEmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      errorTip: '',
      count: 0,
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
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { dispatch, form } = this.props;
    return new Promise((resolve, reject) => {
      form.validateFields(['email'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { email } = values;
          if (this.checkSameEmail(email)) {
            return;
          }
          this.countDownCaptcha();
          dispatch({
            type: 'login/getCaptcha',
            payload: {
              value: email,
              type: 2,
            },
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });
  };

  handleOk = () => {
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const submitValues = {
          email: values.email,
          captcha: values.captcha,
        };
        dispatch({
          type: 'user/changeEmail',
          payload: submitValues,
        })
          .then(res => {
            if (res && res.status === 'ok') {
              this.setState({
                success: true,
                error: false,
              });
              message.success('邮箱修改成功！');
              this.props.changeEmailSuccess();
            } else if (res && res.status !== 'ok' && res.errorTip) {
              this.setState({
                error: true,
                errorTip: res.errorTip,
              });
            }
          })
          .catch(error => console.error(error));
      }
    });
  };

  handleCancel = () => {
    this.props.close();
  };

  checkSameEmail = email => {
    const { currentUser } = this.props;
    const isSameEmail = currentUser.Email === email;
    if (isSameEmail) {
      this.setState({
        error: true,
        errorTip: formatMessage({ id: 'account-settings.email.no-same.msg' }),
      });
      return true;
    }
    return false;
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
    const { visible, confirmLoading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={formatMessage({ id: 'account-settings.security.change-current-email' })}
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
            {getFieldDecorator('email', {
              rules: [
                {
                  validator: EmailVerify,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: 'account-settings.security.new-email' })}
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
                    : formatMessage({ id: 'account-settings.security.get-verification-code' })}
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default ChangeEmailModal;
