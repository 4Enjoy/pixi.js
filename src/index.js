function backgroundRAF(callback) {
    setTimeout(callback, 16);
}
window.backgroundRAF = backgroundRAF;

// run the polyfills
require('./polyfill/requestAnimationFrame');

window.PIXI_loaded = false;

window.onPixiReady = function (callback) {
    function check() {
        if (PIXI_loaded) {
            return callback();
        } else {
            //do not use animation frame to load in background
            backgroundRAF(check);
        }
    }

    check();
};

backgroundRAF(function () {
    backgroundRAF(function PIXI_polifill() {
        require('./polyfill');
        backgroundRAF(function PIXI_core() {
            var core = null;
            require('./core').init(function (result) {
                core = result;

                backgroundRAF(function PIXI_modules() {
                    // add core plugins.
                    //core.extras         = require('./extras');
                    //core.filters        = require('./filters');
                    //core.interaction    = require('./interaction');
                    core.loaders = require('./loaders');
                    //core.mesh           = require('./mesh');
                    //core.accessibility  = require('./accessibility');

                    backgroundRAF(function PIXI_loaders() {

// export a premade loader instance
                        /**
                         * A premade instance of the loader that can be used to loader resources.
                         *
                         * @name loader
                         * @memberof PIXI
                         * @property {PIXI.loaders.Loader}
                         */
                        core.loader = new core.loaders.Loader();

                        // mixin the deprecation features.
                        //Object.assign(core, require('./deprecation'));

                        // Always export pixi globally.
                        global.PIXI = core;

                        window.PIXI_loaded = true;

                    });
                });
            });
        });
    });
});


