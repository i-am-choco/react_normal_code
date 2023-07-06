import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.less'
import store, { AppDispatch, RootState } from 'store'
import { UPDATE_CURRENT_IFRAME } from 'store/actionType'
import { updateCurrentIframe, updateCurrentIframeUrl } from 'store/action'
import { connect } from 'react-redux'
import { IHomePageManagerState } from 'store/homePageManager'

const { Header, Content, Footer, Sider } = Layout

export type MenuItem = Required<MenuProps>['items'][number] & { url: string }

interface IHomePageManagerProps extends IHomePageManagerState {
    updateCurrentIframe: (key: string) => void
    updateCurrentIframeUrl: (key: string) => void
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    url: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        url,
    } as MenuItem
}

function getUrl(str: string): string {
    const origin = window.location.origin
    return `${origin}${str}`
}

const items: MenuItem[] = [getItem('Homepage', '0', getUrl('/demo')), getItem('More', '1', getUrl('/demo'))]

const HomeManage: React.FC<IHomePageManagerProps> = ({
    currentUrl,
    currentKey,
    updateCurrentIframe,
    updateCurrentIframeUrl,
}) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', marginBottom: 13 }}>
                <h1 className="homepage-logo">Choco Leong</h1>
                <Menu
                    selectedKeys={[currentKey]}
                    mode="horizontal"
                    items={items}
                    onSelect={(info) => {
                        updateCurrentIframeUrl(items[Number(info.key)]['url'])
                        updateCurrentIframe(info.key)
                    }}
                />
            </Header>
            <Content style={{ margin: '0 16px' }}>
                <iframe style={{ width: '100%', height: '100%', border: 'none' }} src={currentUrl}></iframe>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default connect((state: RootState) => ({ ...state.homePageManager }), {
    updateCurrentIframe,
    updateCurrentIframeUrl,
})(HomeManage)
