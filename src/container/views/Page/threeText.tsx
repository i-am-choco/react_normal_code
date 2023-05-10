import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import typefaceFont from '../../assets/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

export const ThreeText = () => {
    // 场景
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)

    // 加载字体
    const fontLoader = new FontLoader()
    const textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load('/texture/matcaps/1.png')

    const axesHelper = new THREE.AxesHelper()

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
        scene.add(axesHelper)
        fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Hello Three.js', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelSize: 0.02,
                bevelThickness: 0.03,
                bevelOffset: 0,
                bevelSegments: 4,
            })

            textGeometry.computeBoundingBox()
            // 代码使其居中,反正自己慢慢挑，道理是这么个道理
            // textGeometry.translate(
            //     - textGeometry.boundingBox.max.x * 0.5,
            //     - textGeometry.boundingBox.max.y * 0.5,
            //     - textGeometry.boundingBox.max.z * 0.5,
            // )
            textGeometry.center()

            const textMateria = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
            const text = new THREE.Mesh(textGeometry, textMateria)
            // textMateria.wireframe = true;

            scene.add(text)
            camera.position.z = 5

            // camera.position.set(0, 0, 10);
            // camera.lookAt(text.position);

            // 添加环绕周围的几何体,暴力添加甜甜圈的方法
            // for(let i = 0; i < 100; i++ ){
            //      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
            //      const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
            //      const donut = new THREE.Mesh(donutGeometry, donutMaterial);

            //     donut.position.x = (Math.random() - 0.5) * 10;
            //     donut.position.y = (Math.random() - 0.5) * 10;
            //     donut.position.z = (Math.random() - 0.5) * 10;

            //     donut.rotation.x = (Math.random() * Math.PI);
            //     donut.rotation.y = (Math.random() * Math.PI)

            //     donut.scale.x = Math.random();
            //     donut.scale.y = Math.random();
            //     donut.scale.z = Math.random();

            //      scene.add(donut);
            // }

            // 优化方案后，添加甜甜圈的做法
            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
            for (let i = 0; i < 100; i++) {
                const donut = new THREE.Mesh(donutGeometry, donutMaterial)
                donut.position.x = (Math.random() - 0.5) * 10
                donut.position.y = (Math.random() - 0.5) * 10
                donut.position.z = (Math.random() - 0.5) * 10

                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI

                donut.scale.x = Math.random()
                donut.scale.y = Math.random()
                donut.scale.z = Math.random()

                scene.add(donut)
            }
        })

        // scene.add(mesh)

        pointLight.position.set(3, 2, 1)
        scene.add(pointLight)

        scene.add(ambientLight)

        renderer.setSize(sizes.width, sizes.height)
        renderer.render(scene, camera)
        document.getElementById('page').appendChild(renderer.domElement)
    }

    const animate = () => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    const tick = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    // const move = () => {
    //     requestAnimationFrame(move)
    //     mesh.position.x = cursor.x * 3
    //     mesh.position.y = cursor.y * 3
    //     renderer.render(scene, camera)
    // }

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
