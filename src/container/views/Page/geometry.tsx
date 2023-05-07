import React, { useEffect } from 'react'
import * as THREE from 'three'

export const Geometry = () => {
    // 简单几何体
    const basicInit = () => {
        // 场景
        const scene = new THREE.Scene()
        // 相机
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        // 缓存几何体
        const geometry = new THREE.BufferGeometry()
        // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
        // 因为在两个三角面片里，这两个顶点都需要被用到。
        const vertices = new Float32Array([0, 0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0])
        // itemSize = 3 因为每个顶点都是一个三元组。
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        // 设置网格
        const mesh = new THREE.Mesh(geometry, material)
        // 灯光设置
        const pointLight = new THREE.PointLight(0xffffff, 1)
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
        // 渲染器
        const renderer = new THREE.WebGLRenderer()

        scene.add(mesh)
        camera.position.set(3, 3, 3)
        camera.lookAt(mesh.position)
        pointLight.position.set(3, 2, 1)
        scene.add(pointLight)
        scene.add(ambientLight)

        // 添加渲染器
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        document.getElementById('geometry').appendChild(renderer.domElement)
    }

    // funny缓存几何体
    const funnyInit = () => {
        // 场景
        const scene = new THREE.Scene()
        // 相机
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        // 缓存几何体
        const geometry = new THREE.BufferGeometry()

        const count = 50;

        const vertices = new Float32Array(count * 3 * 3);
        for(let i = 0; i< count * 3 *3 ; i++) {
            vertices[i] = Math.random() - 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
        // 设置网格
        const mesh = new THREE.Mesh(geometry, material)
        // 灯光设置
        const pointLight = new THREE.PointLight(0xffffff, 1)
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
        // 渲染器
        const renderer = new THREE.WebGLRenderer()

        scene.add(mesh)
        camera.position.set(3, 3, 3)
        camera.lookAt(mesh.position)
        pointLight.position.set(3, 2, 1)
        scene.add(pointLight)
        scene.add(ambientLight)

        // 添加渲染器
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        document.getElementById('geometry').appendChild(renderer.domElement)
    }

    useEffect(() => {
        // basicInit();
        funnyInit();
        console.log('加载完毕')
    }, [])

    return <div id="geometry"></div>
}
