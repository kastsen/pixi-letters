import TWEEN from "@tweenjs/tween.js";
import Tools from "../../lib/Tools";

export default class Field extends PIXI.Container {
	constructor(view, options) {
		super()
		this.view = view
		this.scene = view.scene
		this.settings = this.scene.settings
		this.inteval = this.settings.interval
		this.moveTime = this.settings.moveTime
		this.options = options
		this.letters = this.shuffleTiles(this.options.task.letters)
		this.tiles = []
		this.progress = 0
		this.fieldHandler()
	}

	fieldHandler() {
		window.addEventListener("keydown", (event) => {
			this.tiles.forEach((letter) => {
				if (letter.text === event.key && !letter.disabled) {
					this.progress += letter.gold ? this.options.task.goldReward : this.options.task.reward
					this.view.setUpdates({tile: letter, progress: this.progress})
				}
			})
		}, true);
	}

	addTile(i) {
		const num = Tools.randomInteger(0, this.letters.length)
		const letter = this.letters[num]
		const gold = Tools.randomInteger(1, 4) === 4
		const tile = new PIXI.Text(letter, {
			fontSize: 30,
			fill: gold ? '0xFFD700' : '0xffffff',
			fontFamily: 'Marvin',
		})
		tile.alpha = 0
		tile.id = i
		tile.gold = gold
		tile.position.set(0, -global.app.screen.height/2 + 30)
		this.tiles.push(tile)
		this.addChild(tile)
		this.moveTile(tile)
	}

	hideTile(tile) {
		tile.hideTween = new TWEEN.Tween(tile).to({alpha: 0}, 250).start()
	}

	disableTile(tile) {
		if (!tile.disabled) {
			tile.disabled = true
			tile.tweenX.stop()
			tile.tweenY.stop()
			this.hideTile(tile)
		}
	}

	moveTile(tile) {
		const delay = 500*tile.id
		const durationY = this.settings.moveTime
		const durationX = durationY/2
		const endY = tile.position.y + global.app.screen.height + tile.height + 20
		const newX = tile.position.x + global.app.screen.width*(Tools.randomInteger(1, 4)/10)
		tile.tweenX = new TWEEN.Tween(tile.position)
			.to({x: tile.id % 2 === 0 ? newX : -newX}, durationX)
			.yoyo(true).repeat(Infinity)
		tile.tweenY = new TWEEN.Tween(tile.position)
			.to({y: endY}, durationY)
			.onStart(() => {
				tile.tweenX.start()
			})
			.onComplete(() => {
				this.disableTile(tile)
			})
			.start()
		tile.showTween = new TWEEN.Tween(tile)
			.to({alpha: 1}, 250)
			.start()
	}

	createTiles() {
		this.tilesNum = 0
		this.addTile(this.tilesNum)
		Tools.intervalTween(() => {
			this.tilesNum++
			this.addTile(this.tilesNum)
		}, this.inteval);
	}


	shuffleTiles(tiles) {
		return Tools.arrShuffle(tiles)
	}

	update(updates) {
		this.disableTile(updates.tile)
	}
}
