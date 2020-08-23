import React from 'react';
import {Button, Spin, Form, Select, notification} from "antd";
import axios from 'axios';
import {notify_of_api_failure, url_base} from "../helpers";


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
        axios.get(`${url_base}get_valid_actions/${this.state.pk}/`,
            {'headers': {Authorization: `Token ${this.state.token}`}}
        ).then((response) => {
            this.setState({
                validActions: response.data,
                dataReady: true,
            });
        }).catch(notify_of_api_failure);
    }

    getForm = (data) => {
        return data.map((elem, index) =>
            <Form.Item key={index} label={`${elem.hour} o'clock`} defaultValue='Sleep' name={elem.hour}>
                <Select>
                    {elem.actions.map((action, i) =>
                        <Select.Option
                            key={i}
                            value={action.name}>{`${action.name}${action.semester !== null ? ` (Semester: ${action.semester})` : ""}`}
                        </Select.Option>)}
                </Select>
            </Form.Item>)
    }

    postActions = (data) => {
        let res = [];
        for (let key in data) {
            res.push({action: data[key], hour: key})
        }
        axios.post(`${url_base}set_timetable/${this.state.pk}/`, res,
            {'headers': {Authorization: `Token ${this.state.token}`}}
        ).then((response) => {
            notification.open({
                message: 'Timetable processed',
                description: response.data.message,
                placement: 'bottomLeft'
            });
        }).catch(notify_of_api_failure);
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