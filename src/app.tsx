import React from 'react'
import './app.less'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
// import { HomeManage } from 'containers/home'
import HomeManage from 'containers/home'
import { Provider } from 'react-redux'
import store from 'store'
import { HomePage } from 'containers/homePage'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {/* 工作台 */}
                    <Route path="/" element={<HomeManage />} />
                    <Route path="/homePage" element={<HomePage />} />{/* 首页动画图 */}
                    {/* <Route path="/demo" element={<text>demo</text>}></Route> */}
                </Routes>
            </BrowserRouter>
            </Provider>
        )
    }
}
