// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Spin, Space } from 'antd';

// CSS
import './login.css'




class LoginPage extends Component {


    constructor(props) {
        super(props)

    }



    render() {
        return (
            <Space size="middle">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
            </Space>
        )
    }
}



export default LoginPage