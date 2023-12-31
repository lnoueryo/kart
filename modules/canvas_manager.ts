import { BaseObject } from './draw_objects/base/base_object';
import { Camera } from './draw_objects/camera/camera';
import { Path } from './draw_objects/path/path';
let up_push = false;
let down_push = false;
let left_push = false;
let right_push = false;

const CANVAS_WIDTH_PIXEL = 1000;
const CANVAS_HEIGHT_PIXEL = 1000;
const CANVAS_RATIO = CANVAS_WIDTH_PIXEL / CANVAS_HEIGHT_PIXEL
const SIZE_RATIO = 1000
const PLAYER_DELAY = 1
export class CanvasManager {
    private ctx;
    constructor(private canvas: HTMLCanvasElement) {
        canvas.width = CANVAS_WIDTH_PIXEL;
        canvas.height = CANVAS_HEIGHT_PIXEL;
        this.ctx = this.canvas.getContext('2d')
        this.adjustCanvasSize()
        window.addEventListener('resize', () => {
            this.adjustCanvasSize()
        });
    // document.addEventListener('keydown', (event) => {
    //     if(event.key == "ArrowUp"){
    //         up_push = true;
    //     }
    //     if(event.key == "ArrowDown"){
    //         down_push = true;
    //     }
    //     if(event.key == "ArrowLeft"){
    //         left_push = true;
    //     }
    //     if(event.key == "ArrowRight"){
    //         right_push = true;
    //     }

    // });
    // //keyが離されたなら
    // document.addEventListener('keyup', (event) => {
    //     if(event.key == "ArrowUp"){
    //         up_push = false;
    //     }
    //     if(event.key == "ArrowDown"){
    //         down_push = false;
    //     }
    //     if(event.key == "ArrowLeft"){
    //         left_push = false;
    //     }
    //     if(event.key == "ArrowRight"){
    //         right_push = false;
    //     }

    // });
    }

    fillBackground() {
        this.ctx.fillStyle = 'rgb( 0, 128, 0)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    isGameOver(players) {
        return players.find((player) => {
            return player.y + player.height > this.canvas.height;
        })
    }

    // endGame(players) {
    //     this.fillEndText(`${this.isGameOver(players).id ? '黒' : '白'}の勝ち。`, `頑張った時間: ${(this.currentTime - PLAYER_DELAY).toFixed(2)} 秒`)
    // }

    fillBox(box) {
        this.ctx.fillStyle = 'brown';
        this.ctx.fillRect(box.x, box.y, box.width, box.height);
    }

    fillPolygon(object: BaseObject, camera: Camera) {
        this.ctx.fillStyle = object.color;
        const vertices = object.createVerticesForDrawing(camera)
        this.ctx.beginPath();
        this.ctx.moveTo(vertices[0].x, vertices[0].y);
        vertices.forEach((vertex, i) => {
            if(vertex.type == 'arc') {
                const nextIndex = vertices.length - 1 == i ? 0 : i + 1;
                this.ctx.arcTo(vertex.x, vertex.y, vertices[nextIndex].x, vertices[nextIndex].y, vertex.getDistance(vertices[nextIndex]));
            } else if(vertex.type == 'line') {
                this.ctx.lineTo(vertex.x, vertex.y);
            }
        });
        this.ctx.closePath();
        this.ctx.fill();
    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    fillEndText(firstText, secondText) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '48px Arial';
        this.ctx.fillText(firstText, 180, this.canvas.height / 4);
        this.ctx.fillText(secondText, 180, this.canvas.height / 3);
    }

    adjustCanvasSize = () => {
        const height = window.innerHeight;
        this.canvas.width = height * CANVAS_RATIO;
        this.canvas.height = height;
        this.canvas.style.width = height * CANVAS_RATIO + 'px';
        this.canvas.style.height = height + 'px';
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    get sizeRatio() {
        return this.width / SIZE_RATIO;
    }

}