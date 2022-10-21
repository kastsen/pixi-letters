import TWEEN from "@tweenjs/tween.js";

export default class Tools {

	/**
	 * Возвращает рандомное число от min до max включительно
	 *
	 * @param {number} min Минимальное число
	 * @param {number} max Максимальное число
	 * @return {number} Рандомное число
	 */

	static randomInteger(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min))
	}


	/**
	 * Возвращает перемешанный массив (алгоритм тасования Фишера-Йейтса)
	 *
	 * @param  {array} arr Исходный массив
	 * @return {array} Перемешанный массив
	 */

	static arrShuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr
	}

	/**
	 * Interval Tween
	 *
	 * @param func
	 * @param time
	 * @param context
	 */
	static intervalTween(func, time, context) {
		return new TWEEN.Tween({}).to({}, time).repeat(Infinity).start().onRepeat(func.bind(context));
	}
}
