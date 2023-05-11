import dat from 'dat.gui'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const Shadows = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    const renderer = new THREE.WebGLRenderer()
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 15)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const geometry = new THREE.PlaneGeometry(12, 12)
    const material = new THREE.MeshStandardMaterial()
    material.roughness = 0.7
    const axesHelper = new THREE.AxesHelper()
    const gui = new dat.GUI()

    // 灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(2, 2, -1)
    directionalLight.castShadow = true
    // 优化阴影尺寸
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    // 通过优化光的远近来优化阴影
    // 借助光辅助器
    const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

    const init = () => {
        const sphere = new THREE.Mesh(sphereGeometry, material)
        sphere.position.x = 0.5
        sphere.castShadow = true
        // const cube = new THREE.Mesh(cubeGeometry, material)
        // cube.position.x = -1
        const plane = new THREE.Mesh(geometry, material)
        plane.rotation.x = -Math.PI * 0.5
        plane.position.y = -0.65
        plane.receiveShadow = true
        // near和far不生效？？？？
        directionalLight.shadow.camera.near = 1
        directionalLight.shadow.camera.far = 6
        directionalLight.shadow.camera.top = 2
        directionalLight.shadow.camera.right = 2
        directionalLight.shadow.camera.bottom = -2
        directionalLight.shadow.camera.left = -2
        directionalLight.shadow.radius = 10
        directionalLightCameraHelper.visible = false
        scene.add(
            sphere,
            // cube,
            plane,
            ambientLight,
            directionalLight,
            directionalLightCameraHelper
        )

        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.05)
        gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
        gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001)
        gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001)

        camera.position.z = 5
        renderer.shadowMap.enabled = true
        // 使用下面那句，之前对阴影做的任何设置都无效
        // renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        // 开启阴影的关键给我
        document.getElementById('shadow').appendChild(renderer.domElement)
    }

    const tick = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, document.querySelector('#shadow'))
        controls.enableDamping = true
        controls.update()
        init()
        tick()
    })
    return <div id="shadow"></div>
}
