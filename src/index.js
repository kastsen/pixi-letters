import './scss/index.scss'
import './js/loader'
import Main from "./js/scene/Main";
import App from "./js/app";
import Pass from "./js/scene/Pass";
import Level from "./js/scene/Level";
import {Loader} from "./js/loader";
import {Tweens} from "./js/lib/Tweens";

window.onload = () => {
    global.app = new App({
        elem : document.getElementById('app')
    })
    Loader()
    Tweens()
}
