import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export const Galaxy = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    camera.position.x = 3
    camera.position.y = 3
    camera.position.z = 3
    scene.add(camera)
    const renderer = new THREE.WebGLRenderer()
    const texture = new THREE.Texture()
    const clock = new THREE.Clock()
    const gui = new dat.GUI()
    let geometry: THREE.BufferGeometry = null
    let material: THREE.PointsMaterial = null
    let points: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> = null
    // 星点数量
    let paramer = {
        count: 1000,
        size: 0.02,
        radius: 5,
        branches: 3,
        spin: 1,
        randomness: 0.02,
        randomnessPower: 3,
        insideColor: '#ff6030',
        outsideColor: '#1b3984',
    }
    // 星系初始化
    const galaxyGeometry = () => {
        if (points !== null) {
            geometry.dispose()
            material.dispose()
            scene.remove(points)
        }

        geometry = new THREE.BufferGeometry()
        const position = new Float32Array(paramer.count * 3)
        const color = new Float32Array(paramer.count * 3)
        const colorInside = new THREE.Color(paramer.insideColor)
        const colorOutside = new THREE.Color(paramer.outsideColor)

        for (let i = 0; i < paramer.count; i++) {
            const i3 = i * 3
            const radius = paramer.radius * Math.random()
            const branchAngle = ((i % paramer.branches) / paramer.branches) * Math.PI * 2
            const spinAngle = radius * paramer.spin

            const randomX =
                Math.pow(Math.random(), paramer.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                paramer.randomness *
                radius
            const randomY =
                Math.pow(Math.random(), paramer.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                paramer.randomness *
                radius
            const randomZ =
                Math.pow(Math.random(), paramer.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                paramer.randomness *
                radius

            position[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            position[i3 + 1] = randomY
            position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            const mixedColors = colorInside.clone()
            mixedColors.lerp(colorOutside, radius / paramer.radius)

            color[i3] = mixedColors.r
            color[i3 + 1] = mixedColors.g
            color[i3 + 2] = mixedColors.b
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(color, 3))

        material = new THREE.PointsMaterial({
            size: paramer.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        })

        points = new THREE.Points(geometry, material)
        scene.add(points)
    }
    const init = () => {
        galaxyGeometry()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        document.getElementById('galaxy').appendChild(renderer.domElement)
    }

    const tick = () => {
        const controls = new OrbitControls(camera, document.querySelector('#galaxy '))
        controls.enableDamping = true
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    const loadGui = () => {
        gui.add(paramer, 'count').min(100).max(100000).step(100).onFinishChange(galaxyGeometry)
        gui.add(paramer, 'size').min(0.01).max(0.1).step(0.01).onFinishChange(galaxyGeometry)
        gui.add(paramer, 'radius').min(0.01).max(10).step(0.001).onFinishChange(galaxyGeometry)
        gui.add(paramer, 'branches').min(2).max(10).step(1).onFinishChange(galaxyGeometry)
        gui.add(paramer, 'spin').min(-5).max(5).step(1).onFinishChange(galaxyGeometry)
        gui.add(paramer, 'randomness').min(0.01).max(5).step(0.01).onFinishChange(galaxyGeometry)
        gui.add(paramer, 'randomnessPower').min(1).max(10).step(0.01).onFinishChange(galaxyGeometry)
        gui.addColor(paramer, 'insideColor').onFinishChange(galaxyGeometry)
        gui.addColor(paramer, 'outsideColor').onFinishChange(galaxyGeometry)
    }
    useEffect(() => {
        init()
        tick()
        loadGui()
    }, [])
    return <div id="galaxy"></div>
}
