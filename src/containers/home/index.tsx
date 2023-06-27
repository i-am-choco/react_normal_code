import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.less'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number] & { url: string }

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

const items: MenuItem[] = [
    getItem('Homepage', '0', getUrl('/demo')),
]

export const HomeManage: React.FC = () => {
    const [curMenu, setCurMenu] = useState('0')
    const [curUrl, setCurUrl] = useState<string>(items[0]['url'])

    useEffect(() => {
        console.log()
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{background: '#fff', marginBottom: 13}}>
                <h1 className="homepage-logo">Choco Leong</h1>
                <Menu
                    selectedKeys={[curMenu]}
                    mode="horizontal"
                    items={items}
                    onSelect={(info) => {
                        setCurMenu(info.key)
                        setCurUrl(items[Number(info.key)]['url'])
                    }}
                />
            </Header>
            <Content style={{ margin: '0 16px' }}>
                <iframe style={{ width: '100%', height: '100%', border: 'none' }} src={curUrl}></iframe>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}
