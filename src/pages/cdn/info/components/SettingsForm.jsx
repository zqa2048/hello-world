import React from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Form, Input } from 'antd';

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

const SettingsForm = ({ form: { getFieldDecorator } }) => (
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
  </Form>
);

export default Form.create()(
  connect(({ loading }) => ({
    // submitting: loading.effects['formBasicForm/submitRegularForm'],
  }))(SettingsForm),
);
