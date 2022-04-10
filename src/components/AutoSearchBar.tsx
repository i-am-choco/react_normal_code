import { ComponentExt } from '@utils/reactExt'
import { AutoComplete, AutoCompleteProps } from 'antd'
import React from 'react'

interface IProp extends AutoCompleteProps {}
export class AutoSearchBar extends ComponentExt<IProp> {
    render() {
        return (
            <AutoComplete
                {...this.props}
                options={[]}
                onSearch={(v) => {
                    console.log(v)
                }}
            />
        )
    }
}
