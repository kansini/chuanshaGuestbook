<template>
    <div id="artBoard">
        <canvas id="canvas" class="artboart" @mouseup="isBegin=false"></canvas>
        <div class="btn-group">
            <div @click="isChooseColor = !isChooseColor" class="btn-color">
                <transition name="slideUp">
                    <div class="color-list" v-if="isChooseColor">
                        <ul>
                            <li v-for="(item,index) in colors" :key="index" @click="setColor(item.color,item.pColor)">
                                <div :style="{background:item.color}"></div>
                            </li>
                        </ul>
                    </div>

                </transition>
                <span :style="{background:currentColor}"></span>
            </div>
            <div @click="isChooseSize = !isChooseSize" class="btn-size">
                <transition name="slideUp">
                    <div class="size-list" v-if="isChooseSize">
                        <ul>
                            <li v-for="(item,index) in sizes" :key="index" @click="setSize(item.size,item.pSize)">
                                <div :class="item.size"></div>
                            </li>
                        </ul>
                    </div>
                </transition>
                <span :class="currentSize"></span>
            </div>
            <div @click="isEraser = false" class="btn-pen"></div>
            <div @click="isEraser = true" class="btn-eraser"></div>
            <div class="btn-undo"></div>
            <div class="btn-redo"></div>
            <div @click="clearAll" class="btn-clear"></div>
            <div class="btn-submit">提交</div>
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
                isEraser: false,
                isChooseColor: false,
                currentColor: "rgba(0,0,0,.6)",
                colors: [
                    {
                        color: "rgba(255,0,0,.8)",
                        pColor: "rgba(255,0,0,.08)"
                    },

                    {
                        color: "rgba(255,156,22,0.8)",
                        pColor: "rgba(255,156,22,0.08)"
                    },
                    {
                        color: "rgba(113,167,255,0.8)",
                        pColor: "rgba(113,167,255,0.08)"
                    },
                    {
                        color: "rgba(224,184,123,0.8)",
                        pColor: "rgba(224,184,123,.08)"
                    },

                    {
                        color: "rgba(0,0,0,0.6)",
                        pColor: "rgba(0,0,0,0.08)"
                    }],
                isChooseSize: false,
                currentSize: "s5",
                sizes: [
                    {
                        size: "s1",
                        pSize: 36
                    },
                    {
                        size: "s2",
                        pSize: 24
                    },
                    {
                        size: "s3",
                        pSize: 16
                    },
                    {
                        size: "s4",
                        pSize: 8
                    },
                    {
                        size: "s5",
                        pSize: 4
                    }
                ]
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
            setColor(color, pColor) {
                this.isEraser = false
                this.currentColor = color
                this.strokeColor = pColor
            },
            setSize(size, pSize) {
                this.currentSize = size
                this.lineWidth = pSize
                console.log(this.lineWidth)
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

    .slideUp-enter-active,
    .slideUp-leave-active {
        transition: all ease 1s;
    }

    .slideUp-enter,
    .slideUp-leave-active {
        opacity: 0;

    }

    .btn-group {
        position: absolute;
        top: calc(920rem / 96);
        left: calc(300rem / 96);
        box-sizing: border-box;
        width: calc(1000rem / 96);
        display: flex;
        justify-content: space-between;
        z-index: 999;

        [class^="btn-"] {
            width: calc(64rem / 96);
            height: calc(64rem / 96);
            border-radius: 100px;
            text-align: center;
            background: rgba(255, 255, 255, .6);
            box-shadow: 0 0 10px rgba(0, 0, 0, .1);
            //background: rgba(235, 195, 134, .8);
            //box-shadow: 0 0 20px rgba(235, 195, 134, .6);
            color: #a06f35;
            font-family: "kaiti";
            cursor: pointer;
            transition: all ease .6s;

            &:nth-last-child(1) {
                font-size: calc(30rem / 96);
                text-align: center;
                line-height: calc(64rem / 96);
                width: calc(160rem / 96);
            }


            &:hover {
                box-shadow: 0 0 20px rgba(0, 0, 0, .2);
            }
        }

        .btn-size {
            position: relative;

            span {
                position: relative;
                display: block;
                border-radius: 100px;
                background: rgba(0, 0, 0, .6);
                box-shadow: 0 0 0 4px rgba(0, 0, 0, .1);
                transition: all ease .6s;
            }

            .s5 {
                width: calc(8rem / 96);
                height: calc(8rem / 96);
                left: calc(28rem / 96);
                top: calc(28rem / 96);
            }

            .s4 {
                width: calc(16rem / 96);
                height: calc(16rem / 96);
                left: calc(24rem / 96);
                top: calc(24rem / 96);
            }

            .s3 {
                width: calc(24rem / 96);
                height: calc(24rem / 96);
                left: calc(20rem / 96);
                top: calc(20rem / 96);
            }

            .s2 {
                width: calc(32rem / 96);
                height: calc(32rem / 96);
                left: calc(16rem / 96);
                top: calc(16rem / 96);
            }

            .s1 {
                width: calc(40rem / 96);
                height: calc(40rem / 96);
                left: calc(12rem / 96);
                top: calc(12rem / 96);
            }

            .size-list {
                position: absolute;
                left: 0;
                bottom: calc(64rem / 96);


                > ul > li {
                    position: relative;
                    width: calc(64rem / 96);
                    height: calc(64rem / 96);
                    border-radius: 100px;
                    margin-bottom: calc(16rem / 96);;
                    text-align: center;
                    background: rgba(255, 255, 255, .8);
                    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

                    div {
                        position: absolute;
                        background: rgba(0, 0, 0, .6);
                        border-radius: 100px;
                        z-index: 1000;
                    }
                }
            }

        }

        .btn-color {
            position: relative;

            span {
                display: block;
                width: calc(32rem / 96);
                height: calc(32rem / 96);
                margin: calc(16rem / 96) auto;
                border-radius: 100px;
                transition: all ease .6s;
            }

            .set-color {
                position: absolute;
                left: 0;
                top: 20px;
            }

            .color-list {
                position: absolute;
                left: 0;
                bottom: calc(64rem / 96);


                > ul > li {
                    position: relative;
                    width: calc(64rem / 96);
                    height: calc(64rem / 96);
                    border-radius: 100px;
                    margin-bottom: calc(16rem / 96);;
                    text-align: center;
                    background: rgba(255, 255, 255, .8);
                    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

                    div {
                        position: absolute;
                        width: calc(32rem / 96);
                        height: calc(32rem / 96);
                        left: calc(16rem / 96);
                        top: calc(16rem / 96);
                        border-radius: 100px;
                        z-index: 1000;
                    }
                }
            }

        }

    }
</style>
