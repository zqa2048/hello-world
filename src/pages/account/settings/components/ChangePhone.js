import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { Form, Input, Button, Modal, Row, Col, Alert, message } from 'antd';
import { connect } from 'dva';
import { phoneVerify } from '@/utils/validators';

const FormItem = Form.Item;

@connect(({ user }) => ({
  user,
  currentUser: user.currentUser,
}))
@Form.create()
class ChangePhoneModal extends Component {
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
      form.validateFields(['Phone_ChangePhone'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const phone = values.Phone_ChangePhone;
          if (this.checkSamePhone(phone)) {
            return;
          }
          this.countDownCaptcha();
          dispatch({
            type: 'login/getCaptcha',
            payload: {
              type: 1,
              value: phone,
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
          phone: values.Phone_ChangePhone,
          captcha: values.captcha,
        };
        dispatch({
          type: 'user/changePhone',
          payload: submitValues,
        })
          .then(res => {
            if (res && res.status === 'ok') {
              this.setState({
                success: true,
                error: false,
              });
              message.success('手机号码修改成功！');
              this.props.changePhoneSuccess();
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

  checkSamePhone = phone => {
    const { currentUser } = this.props;
    const isSamePhone = currentUser.Phone === phone;
    if (isSamePhone) {
      this.setState({
        error: true,
        errorTip: formatMessage({ id: 'account-settings.phone-number.no-same.msg' }),
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
        title={formatMessage({ id: 'account-settings.security.change-current-phone' })}
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
            {getFieldDecorator('Phone_ChangePhone', {
              rules: [
                {
                  validator: phoneVerify,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'account-settings.security.new-phone-number',
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

export default ChangePhoneModal;
