import React from 'react';
import {withRouter} from 'react-router-dom';

import DisplayTemplate from "./DisplayTemplate";
import {Button, notification} from "antd";

import axios from 'axios';
import {notify_of_api_failure, url_base} from "../helpers";


class Messages extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `${url_base}messages/${this.state.pk}/`;
        this.title = "Your Messages";
        this.extra = <Button onClick={this.clearMessages}>Clear</Button>;
    }

    clearMessages = () => {
        axios.post(`${url_base}clearmessages/${this.state.pk}/`, {},
            {'headers': {Authorization: `Token ${this.state.token}`}}
        ).then((_) =>
            notification.open({
                message: 'Messages cleared',
                placement: 'bottomLeft'
            })
        ).catch(notify_of_api_failure);
        this.props.history.push('/');
    }

    dataProcessor = (data) => {
        return data.map((elem) => elem['text']);
    }

}


export default withRouter(Messages);
