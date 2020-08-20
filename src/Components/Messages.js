import React from 'react';
import {withRouter} from 'react-router-dom';

import DisplayTemplate from "./DisplayTemplate";
import {Button, notification} from "antd";

import axios from 'axios';


class Messages extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `http://localhost:8000/messages/${this.state.pk}/`;
        this.title = "Your Messages";
        this.extra = <Button onClick={this.clearMessages}>Clear</Button>;
    }

    clearMessages = () => {
        notification.open({
            message: 'Messages cleared',
            placement: 'bottomLeft'
        })
        axios.post(`http://localhost:8000/clearmessages/${this.state.pk}/`, {}, {
                'headers': {
                    Authorization: `Token ${this.state.token}`
                }
            }
        ).then((response) =>
            console.log(response)
        ).catch((error) => console.log(error));
        this.props.history.push('/');
    }

    dataProcessor = (data) => {
        return data.map((elem) => elem['text']);
    }

}


export default withRouter(Messages);
