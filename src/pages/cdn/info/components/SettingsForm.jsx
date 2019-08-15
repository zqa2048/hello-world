import React from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Radio, Select, Tag, Button } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;
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

const SettingsForm = ({ form: { getFieldDecorator, setFieldsValue, submitting } }) => {
  const handleRadioChange = e => {
    if (e.target.name === 'acc-type' && e.target.value === '1') {
      setFieldsValue({
        'acc-type-self': '',
      });
    }
  };

  return (
    <Form>
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
        <h3>
          <FormattedMessage id="cdn-info.title" />
        </h3>
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
          <Radio.Group name="acc-type" onChange={handleRadioChange}>
            <Radio value="1">
              <FormattedMessage id="cdn.form.value.acc-type.radio.1" />
            </Radio>
            <Radio value="2">
              <FormattedMessage id="cdn.form.value.acc-type.radio.2" />
            </Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.host-protocol" />}>
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
      <FormItem {...formItemLayout} label={<FormattedMessage id="cdn.form.label.acc-server" />}>
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
  );
};

export default Form.create()(
  connect(({ loading }) => ({
    // submitting: loading.effects['formBasicForm/submitRegularForm'],
  }))(SettingsForm),
);
