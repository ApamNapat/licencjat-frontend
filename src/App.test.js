import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Status from "./Components/Status";
import axios from 'axios';
import {urlBase} from "./helpers";

jest.mock("axios");

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

it('App renders without crashing', () => {
    ReactDOM.render(<App/>, document.createElement('div'));
});


it('Status renders without crashing', async () => {
    axios.get.mockResolvedValue({data: {}});

    ReactDOM.render(<Status pk={1} token="token"/>, document.createElement('div'));

    expect(axios.get).toHaveBeenCalledWith(`${urlBase}userdata/1/`, {"headers": {"Authorization": "Token token"}});
});
