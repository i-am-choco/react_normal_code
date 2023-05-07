import { ComponentExt } from '@utils/reactExt'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrthographicCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'

// export class Page extends ComponentExt{
//     render() {
//         return (
//             <div>Page</div>
//         )
//     }
// }

export const Page = () => {
    // 场景
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 四边形几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    //
    const material = new THREE.MeshPhongMaterial({ color: 'red' })
    const mesh = new THREE.Mesh(geometry, material)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    // 尺寸
    const [sizes, setSize] = useState<{ height: number; width: number }>({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const cursor = {
        x: 0,
        y: 0,
    }

    const init = () => {
        // 幕布

        scene.add(mesh)

        camera.position.set(3, 3, 3)
        camera.lookAt(mesh.position)

        pointLight.position.set(3, 2, 1)
        scene.add(pointLight)

        scene.add(ambientLight)

        renderer.setSize(sizes.width, sizes.height)
        renderer.render(scene, camera)
        document.getElementById('page').appendChild(renderer.domElement)
    }

    const animate = () => {
        requestAnimationFrame(animate)
        mesh.rotation.y += 0.02
        renderer.render(scene, camera)
    }

    const tick = () => {
        gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    const move = () => {
        requestAnimationFrame(move)
        mesh.position.x = cursor.x * 3
        mesh.position.y = cursor.y * 3
        renderer.render(scene, camera)
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, document.querySelector('#page'))
        controls.enableDamping = true
        controls.update()

        init()
        // animate();
        tick()
        window.addEventListener('resize', () => {
            // 实时更新尺寸
            setSize({
                height: window.innerHeight,
                width: window.innerWidth,
            })
            // 更新camera
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            // 更新renderer
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(window.devicePixelRatio)
        })

        // 全屏
        window.addEventListener('dblclick', () => {
            if (!document.fullscreenElement) {
                document.getElementById('page').requestFullscreen()
            } else {
                document.exitFullscreen()
            }
        })

        return () => {
            window.removeEventListener('resize', () => {})
            window.removeEventListener('dblclick', () => {})
        }
    }, [])

    return <div id="page"></div>
}
