import * as THREE from 'three'
import gsap from 'gsap'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()


const geometry3 = new THREE.SphereGeometry(1, 25,25 )
const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true})
const mesh3 = new THREE.Mesh(geometry3, material3)
scene.add(mesh3)
const geometry4 = new THREE.SphereGeometry(0.1, 16,14 )
const material4 = new THREE.MeshBasicMaterial({ color: 'blue', wireframe:true})
const mesh4 = new THREE.Mesh(geometry4, material4)
scene.add(mesh4)
mesh4.position.y = 0
mesh4.position.x = 0
const geometry5 = new THREE.SphereGeometry(0.025, 16, 14)
const material5 = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true })
const mesh5 = new THREE.Mesh(geometry5, material5)
scene.add(mesh5)


const sizes = {
    width: 800,
    height: 600
}


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 6
camera.lookAt(mesh4.position)
scene.add(camera)

window.addEventListener('mousemove', (event) =>
    {
        console.log(event.clientX, event.clientY)
    })

    const cursor = {
        x: 0,
        y: 0
    }
    
    window.addEventListener('mousemove', (event) =>
    {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = event.clientY / sizes.height - 0.5
    
        console.log(cursor.x, cursor.y)
    })





const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

let angle = 0;
let smallAngle = 0; //satelitt

renderer.setSize(sizes.width, sizes.height)




const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    angle += 0.1/60;
    console.log(mesh4.position)

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh4.position)


 

    // Set the blue ball’s position in a circular orbit around the red ball
    const radius = 1.7; // Distance from the center
    mesh4.position.x = radius * Math.cos(angle);
    mesh4.position.z = radius * Math.sin(angle);

    smallAngle += 0.05;
    const smallRadius = 0.3;
    mesh5.position.x = mesh4.position.x + smallRadius * Math.cos(smallAngle);
    mesh5.position.z = mesh4.position.z + smallRadius * Math.sin(smallAngle);


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()