import React from 'react';
import {Button, Spin, Form, Select, notification} from "antd";
import axios from 'axios';


class TimetableSetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataReady: false,
            validActions: [],
            token: props.token,
            pk: props.pk,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/get_valid_actions/${this.state.pk}/`,
            {
                'headers': {
                    Authorization: `Token ${this.state.token}`
                }
            }).then((response) => {
            console.log(response.data);
            this.setState({
                validActions: response.data,
                dataReady: true,
            });
        }).catch((error) => console.log(error));
    }

    getForm = (data) => {
        return data.map((elem, index) =>
            <Form.Item key={index} label={`${elem.hour} o'clock`} defaultValue='Sleep' name={elem.hour}>
                <Select>
                    {elem.actions.map((action, i) => <Select.Option key={i} value={action}>{action}</Select.Option>)}
                </Select>
            </Form.Item>)
    }

    postActions = (data) => {
        let res = [];
        for (let key in data) {
            res.push({action: data[key], hour: key})
        }
        axios.post(`http://localhost:8000/set_timetable/${this.state.pk}/`, res, {
            'headers': {
                Authorization: `Token ${this.state.token}`
            }
        }).then((response) => {
            notification.open({
                message: 'Timetable processed',
                description: response.data.message,
                placement: 'bottomLeft'
            });
        }).catch((error) => console.log(error));
    }


    render = () => {
        return this.state.dataReady ? (
            <Form onFinish={this.postActions}
                  labelCol={{
                      span: 4,
                  }}
                  wrapperCol={{
                      span: 4,
                  }}
                  initialValues={{
                      0: 'Sleep',
                      1: 'Sleep',
                      2: 'Sleep',
                      3: 'Sleep',
                      4: 'Sleep',
                      5: 'Sleep',
                      6: 'Sleep',
                      7: 'Sleep',
                      8: 'Sleep',
                      9: 'Sleep',
                      10: 'Sleep',
                      11: 'Sleep',
                      12: 'Sleep',
                      13: 'Sleep',
                      14: 'Sleep',
                      15: 'Sleep',
                      16: 'Sleep',
                      17: 'Sleep',
                      18: 'Sleep',
                      19: 'Sleep',
                      20: 'Sleep',
                      21: 'Sleep',
                      22: 'Sleep',
                      23: 'Sleep',
                  }}
            >
                {this.getForm(this.state.validActions)}
                <Form.Item wrapperCol={{span: 12, offset: 4}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        ) : <Spin size="large"/>;
    }
}


export default TimetableSetter;