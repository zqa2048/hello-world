import { Button, Card, Form, Icon, Input, Radio, Select, Tooltip, Tag } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
    md: {
      span: 10,
    },
  },
};
const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 7,
    },
  },
};

class BasicForm extends Component {
  state = {
    total: 0,
  };

  orderRef = React.createRef();

  componentDidMount() {
    const orderOptionNodesArray = this.orderRef.current.props.children;
    const defaultIndex = this.orderRef.current.props.value;
    const targetNode = orderOptionNodesArray.find(node => node.props.value === defaultIndex);

    if (targetNode) {
      this.setState({
        total: targetNode.props.price,
      });
    }
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formBasicForm/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  handleRadioChange = e => {
    if (e.target.name === 'acc-type' && e.target.value === '1') {
      this.props.form.setFieldsValue({
        'acc-type-self': '',
      });
    }
  };

  handleSelectChange = (e, option) => {
    if (option.props.price) {
      this.setState({
        total: option.props.price,
      });
    }
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    return (
      <PageHeaderWrapper content={<FormattedMessage id="cdn.basic.description" />}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              margin: 'auto',
              marginTop: 8,
              maxWidth: '1200px',
            }}
          >
            <FormItem
              label=""
              colon={false}
              style={{
                margin: 'auto',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h1 style={{ fontSize: 24 }}>
                <FormattedMessage id="cdn.basic.description" />
              </h1>
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.origin" />}>
              {getFieldDecorator('origin', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.origin' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'cdn.form.placeholder.origin',
                  })}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.site" />}>
              {getFieldDecorator('site', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.site' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'cdn.form.placeholder.site',
                  })}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.acc-type" />}>
              {getFieldDecorator('acc-type', {
                initialValue: '1',
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.acc-type' }),
                  },
                ],
              })(
                <Radio.Group name="acc-type" onChange={this.handleRadioChange}>
                  <Radio value="1">
                    <FormattedMessage id="cdn.form.value.acc-type.radio.1" />
                  </Radio>
                  <Radio value="2">
                    <FormattedMessage id="cdn.form.value.acc-type.radio.2" />
                  </Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="cdn.form.label.acc-type-self" />}
              style={{
                display: getFieldValue('acc-type') === '2' ? 'block' : 'none',
              }}
            >
              {getFieldDecorator('acc-type-self')(
                <Radio.Group>
                  <Radio value="1">
                    <FormattedMessage id="cdn.form.value.acc-type-self.radio.1" />
                  </Radio>
                  <Radio value="2">
                    <FormattedMessage id="cdn.form.value.acc-type-self.radio.2" />
                  </Radio>
                  <Radio value="3">
                    <FormattedMessage id="cdn.form.value.acc-type-self.radio.3" />
                  </Radio>
                  <Radio value="4">
                    <FormattedMessage id="cdn.form.value.acc-type-self.radio.4" />
                  </Radio>
                  <Radio value="5">
                    <FormattedMessage id="cdn.form.value.acc-type-self.radio.5" />
                  </Radio>
                  <Radio value="6">
                    <FormattedMessage id="cdn.form.value.acc-type-self.radio.6" />
                  </Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.backhost" />}>
              {getFieldDecorator('backhost', {
                initialValue: '1',
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.backhost' }),
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">
                    <FormattedMessage id="cdn.form.value.backhost.radio.1" />
                  </Radio>
                  <Radio value="2">
                    <FormattedMessage id="cdn.form.value.backhost.radio.2" />
                  </Radio>
                  <Tag color="#108ee9">{formatMessage({ id: 'backhost.tag' })}</Tag>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="cdn.form.label.host-protocol" />}
            >
              {getFieldDecorator('host-protocol', {
                initialValue: '1',
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.host-protocol' }),
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">
                    <FormattedMessage id="cdn.form.value.host-protocol.radio.1" />
                  </Radio>
                  <Radio value="2">
                    <FormattedMessage id="cdn.form.value.host-protocol.radio.2" />
                  </Radio>
                  <Tag color="#108ee9">{formatMessage({ id: 'host-protocol.tag' })}</Tag>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="cdn.form.label.acc-server" />}
            >
              {getFieldDecorator('acc-server', {
                initialValue: '1',
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.acc-server' }),
                  },
                ],
              })(
                <Select>
                  <Option value="1">
                    <FormattedMessage id="cdn.form.value.acc-server.select.1" />
                  </Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="cdn.form.label.order-set" />}
            >
              {getFieldDecorator('order-set', {
                initialValue: '1',
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.order-set' }),
                  },
                ],
              })(
                <Select ref={this.orderRef} name="order-set" onChange={this.handleSelectChange}>
                  <Option value="1" price="100">
                    <FormattedMessage id="cdn.form.value.order-set.select.1" />
                  </Option>
                  <Option value="2" price="200">
                    <FormattedMessage id="cdn.form.value.order-set.select.2" />
                  </Option>
                  <Option value="3" price="300">
                    <FormattedMessage id="cdn.form.value.order-set.select.3" />
                  </Option>
                  <Option value="4" price="400">
                    <FormattedMessage id="cdn.form.value.order-set.select.4" />
                  </Option>
                  <Option value="5" price="500">
                    <FormattedMessage id="cdn.form.value.order-set.select.5" />
                  </Option>
                  <Option value="6" price="600">
                    <FormattedMessage id="cdn.form.value.order-set.select.6" />
                  </Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="cdn.form.label.order-total-time" />}
            >
              {getFieldDecorator('order-total-time', {
                initialValue: '1',
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message:
                      formatMessage({ id: 'please.input' }) +
                      formatMessage({ id: 'cdn.form.label.order-total-time' }),
                  },
                ],
              })(
                <Select>
                  <Option value="1">
                    <FormattedMessage id="cdn.form.value.order-total-time.select.1" />
                  </Option>
                  <Option value="2">
                    <FormattedMessage id="cdn.form.value.order-total-time.select.2" />
                  </Option>
                  <Option value="3">
                    <FormattedMessage id="cdn.form.value.order-total-time.select.3" />
                  </Option>
                  <Option value="4">
                    <FormattedMessage id="cdn.form.value.order-total-time.select.4" />
                  </Option>
                </Select>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.cupon" />}>
              {getFieldDecorator('cupon')(
                <Input
                  placeholder={formatMessage({
                    id: 'cdn.form.placeholder.cupon',
                  })}
                  addonAfter={<a>{formatMessage({ id: 'cupon.curefresh.button' })}</a>}
                />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.price" />}>
              {getFieldDecorator('order-total-time')(<span>{this.state.total}</span>)}
            </FormItem>

            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="buy.button" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(
  connect(({ loading }) => ({
    submitting: loading.effects['formBasicForm/submitRegularForm'],
  }))(BasicForm),
);
