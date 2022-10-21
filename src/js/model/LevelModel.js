export default class LevelModel {
	constructor(level) {
		this.level = level
		this.setting = JSON.parse(JSON.stringify(require(`../levels/${this.level}.json`)))
	}
}
