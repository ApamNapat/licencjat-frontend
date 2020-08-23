import {notification} from "antd";

export const notify_of_api_failure = (error) => {
    notification.open({
        message: 'Something went wrong fetching data',
        description: `Error message: ${error.message}`,
        placement: 'bottomLeft',
    });
};

export const url_base = 'http://localhost:8000/';
