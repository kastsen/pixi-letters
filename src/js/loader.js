import Main from "./scene/Main";
import Pass from "./scene/Pass";
import Level from "./scene/Level";

export const Loader = () => {
	app.loader.onProgress.add((e) => {
		// console.log(e.progress)
	})

	app.loader.onError.add((e) => {
		console.error(e.message)
	})

	app.loader.load(() => {
		app.scene.add('Main', Main)
		app.scene.add('Pass', Pass)
		app.scene.add('Level', Level)
		app.scene.start('Main')
	})
}
