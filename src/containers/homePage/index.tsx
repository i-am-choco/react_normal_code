import React, { useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointsBuffer } from '@react-three/drei'
import * as THREE from 'three'

const AroundLight = () => {
    const aroundLight = useRef<THREE.PointLight>()

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        if (elapsedTime <= Math.PI) {
            aroundLight.current.position.x = Math.cos(elapsedTime) * (8 + Math.cos(elapsedTime * 0.32))
            aroundLight.current.position.y = Math.cos(elapsedTime) * (8 + Math.cos(elapsedTime * 0.32))
            aroundLight.current.position.z = Math.cos(elapsedTime) * (8 + Math.cos(elapsedTime * 0.32))
        }
    })
    return <pointLight ref={aroundLight} color={'#ffcccc'} />
}

const Ball = () => {
    // 获取相机实例和场景
    const { camera } = useThree()

    // 设置相机位置
    camera.position.set(0, -0.25, 3)
    return (
        <mesh>
            <AroundLight />
            <sphereGeometry />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    )
}

const Star = () => {
    const pointsRef = useRef<THREE.Points>()
    let positions: Float32Array[] = Array.from({ length: 100 }).map((_, i) => {
        return new Float32Array([i * 0.2, i * 0.2, -20])
    })
    let colorList: Float32Array[] = Array.from({ length: 100}).map((_, i) => {
        const color = new THREE.Color('hotpink');
        // color.setHSL(i / 10, 1, 0.5); // 使用 HSL 颜色空间进行渐变
        return new Float32Array(color.toArray())

    })
    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        if (elapsedTime <= Math.PI) {
            pointsRef.current.position.x = Math.cos(elapsedTime) * (100 + Math.cos(elapsedTime * 0.32))
            pointsRef.current.position.y = Math.cos(elapsedTime) * (100 + Math.cos(elapsedTime * 0.32))
            pointsRef.current.position.z = -Math.cos(elapsedTime) * (100 + Math.cos(elapsedTime * 0.32))
        }
    })

    return (
        <group>
            <Points ref={pointsRef}>
                <pointsMaterial color={'hotpink'} />
                {Array.from({ length: 10 }).map((_, i) => {
                    return <PointsBuffer key={i} positions={positions[i]} colors={colorList[i]} />
                })}
                <spotLight intensity={1} distance={5} rotation={[4, 4, 4]} />
            </Points>
        </group>
    )
}

const Time = () => {
    return <div></div>
}

export const HomePage = () => {
    useLayoutEffect(() => {})

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas>
                <color attach="background" args={['black']} />
                <Ball />
                <Star />
            </Canvas>
            <Time />
        </div>
    )
}
