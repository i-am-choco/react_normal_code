import { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import React from 'react'
import './index.less'
import { RootState } from 'store'
import { updateCurrentIframe, updateCurrentIframeUrl } from 'store/action'
import { connect } from 'react-redux'
import { IHomePageManagerState } from 'store/homePageManager'
import menuData from './menu.json'

const { Header, Content, Footer } = Layout

export type MenuItem = Required<MenuProps>['items'][number] & { url: string }

interface IHomePageManagerProps extends IHomePageManagerState {
    updateCurrentIframe: (key: string) => void
    updateCurrentIframeUrl: (key: string) => void
}

function getUrl(str: string): string {
    const origin = window.location.origin
    return `${origin}${str}`
}

const items: MenuItem[] = menuData?.menuList?.map(i => {
    return {...i, url: getUrl(i.path)}
})

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
            <Footer style={{ textAlign: 'center' }}>Choco Leong ©2023 Created by Choco </Footer>
        </Layout>
    )
}

export default connect((state: RootState) => ({ ...state.homePageManager }), {
    updateCurrentIframe,
    updateCurrentIframeUrl,
})(HomeManage)
