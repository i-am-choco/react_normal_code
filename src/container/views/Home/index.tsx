import { AutoSearchBar } from '@components/AutoSearchBar'
import { ComponentExt } from '@utils/reactExt'
import { AutoComplete, Input, Rate } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'

interface IState {
    center: string | BMapGL.Point
    keyWord: string
}
export class Home extends ComponentExt<{}, IState> {
    state: IState = {
        center: new BMapGL.Point(116.404449, 39.914889),
        keyWord: '',
    }
    render() {
        return (
            <div>
                <Rate allowHalf defaultValue={2.5} />
                <AutoSearchBar
                    onSelect={(v) => {
                        console.log(v)
                    }}
                    placeholder="请输入目标地点"
                    value={this.state.keyWord}
                    onChange={(v: string) => {
                        this.setState({ keyWord: v })
                    }}
                ></AutoSearchBar>
                <SearchOutlined />
            </div>
        )
    }
}
