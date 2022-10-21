import TWEEN from "@tweenjs/tween.js";

export default class ProgressBar extends PIXI.Container {
	constructor(options) {
		super()
		this.minW = options.minW
		this.minH = options.minH
		this.maxW = options.maxW
		this.maxH = options.maxH
		this.posX = options.x
		this.progress = 0

		this.create()
	}

	create() {
		const linePadding = 6;
		this.line = new PIXI.Graphics()
		this.line.beginFill(0x00ff00, 1)
		this.line.drawRect(0, 0, this.minW, 30-linePadding)
		this.line.position.set(this.posX, 0)
		this.line.width = 0
		this.addChild(this.line)
	}

	update(progress) {
		if (progress === this.progress)
			return

		this.progress = progress
		const newWidth = (this.maxW-2) / 100 * this.progress
		const speed = (newWidth - this.line.width) * 10

		if (this.line.tween) this.line.tween.stop()
		this.line.tween = new TWEEN.Tween(this.line)
			.to({width: newWidth}, speed)
			.start()

	}
}
