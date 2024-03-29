import * as PIXI from 'pixi.js';
import Reels from './modules/Reels';
import { GameConstant } from './modules/constants';
import { EventEmitter } from 'events';
import SpinBtn from './modules/spinBtn';

export default class App{    
    
    public app: PIXI.Application;
    public appEmitter: EventEmitter;

    static start(){        
        
        const app = new PIXI.Application({
            width: GameConstant.game.width,
            height: GameConstant.game.height,
            antialias: true,
            transparent: false,
            resolution: 1
        });
        document.body.appendChild(app.view);
        this.initAssets();

        const appEmitter = new EventEmitter();
        appEmitter.setMaxListeners(15);

        const ticker = new PIXI.Ticker();
        ticker.start();        

        const mainScene = new PIXI.Container;
        const reels = new Reels(ticker, appEmitter);        
        const spinBtn = new SpinBtn(appEmitter);
        
        mainScene.addChild(reels.reelsContainer);     
        mainScene.addChild(spinBtn.getContainer);
        app.stage.addChild(mainScene);
    };

    static initAssets() {
        PIXI.Loader.shared.add([GameConstant.symbolTexture], [GameConstant.spinBtnTexture]).load();        
    }
    
}