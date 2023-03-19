import { AutoSearchBar } from '@components/AutoSearchBar'
import { ComponentExt } from '@utils/reactExt'
import { AutoComplete, Input, Rate, Row } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'

interface IState {
    keyWord: string
}
export class Home extends ComponentExt<{}, IState> {
    state: IState = {
        keyWord: '',
    }
    render() {
        return (
            <div>
                <Row align="middle" justify="center">
                    <AutoSearchBar
                        style={{width: 300}}
                        onSelect={(v) => {
                            console.log(v)
                        }}
                        placeholder="请输入目标地点"
                        value={this.state.keyWord}
                        onChange={(v: string) => {
                            this.setState({ keyWord: v })
                        }}
                    ></AutoSearchBar>
                    <SearchOutlined twoToneColor="#d9d9d9" style={{fontSize: 14, padding: 8, border: '1px solid #d9d9d9', borderLeft: 0}} />
                </Row>
            </div>
        )
    }
}
