import View from "./View";
import Button from "./entities/Button";

export default class PassView extends View {
	constructor(scene, options) {
		super(scene)
		this.options = options
		this.scene = scene
		this.create()
		this.resize()
		window.addEventListener('resize', this.resize.bind(this))
	}

	create() {
		this.overlay = this.createOverlay()
		this.btnPanel = new PIXI.Container()
		this.button = this.createButton(this.options.action)
		this.button.x -= this.button.width/2
		this.btnPanel.addChild(this.button)
		this.score = this.showProgress()
		this.addChild(this.overlay, this.button, this.score)
	}

	showProgress() {
		console.log(`Total score: ${global.app.progress}`)
		const score = new PIXI.Text(`Total score: ${global.app.progress*10}`, {
			fontSize: 40,
			fill: 0xffffff,
			fontFamily: 'Marvin'
		})
		score.x = -score.width/2
		score.y -= 100
		return score
	}

	createButton(action) {
		return new Button({
			name: 'RETRY',
			text: this.options.buttonText,
			fontSize: 42,
			textColor: '0x8df200',
			action: () => this.scene.btnHandler(action),
		})
	}

	resize() {
		this.resizeBtnPanel()
		this.resizeBkg()
	}

	resizeBtnPanel() {
		this.btnPanel.position.set(-this.btnPanel.width/2, -this.btnPanel.height/2)
	}

	resizeBkg() {
		this.overlay.width = app.size.width
		this.overlay.height = app.size.height
		this.overlay.position.set(-this.overlay.width/2, -this.overlay.height/2)
	}

	createOverlay() {
		const overlay = new PIXI.Graphics()
		overlay.beginFill(0x000000, 1)
		overlay.drawRect(0, 0, app.size.width, app.size.height)
		return overlay
	}
}
