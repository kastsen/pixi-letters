import View from "./View";
import Field from "./level/Field";
import TaskBar from "./level/TaskBar";
import Timer from "./level/Timer";

export default class LevelView extends View {
	constructor(scene) {
		super(scene)
		this.scene = scene
		global.app.progress = 0
		this.settings = scene.settings
		this.field = new Field(this, scene.settings)
		this.taskBar = new TaskBar(this.scene.level, scene.settings.task)
		this.timer = new Timer(this)
		this.addChild(this.field, this.taskBar, this.timer)
		this.updatePosition()
		window.addEventListener('resize', this.updatePosition.bind(this))
	}

	setUpdates(updates) {
		this.field.update(updates)
		this.taskBar.updateProgress(updates.progress)
		global.app.progress = updates.progress
	}

	createTiles() {
		this.field.createTiles()
	}

	updatePosition() {
		const topX = -global.app.screen.height/2 - 40
		this.taskBar.position.set(-global.app.screen.width/2, topX+4)
		this.field.position.set(-this.field.width/2, -this.field.height/2)
		this.timer.position.set(global.app.screen.width/2-this.timer.width + 90, topX)
	}
}
