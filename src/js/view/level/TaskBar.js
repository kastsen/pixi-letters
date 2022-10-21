import ProgressBar from "./ProgressBar";

export default class TaskBar extends PIXI.Container {
	constructor(level, options) {
		super()
		this.level = level
		this.options = options
		this.w = 1000
		this.h = 150
		this.padding = 10
		this.tiles = []
		this.progressPanel = this.createProgressPanel()
		this.addChild(this.progressPanel)
	}

	createProgressPanel() {
		const progressPanel = new PIXI.Container()

		const title = new PIXI.Text('PROGRESS', {
			fontSize: 40,
			fill: 0xffffff,
			fontFamily: 'Marvin'
		})

		this.progressBar = new ProgressBar({
			minW: 1,
			minH: 6,
			maxW: this.w-this.h-title.width-this.padding*3-5,
			maxH: 6,
			x: title.width/2 + 20
		})

		title.position.set(this.progressBar.width/2-title.width/2+this.progressBar.x, -5)
		progressPanel.addChild(this.progressBar, title)

		return progressPanel
	}

	updateProgress(progress) {
		this.progressBar.update(progress)
	}
}
