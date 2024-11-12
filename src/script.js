import * as THREE from 'three'
import gsap from 'gsap'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()


const geometry3 = new THREE.SphereGeometry(1, 25,25 )
const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true})
const sun = new THREE.Mesh(geometry3, material3)
scene.add(sun)
const geometry4 = new THREE.SphereGeometry(0.1, 16,14 )
const material4 = new THREE.MeshBasicMaterial({ color: 'blue', wireframe:true})
const earth = new THREE.Mesh(geometry4, material4)
scene.add(earth)
const geometry5 = new THREE.SphereGeometry(0.025, 16, 14)
const material5 = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true })
const moon = new THREE.Mesh(geometry5, material5)
scene.add(moon)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
    {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        renderer.setSize(sizes.width, sizes.height)

    })


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 6
camera.lookAt(earth.position)
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
    console.log(earth.position)
    

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 30
    camera.lookAt(sun.position)


 

    // Set the blue ball’s position in a circular orbit around the red ball
    const radius = 1.7; // Distance from the center
    earth.position.x = radius * Math.cos(angle);
    earth.position.z = radius * Math.sin(angle);

    smallAngle += 0.05;
    const smallRadius = 0.3;
    moon.position.x = earth.position.x + smallRadius * Math.cos(smallAngle);
    moon.position.z = earth.position.z + smallRadius * Math.sin(smallAngle);


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()