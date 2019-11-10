<template>
    <div id="artBoard">
        <canvas id="canvas" class="artboart" @mouseup="isBegin=false"></canvas>
        <div class="btn-group">
            <div @click="adjustStokeColor('rgba(255,0,0,.05)')" class="btn-color">
                <div></div>
            </div>
            <div @click="adjustStokeSize(30)" class="btn-size">
                <div class=""></div>
            </div>
            <div @click="isEraser = true" class="btn-eraser"></div>
            <div @click="isEraser = false" class="btn-pen"></div>
            <div class="btn-undo"></div>
            <div class="btn-redo"></div>
            <div @click="clearAll" class="btn-clear"></div>
            <div class="btn-submit"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'handWriting',
        data() {
            return {
                isBegin: false,
                lineWidth: 10, //笔触大小
                strokeColor: 'rgba(0,0,0,.08)',//笔触颜色
                isEraser: false
            }
        },
        mounted() {
            this.init() //创建canvas上下文
            let artBoard = document.querySelector("#canvas")
            let boardW = artBoard.clientWidth
            let boardH = artBoard.clientHeight
            canvas.width = boardW
            canvas.height = boardH
            canvas.addEventListener('mousedown', this.getPos)
            canvas.addEventListener('mousemove', this.drawLine)
        },
        methods: {
            init() {
                this.ctx = document.querySelector("#canvas").getContext("2d")
            },

            coordinateConvert(x, y) {
                let cbox = canvas.getBoundingClientRect()
                return {
                    x: x - cbox.left,
                    y: y - cbox.top
                }
            },
            getPos(e) {
                let pos = this.coordinateConvert(e.clientX, e.clientY)
                this.ctx.beginPath()
                this.ctx.strokeStyle = this.strokeColor
                this.ctx.lineWidth = this.lineWidth
                this.ctx.lineCap = "round"
                this.ctx.lineJoin = "round"
                this.ctx.moveTo(pos.x, pos.y)
                this.isBegin = true
            },
            drawLine(e) {
                if (this.isEraser) {
                    this.ctx.globalCompositeOperation = "destination-out"
                    this.ctx.strokeStyle = "#000"
                } else {
                    this.ctx.globalCompositeOperation = "source-over"
                    this.ctx.strokeStyle = this.strokeColor
                }
                let pos = this.coordinateConvert(e.clientX, e.clientY)
                if (this.isBegin) {
                    this.ctx.lineTo(pos.x, pos.y)
                    this.ctx.stroke()
                }
            },

            clearAll() {
                this.ctx.clearRect(0, 0, canvas.width, canvas.height)
                this.isEraser = false
            },
            adjustStokeSize(size) {
                this.lineWidth = size
            },
            adjustStokeColor(color) {
                this.strokeColor = color
            },
            operate(e, operation) {
                this.ctx.globalCompositeOperation = operation
                this.drawLine(e)
            }

        }
    }
</script>

<style lang="scss" scoped>
    .artboart {
        width: calc(1500rem / 96);
        height: calc(710rem / 96);
        position: absolute;
        top: calc(200rem / 96);
        left: calc(50% - calc(700rem / 96));
        //background: rgba(0,0,255,.5);
        background: url("../assets/img/scroll.png") no-repeat center;
        background-size: 100% 100%;
    }

    .btn-group {
        margin: 0 auto;
        padding-top: calc(680rem / 96);
        padding-left: calc(80rem / 96);
        box-sizing: border-box;
        width: calc(1400rem / 96);
        display: flex;
        justify-content: space-between;

        [class^="btn-"] {
            width: calc(64rem / 96);
            height: calc(64rem / 96);
            border-radius: 100px;
            text-align: center;
            background: rgba(235, 195, 134, .8);
            box-shadow: 0 0 20px rgba(235, 195, 134, .6);
            cursor: pointer;
            transition: all ease .6s;

            &:hover {
                background: rgba(235, 195, 134, 1);
                box-shadow: 0 0 20px rgba(235, 195, 134, 1);
            }
        }

        .btn-size {
            div {
                width: calc(32rem / 96);
                height: calc(32rem / 96);
                margin: calc(16rem / 96) auto;
                border-radius: 100px;
                background: rgba(0, 0, 0, .8);
            }
        }

        .btn-color {
            position: relative;

            div {
                width: calc(32rem / 96);
                height: calc(32rem / 96);
                margin: calc(16rem / 96) auto;
                border-radius: 100px;
                background: rgba(0, 0, 0, .7);
            }

            .set-color {
                position: absolute;
                left: 0;
                top: 20px;
            }
        }

    }
</style>
