import React, { useEffect } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

export const DBGUI = () => {
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 四边形几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // 设置网格
    const mesh = new THREE.Mesh(geometry, material)
    // 灯光设置
    const pointLight = new THREE.PointLight(0xffffff, 1)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    const init = () => {

        scene.add(mesh)

        camera.position.set(3, 3, 3)
        camera.lookAt(mesh.position)
        pointLight.position.set(3, 2, 1)
        scene.add(pointLight)
        scene.add(ambientLight)

        // 添加渲染器
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)

        // requestAnimationFrame(init);
        document.getElementById('dbgui').appendChild(renderer.domElement)
    }
    const tick = () => {
        // gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    const loadGui = () => {
        // 图像调试器
        const GUI = new dat.GUI()
        GUI.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('yPosition')
        // 不能在此添加一下代码，会不听的渲染这个gui调试器
        // renderer.render(scene, camera);
        // requestAnimationFrame(loadGui);
        GUI.add(material, 'wireframe');

        let paramster = {
            color: 0xff0000,
            spin: () => {
                gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
            }
        }

        // 改变颜色
        GUI.addColor(paramster, 'color').onChange(() => {
            material.color.set(paramster.color);
        });

        GUI.add(paramster, 'spin');
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, document.querySelector('#dbgui'))
        controls.enableDamping = true
        controls.update()
        init()
        tick()
        loadGui();
    }, [])

    return <div id="dbgui"></div>
}
