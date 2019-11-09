<template>
    <div>
        <canvas id="canvas" @mouseup="isBegin=false"></canvas>
        <div @click="clearAll()" style="color: #FF3333;">clear</div>
    </div>

</template>

<script>
    export default {
        name: 'handWriting',
        data() {
            return {
                isBegin: false,
                w: 600,
                lineWidth: 6
            }
        },
        mounted() {
            this.init() //创建canvas上下文
            let ww = document.body.clientWidth
            this.w = Math.min(this.w, ww - 32)
            canvas.width = this.w
            canvas.height = this.w
            this.drawGrid(this.ctx, this.w, this.w)
            canvas.addEventListener('dblclick', this.clearAll)
            canvas.addEventListener('mousedown', this.getPos)
            canvas.addEventListener('mousemove', this.drawLine)
        },
        methods: {
            init() {
                this.ctx = document.querySelector("#canvas").getContext("2d")
            },
            drawGrid(ctx, w, h) {
                ctx.save()
                ctx.strokeStyle = "#ff3333"
                ctx.lineWidth = 8
                ctx.rect(0, 0, w, h)
                ctx.stroke()
                ctx.beginPath()
                ctx.strokeStyle = "rgba(255,0,0,.4)"
                ctx.lineWidth = 1
                ctx.setLineDash([8, 4]);
                ctx.moveTo(0, 0)
                ctx.lineTo(w, h)
                ctx.moveTo(w, 0)
                ctx.lineTo(0, h)
                ctx.moveTo(0, h / 2)
                ctx.lineTo(w, h / 2)
                ctx.moveTo(w / 2, 0)
                ctx.lineTo(w / 2, h)
                ctx.stroke()
                ctx.closePath()
                ctx.restore()
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
                this.ctx.strokeStyle = "rgba(0,0,0,.08)"
                this.ctx.lineWidth = this.lineWidth
                this.ctx.lineCap = "round"
                this.ctx.lineJoin = "round"
                this.ctx.moveTo(pos.x, pos.y)
                this.isBegin = true
            },
            drawLine(e) {
                let pos = this.coordinateConvert(e.clientX, e.clientY)
                if (this.isBegin) {
                    this.ctx.lineTo(pos.x, pos.y)
                    this.ctx.stroke()
                }
            },
            clearAll() {
                this.ctx.clearRect(0, 0, canvas.width, canvas.height)
                this.drawGrid(this.ctx, this.w, this.w)
            },
        }
    }
</script>

<style scoped>
    canvas {
        margin: 16px auto;
    }
</style>
