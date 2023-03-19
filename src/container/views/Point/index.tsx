import { AutoSearchBar } from '@components/AutoSearchBar'
import { ComponentExt } from '@utils/reactExt'
import { SearchOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React from 'react'
interface IState{
    
}
export class Pointmark extends ComponentExt {
    render() {
        return (
            <>
                {/** 搜索组件 */}
                <Row>
                    <AutoSearchBar />
                    <SearchOutlined
                        twoToneColor="#d9d9d9"
                        style={{ fontSize: 14, padding: 8, border: '1px solid #d9d9d9', borderLeft: 0 }}
                    />
                </Row>
                <Row>
                    {/** 左侧为位置对应信息 */}
                    <Col></Col>
                    {/** 右侧为位置在地图上对应的坐标标注点 */}
                    <Col></Col>
                </Row>
            </>
        )
    }
}
