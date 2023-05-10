import { ComponentExt } from '@utils/reactExt'
import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrthographicCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import * as dat from 'dat.gui';

import doorColor from '../../assets/texture/door/color.jpg';
import doorAlpha from '../../assets/texture/door/alpha.jpg';
import doorAmbient from '../../assets/texture/door/ambientOcclusion.jpg';
import doorHeight from '../../assets/texture/door/height.jpg';
import doorMetalness from '../../assets/texture/door/metalness.jpg';
import doorNormal from '../../assets/texture/door/normal.jpg';
import doorRoughness from '../../assets/texture/door/roughness.jpg';
// import matcap1 from '../../assets/texture/matcaps/1.png';
import gradients3 from '../../assets/texture/gradients/3.jpg';

import e1 from '../../assets/texture/environmentMaps/0/nx.jpg';
import e2 from '../../assets/texture/environmentMaps/0/ny.jpg';
import e3 from '../../assets/texture/environmentMaps/0/nz.jpg';
import e4 from '../../assets/texture/environmentMaps/0/px.jpg';
import e5 from '../../assets/texture/environmentMaps/0/py.jpg';
import e6 from '../../assets/texture/environmentMaps/0/pz.jpg';



export const Material = () => {
    // 场景
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // 纹理
    const texture = new THREE.TextureLoader();
    const cubeTexture = new THREE.CubeTextureLoader();

    // 调试器
    const gui = new dat.GUI();

    const doorColorTexture = texture.load(doorColor);
    const doorAlphaTexture = texture.load(doorAlpha);
    const doorAmbientTexture = texture.load(doorAmbient);
    const doorHeightTexture = texture.load(doorHeight);
    const doorMetalnessTexture = texture.load(doorMetalness);
    const doorNormalTexture = texture.load(doorNormal);
    const doorRoughnessTexture = texture.load(doorRoughness);
    const matcap1Texture = texture.load('/textur/matcaps/1.png');
    const gradients3Texture = texture.load(gradients3); 
    const environmentTexture = cubeTexture.load([
        e4,e1,e5,e2,e6,e3,
    ])

    // 球
    const geometry = new THREE.SphereGeometry(0.5, 16, 16)
    // const material = new THREE.MeshBasicMaterial({color: 'red'})
    const material = new THREE.MeshStandardMaterial();
    // material.map = doorColorTexture;
    // material.aoMap = doorAmbientTexture;
    // material.aoMapIntensity = 1;
    // // 使用以下语句会导致变形是因为几何体没有足够多的顶点支撑 
    // material.displacementMap = doorHeightTexture;
    // // 可以使用以下属性对上一句进行几何体修复 
    // material.displacementScale = 0.1
    // // 金属感
    // material.metalnessMap = doorMetalnessTexture; 
    // material.roughnessMap = doorRoughnessTexture;
    // material.normalMap = doorNormalTexture;
    // material.transparent = true;
    // material.alphaMap =doorAlphaTexture;

    // 环境材质
    material.metalness = 0.7;
    material.roughness = 0.2;
    material.envMap = environmentTexture;


    const sphere = new THREE.Mesh(geometry, material)
    // 正方
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        material,
    )
    // 环
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.3,0.2,16,32),
        material,
    )
    const pointLight = new THREE.PointLight(0xffffff, 1)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
    
    // 定时器
    const clock = new THREE.Clock();
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    // 尺寸
    const [sizes, setSize] = useState<{ height: number; width: number }>({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const init = () => {
        // 幕布
        sphere.position.x = 0;
        plane.position.x = -1.5;
        torus.position.x = 1.5;

        gui.add(material, 'roughness').min(0).max(1).step(0.01);
        gui.add(material, 'metalness').min(0).max(1).step(0.01);


        scene.add(sphere, plane, torus);
        camera.position.set(0, 0, 3)
        camera.lookAt(sphere.position)

        pointLight.position.set(3, 2, 1)
        scene.add(pointLight)

        scene.add(ambientLight)

        renderer.setSize(sizes.width, sizes.height)
        renderer.render(scene, camera)
        document.getElementById('material').appendChild(renderer.domElement)
    }

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();



        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, document.querySelector('#material'))
        controls.enableDamping = true
        controls.update()

        init()
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
                document.getElementById('material').requestFullscreen()
            } else {
                document.exitFullscreen()
            }
        })

        return () => {
            window.removeEventListener('resize', () => {})
            window.removeEventListener('dblclick', () => {})
        }
    }, [])

    return <div id="material"></div>
}
