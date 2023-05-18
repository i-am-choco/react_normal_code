import React, { useEffect } from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export const House = () => {
    const gui = new dat.GUI()
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    camera.position.set(4, 2, 5)

    const renderer = new THREE.WebGLRenderer()
    const textureLoader = new THREE.TextureLoader()

    const clock = new THREE.Clock()

    // 草纹理
    const grassColorTexture = textureLoader.load('/hauntedHouse/grass/color.jpg')
    const grassAmbientOcclusionTexture = textureLoader.load('/hauntedHouse/grass/ambientOcclusion.jpg')
    const grassNormalTexture = textureLoader.load('/hauntedHouse/grass/normal.jpg')
    const grassRoughnessTexture = textureLoader.load('/hauntedHouse/grass/roughness.jpg')

    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping

    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping

    // 墙纹理
    const bricksColorTexture = textureLoader.load('/hauntedHouse/bricks/color.jpg')
    const bricksAmbientOcclusionTexture = textureLoader.load('/hauntedHouse/bricks/ambientOcclusion.jpg')
    const bricksNormalTexture = textureLoader.load('/hauntedHouse/bricks/normal.jpg')
    const bricksRoughnessTexture = textureLoader.load('/hauntedHouse/bricks/roughness.jpg')

    // 门纹理
    const doorColorTexture = textureLoader.load('/hauntedHouse/door/color.jpg')
    const doorAlphaTexture = textureLoader.load('/hauntedHouse/door/alpha.jpg')
    const doorAmbientOcclusionTexture = textureLoader.load('/hauntedHouse/door/ambientOcclusion.jpg')
    const doorHeightTexture = textureLoader.load('/hauntedHouse/door/height.jpg')
    const doorNormalTexture = textureLoader.load('/hauntedHouse/door/normal.jpg')
    const doorMetalnessTexture = textureLoader.load('/hauntedHouse/door/metalness.jpg')
    const doorRoughnessTexture = textureLoader.load('/hauntedHouse/door/roughness.jpg')

    // 房子
    const house = new THREE.Group()
    scene.add(house)

    // 墙壁
    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2.5, 4),
        new THREE.MeshStandardMaterial({
            map: bricksColorTexture,
            aoMap: bricksAmbientOcclusionTexture,
            normalMap: bricksNormalTexture,
            roughnessMap: bricksRoughnessTexture,
        })
    )
    walls.position.y = 1.25
    house.add(walls)

    // 屋顶
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 1, 4),
        new THREE.MeshStandardMaterial({
            color: '#b35f45',
        })
    )
    roof.rotation.y = Math.PI * 0.25
    roof.position.y = 2.5 + 0.5
    house.add(roof)

    // 地板
    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floorTexture = new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
    const floor = new THREE.Mesh(floorGeometry, floorTexture)
    floor.position.y = 0
    floor.rotation.x = -Math.PI * 0.5
    scene.add(floor)

    // 门
    const door = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 100, 100),
        new THREE.MeshStandardMaterial({
            map: doorColorTexture,
            transparent: true,
            alphaMap: doorAlphaTexture,
            aoMap: doorAmbientOcclusionTexture,
            displacementMap: doorHeightTexture,
            displacementScale: 0.1,
            normalMap: doorNormalTexture,
            metalnessMap: doorMetalnessTexture,
            roughnessMap: doorRoughnessTexture,
        })
    )
    door.position.set(0, 1, 2.001)
    house.add(door)

    // 丛林
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
    const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush1.scale.set(0.5, 0.5, 0.5)
    bush1.position.set(0.8, 0.2, 2.2)

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush2.scale.set(0.2, 0.2, 0.25)
    bush2.position.set(1.4, 0.1, 2.1)

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush3.scale.set(0.5, 0.5, 0.5)
    bush3.position.set(-0.8, 0.2, 2.2)

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush4.scale.set(0.2, 0.2, 0.25)
    bush4.position.set(-1.4, 0.1, 2.1)

    scene.add(bush1, bush2, bush3, bush4)

    // 坟墓群
    const graves = new THREE.Group()
    scene.add(graves)

    const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1)
    const graveMaterial = new THREE.MeshStandardMaterial({ color: '#727272' })

    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 6 + 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        const grave = new THREE.Mesh(graveGeometry, graveMaterial)
        grave.position.set(x, 0.3, z)
        grave.rotation.z = (Math.random() - 0.5) * 0.4
        grave.rotation.y = (Math.random() - 0.5) * 0.4
        grave.castShadow = true
        graves.add(grave)
    }

    // 物体环境灯
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01)
    scene.add(ambientLight)

    // 月光
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.position.set(4, 5, -2)
    gui.add(moonLight.position, 'x')
    gui.add(moonLight.position, 'y')
    gui.add(moonLight.position, 'z')
    scene.add(moonLight)

    // 聚光灯
    const pointLight = new THREE.PointLight('#FFFFFF', 0.5)
    // scene.add(pointLight)

    // 门灯
    const doorLight = new THREE.PointLight('#ff7d46', 3, 3)
    doorLight.position.set(0, 2.2, 2.7)
    house.add(doorLight)

    // 雾
    const fog = new THREE.Fog('#262837', 1, 20)
    scene.fog = fog

    // 幽灵群
    const ghost1 = new THREE.PointLight('#ff00ff', 3, 3)
    
    const ghost2 = new THREE.PointLight('#00ffff', 3, 3)

    const ghost3 = new THREE.PointLight('#ff7800', 3, 3)
    
    scene.add(ghost1, ghost2, ghost3 )

    const init = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor('#262837')
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        moonLight.castShadow = true
        doorLight.castShadow = true
        ghost1.castShadow = true
        ghost2.castShadow = true
        ghost3.castShadow = true
        walls.castShadow = true
        bush1.castShadow = true
        bush2.castShadow = true
        bush3.castShadow = true
        bush4.castShadow = true

        floor.receiveShadow = true
        doorLight.shadow.mapSize.width = 256 
        doorLight.shadow.mapSize.height = 256
        doorLight.shadow.camera. far = 7 

        ghost1.shadow.mapSize.width = 256 
        ghost1.shadow.mapSize.height = 256
        ghost1.shadow.camera. far = 7

        ghost2.shadow.mapSize.width = 256 
        ghost2.shadow.mapSize.height = 256
        ghost2.shadow.camera. far = 7

        ghost3.shadow.mapSize.width = 256 
        ghost3.shadow.mapSize.height = 256
        ghost3.shadow.camera. far = 7


        document.getElementById('house').appendChild(renderer.domElement)
    }

    const tick = () => {

        const elapsedTime = clock.getElapsedTime()

        const ghost1Angle = elapsedTime * 0.5
        ghost1.position.x = Math.cos(ghost1Angle) * 4
        ghost1.position.z = Math.sin(ghost1Angle) * 4
        ghost1.position.y = Math.sin(elapsedTime * 3)
    
        const ghost2Angle = - elapsedTime * 0.32
        ghost2.position.x = Math.cos(ghost2Angle) * 5
        ghost2.position.z = Math.sin(ghost2Angle) * 5
        ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    
        const ghost3Angle = - elapsedTime * 0.18
        ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
        ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
        ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    useEffect(() => {
        const controls = new OrbitControls(camera, document.querySelector('#house'))
        controls.enableDamping = true
        controls.update()

        init()
        tick()

        // 全屏
        window.addEventListener('dblclick', () => {
            if (!document.fullscreenElement) {
                document.getElementById('house').requestFullscreen()
            } else {
                document.exitFullscreen()
            }
        })

        return () => {
            window.removeEventListener('dblclick', () => {})
        }
    }, [])

    return <div id="house"></div>
}
