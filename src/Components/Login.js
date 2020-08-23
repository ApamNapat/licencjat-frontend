import React from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import axios from 'axios';
import {notify_of_api_failure, url_base} from "../helpers";


const postLogin = (data, loginProcessor) => {
    axios.post(`${url_base}get_token/`, data).then((response) => {
        loginProcessor(response.data.token, response.data.pk);
    }).catch(notify_of_api_failure);
}

const Login = (props) => {
    return (
        <Row>
            <Col span={6}>
                <Form
                    size="medium"
                    name="login"
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
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
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

export default Login;