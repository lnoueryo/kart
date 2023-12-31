import { CanvasManager } from './canvas_manager'
import { Game } from './game'
import { Controller } from './controller'
import { MainKart } from './draw_objects/kart/main_kart'
import { Point } from './draw_objects/point/point'
import course from '../courses/basic.json'
import { Course } from './course/course'
import { Camera } from './draw_objects/camera/camera'
import { Vertex } from './draw_objects/point/vertex'

const createMainPlayer = () => {
    const vertices = [new Vertex(-5, 0, 5, 'line'), new Vertex(5, 0, 5, 'line'), new Vertex(5, 10, 5, 'line'), new Vertex(-5, 10, 5, 'line')]
    const position = new Point(0, 0, 0)
    const color = 'blue'
    const mass = 300
    const friction = 0
    const restitution = 0
    const maxVelocity = 5
    const accelerationTime = 10
    const decelerationRate = 0.0025
    const brakeDecelerationRate = 0.01
    return new MainKart(
        vertices,
        position,
        color,
        mass,
        friction,
        restitution,
        maxVelocity,
        accelerationTime,
        decelerationRate,
        brakeDecelerationRate
    )
}

const createCamera = () => {
    const vertices = [new Vertex(-5, 0, 5, 'line'), new Vertex(5, 0, 5, 'line'), new Vertex(5, 10, 5, 'line'), new Vertex(-5, 10, 5, 'line')]
    const position = new Point(0, 0, 0)
    const color = 'black'
    const mass = 0
    return new Camera(
        vertices,
        position,
        color,
        mass,
        0,
        0,
        200,
        20,
        0.005,
        0.1
    )
}

export const onStartGameClicked = () => {
    const buttons = document.getElementById('start-buttons')
    buttons.classList.add('hide');
    game.loadCourse(Course.convertJson(course))
    game.startGame()
    // timer = setInterval(() => {
    //     if(game.isGameOver()) {
    //         clearInterval(timer)
    //         buttons.classList.remove('hide');
    //     }
    // }, 100)
}

const showController = () => {
    const wrapper = document.getElementById('wrapper')
    const sideContainers = document.getElementsByClassName('side-container')
    const warning = document.getElementById('warning')

    if (isMobileDevice()) {
        if ((window.innerWidth - 200) < window.innerHeight) {
            // 縦向きまたは十分な画面サイズではない端末
            wrapper.classList.add('hide')
            warning.classList.remove('hide')
            return;
        }

        // 横向き
        Array.from(sideContainers).forEach(element => {
            element.classList.remove('hide');
        });
    } else {
        // PCの場合
        Array.from(sideContainers).forEach(element => {
            element.classList.add('hide');
        });
    }

    wrapper.classList.remove('hide')
    warning.classList.add('hide')
    // this.cm.adjustCanvasSize()
}

const isMobileDevice = () => {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

const main = () => {
    const top = document.getElementById('top')
    const bottom = document.getElementById('bottom')
    const left = document.getElementById('left')
    const right = document.getElementById('right')
    const execute = document.getElementById('execute')
    const cancel = document.getElementById('cancel')
    const contoller = new Controller(
        top,
        bottom,
        left,
        right,
        execute,
        cancel
    )

    const cm = new CanvasManager(canvas)
    const mainPlayer = createMainPlayer()

    const camera = createCamera()

    game = new Game(cm, contoller, mainPlayer, camera)
    // document.documentElement.requestFullscreen();
    showController()
    window.addEventListener('resize', () => {
        showController()
    });
    document.addEventListener('keyup', (e) => {
        if(e.key == 'Enter') onStartGameClicked()
    })
}

let game = null;

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

main()

