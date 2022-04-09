import { ComponentExt } from '@utils/reactExt'
import Map from 'react-bmapgl/Map'
import React from 'react'

export class DemoMap extends ComponentExt {
    render() {
        return <Map center={new BMapGL.Point(116.404449, 39.914889)} zoom={12} tilt={40}></Map>
    }
}
