import { ComponentExt } from "@utils/reactExt";
import React, { useEffect } from "react";
import * as THREE from 'three';
import { OrthographicCamera } from "three";

// export class Page extends ComponentExt{
//     render() {
//         return (
//             <div>Page</div>
//         )
//     }
// }

export const Page = ()=>{
    // 场景
    const scene = new THREE.Scene();
    // 相机
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // 四边形几何体
    const geometry = new THREE.BoxGeometry(1,1,1);
    // 
    const material = new THREE.MeshPhongMaterial({color: 'red'});
    const mesh = new THREE.Mesh( geometry, material);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    const ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.5);
    // 渲染器
    const renderer  = new THREE.WebGLRenderer();

    
    const init = () => {
        // 幕布
        
        scene.add(mesh);

        camera.position.set(3,3,3);
        camera.lookAt(mesh.position);

        pointLight.position.set(3,2,1);
        scene.add(pointLight);

        scene.add(ambientLight);

        

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene,camera);
        document.getElementById('page').appendChild(renderer.domElement)

    }

    const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
    }


    useEffect(()=>{
        init();
        animate();
    },[])
    return <div id="page"></div>
}