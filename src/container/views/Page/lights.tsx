import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

export const Lights = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    const renderer = new THREE.WebGLRenderer()
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 15)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const geometry = new THREE.PlaneGeometry(12, 12)
    const material = new THREE.MeshStandardMaterial()
    const axesHelper = new THREE.AxesHelper()
    const gui = new dat.GUI()
    material.roughness = 0.4

    // 配置灯
    // 环境灯
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight.position.set(1, 0.25, 0)
    // 半球光
    const hemisphere = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
    // 点源灯
    const pointLight = new THREE.PointLight(0x00fffc, 0.5)
    pointLight.position.set(1, -0.5, 1)

    // 平面光光源
    const reactAreaLight = new THREE.RectAreaLight(0x4c00ff, 2, 1, 1)
    reactAreaLight.position.set(-1.5, 0, 1.5)
    

    // 聚光灯
    const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 7, Math.PI, 0.25, 1)
    spotLight.position.set(0, 2, 3)

    const init = () => {
        const sphere = new THREE.Mesh(sphereGeometry, material)
        sphere.position.x = 0.5
        const cube = new THREE.Mesh(cubeGeometry, material)
        cube.position.x = -1
        const plane = new THREE.Mesh(geometry, material)
        plane.rotation.x = - Math.PI * 0.5
        plane.position.y = - 0.65
        scene.add(
            plane,
            sphere,
            cube,
            axesHelper,
            ambientLight,
            directionalLight,
            hemisphere,
            pointLight,
            reactAreaLight,
            spotLight,
        )
        camera.position.z = 5
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        document.getElementById('lights').appendChild(renderer.domElement)
    }

    const lights = () => {
        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01)
    }

    const tick = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, document.querySelector('#lights'))
        controls.enableDamping = true
        controls.update()
        init()
        lights()
        tick()
    })
    return <div id="lights"></div>
}
