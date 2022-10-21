import Tools from "../../lib/Tools";

export default class Timer extends PIXI.Container {
    constructor(level) {
        super()
        this.level = level
        this.settings = level.settings
        this.gameTime = this.settings.time
        this.create()
        this.start()
        return this
    }

    create() {
        this.text = new PIXI.Text(`TIME: ${this.gameTime}`, {
            fontSize: 40,
            fill: '0xffffff',
            fontFamily: 'Marvin',
        })
        this.addChild(this.text)
    }

    start() {
        this.intervalTween = Tools.intervalTween(() => {
            this.gameTime -= 1
            this.text.text = `TIME: ${this.gameTime}`
            if (this.gameTime === 0) {
                this.intervalTween.stop()
                this.level.scene.pass()
            }
        }, 1000);
    }
}
