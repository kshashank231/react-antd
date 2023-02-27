import { Button, Form, Input, Select, Space, Layout } from 'antd';
import React, { useState } from 'react';
import { contentStyle, headerStyle } from './common';
import { Dashboard } from './components/Dashboard';
import { setItem } from './utils/localStorageUtil';
const { Option } = Select;
const { Header, Content } = Layout;

export const Home = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("formData");
    return JSON.parse(saved);
  });

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('hello', values);
        setItem('formData', form.getFieldsValue())
        setData(() => values)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[
        {
          required: true,
          message: 'Please select the country prefix!',
        },
      ]}
    >
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );

  if (data) {
    return <Dashboard userInfo={data} />
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout style={{height:"100vh"}}>
        <Header style={headerStyle} >
             Enter the following information
        </Header>
        <Content style={contentStyle}>
          <Form
            labelCol= {{span: 8}}
            wrapperCol= {{span: 16}}
            form={form}
            name="control-hooks"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Please input your last name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                  pattern: new RegExp(/^[0-9]+$/)
                }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="button" onClick={onSubmit}>
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Content>
      </Layout>
    </Space>
  );
};