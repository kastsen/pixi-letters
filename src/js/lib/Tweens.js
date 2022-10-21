import TWEEN from "@tweenjs/tween.js";

export const Tweens = () => {
    TWEEN._paused = [];
    global.app.animate = (time) => {
        requestAnimationFrame(global.app.animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(global.app.animate);
}
