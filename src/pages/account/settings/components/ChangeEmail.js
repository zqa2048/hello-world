import React, { Component } from 'react';
import { formatMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Modal, Row, Col, Alert } from 'antd';
import { connect } from 'dva';
// import { getPeopleGuid, getParameterByName } from '@/utils/commonFunc';
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
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          success: false,
          error: false,
          errorTip: '',
          count: 0,
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { dispatch, form } = this.props;

    // 驗證 Email 並發請求
    return new Promise((resolve, reject) => {
      form.validateFields(['Email'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const email = values.Email;
          if (this.checkSameEmail(email)) {
            return;
          }
          this.countDownCaptcha();
          dispatch({
            type: 'user/sendEmail',
            payload: {
              Email: email,
              Type: 2,
              // LangType: this.getLangType(),
              // PeopleGuid: getPeopleGuid(),
            },
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });
  };

  // getLangType = () => {
  //   const CN = getLocale() === 'zh-CN';
  //   if (CN) {
  //     return 0;
  //   }
  //   return 1;
  // };

  handleOk = () => {
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const submitValues = {
          Email: values.Email,
          Code: values.Code_ChangeEmail,
          // PeopleGuid: getPeopleGuid(),
        };
        dispatch({
          type: 'user/updateUserEmail',
          payload: submitValues,
        })
          .then(status => {
            if (status && status.StatusCode === 0) {
              this.setState({
                success: true,
                error: false,
              });
              this.props.changeEmailSuccess();
            } else if (status && status.StatusCode !== 0 && status.Info) {
              this.setState({
                error: true,
                errorTip: status.Info,
              });
            }
          })
          .catch(err => console.error(err));
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
    // 發送SMS計時
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
            {getFieldDecorator('Email', {
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
