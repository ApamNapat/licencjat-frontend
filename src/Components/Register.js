import React from 'react';
import {Button, Form, Row, Col, Input} from "antd";
import axios from 'axios';
import {notify_of_api_failure, url_base} from "../helpers";


const postLogin = (data, loginProcessor) => {
    axios.post(`${url_base}authentication/registration/`, data).then((_) => {
            axios.post(`${url_base}get_token/`, {
                username: data.username,
                password: data.password1
            }).then((response) => {
                loginProcessor(response.data.token, response.data.pk);
            }).catch(notify_of_api_failure);
        }
    ).catch(notify_of_api_failure);
}

const Register = (props) => {
    return (
        <Row>
            <Col span={6}>
                <Form
                    size='medium'
                    name="register"
                    onFinish={(data) => postLogin(data, props.loginProcessor)}
                    onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item
                        label="Confirm Password"
                        name="password2"
                        rules={[
                            {
                                required: true,
                                message: 'Please retype your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password1') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Register;