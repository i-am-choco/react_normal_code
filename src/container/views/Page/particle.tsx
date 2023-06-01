import React, { useEffect } from 'react'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const Particle = () => {
    const scene = new THREE.Scene()
    const gui = new dat.GUI()
    const camera = new THREE.PerspectiveCamera()
    camera.position.z = 3
    scene.add(camera)
    const renderer = new THREE.WebGLRenderer()
    const clock = new THREE.Clock()
    const count = 50000
    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)


    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10
        colors[i] = Math.random()
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))


    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('/particles/1.png')

    // Material
    const particlesMaterial = new THREE.PointsMaterial()

    particlesMaterial.size = 0.1
    particlesMaterial.sizeAttenuation = true

    particlesMaterial.color = new THREE.Color('#ff88cc')

    particlesMaterial.transparent = true
    particlesMaterial.alphaMap = particleTexture
    // particlesMaterial.alphaTest = 0.01
    // particlesMaterial.depthTest = false
    particlesMaterial.depthWrite = false
    particlesMaterial.blending = THREE.AdditiveBlending

    particlesMaterial.vertexColors = true

    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)


    const init = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        document.getElementById('particle').appendChild(renderer.domElement)
    }

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        // Update particles
        // for (let i = 0; i < count; i++) {
        //     let i3 = i * 3
        //     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions ,i3+1))
        //     // particlesGeometry.attributes.position['array'][i3 + 1] = Math.sin(elapsedTime + x)
        //     // const x = particlesGeometry.attributes.position.array[i3]
        //     // particlesGeometry.setAttribute('position.array ', Math.sin(elapsedTime + x))
        // }   
        particlesGeometry.attributes.position.needsUpdate = true

        // Update controls
        const controls = new OrbitControls(camera, document.querySelector('#particle'))
        controls.enableDamping = true
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    useEffect(() => {
        init()
        tick()
    }, [])

    return <div id="particle"></div>
}
