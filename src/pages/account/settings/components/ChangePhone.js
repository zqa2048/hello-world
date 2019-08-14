import React, { Component } from 'react';
import { formatMessage, getLocale } from 'umi/locale';
import { Form, Input, Button, Modal, Row, Col, Alert, Select } from 'antd';
import { connect } from 'dva';
// import { getPeopleGuid } from '@/utils/commonFunc';
import { phoneVerify } from '@/utils/validators';
// import FormConfig from '../../../../config/form.config';

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
      nationCodeLists: [],
      nationCode: 86,
      count: 0,
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     nationCodeLists: FormConfig.FormOptions.nation[getLocale()],
  //   });
  // }

  componentDidUpdate(preProps) {
    if (preProps.visible !== this.props.visible) {
      if (!this.props.visible) {
        clearInterval(this.interval);
        this.props.form.resetFields();
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

    // 驗證電話並發請求
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
              Phone: phone,
              // PeopleGuid: getPeopleGuid(),
              NationCode: this.state.nationCode.toString(),
              Type: 4,
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
          Phone: values.Phone_ChangePhone,
          Code: values.Code_ChangePhone,
          PeopleGuid: getPeopleGuid(),
          NationCode: this.state.nationCode.toString(),
        };
        dispatch({
          type: 'user/updateUserPhone',
          payload: submitValues,
        })
          .then(status => {
            if (status && status.StatusCode === 0) {
              this.setState({
                success: true,
                error: false,
              });
              this.props.changePhoneSuccess();
            } else if (status && status.StatusCode !== 0 && status.Info) {
              this.setState({
                error: true,
                errorTip: status.Info,
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

  handleNationCodeChange = e => {
    this.setState({
      nationCode: e,
    });
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
    const { count, success, error, errorTip, nationCodeLists } = this.state;
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
