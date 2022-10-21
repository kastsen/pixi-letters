import Scene from "./Scene";
import LevelsModel from "../model/LevelModel";
import LevelView from "../view/LevelView";

class Level extends Scene {
	constructor(options) {
		super()
		this.level = options.level
		this.model = new LevelsModel(this.level)
		this.settings = this.model.setting
		this.view = new LevelView(this)
		this.addChild(this.view)

		this.init()
	}

	init() {
		this.view.createTiles()
	}

	pass() {
		console.log('END GAME')
		app.scene.addLayer('Pass', { nextLevel: this.settings.nextLevel || false, buttonText: 'RETRY' })
	}
}

export default Level
