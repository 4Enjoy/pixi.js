/**
 * @file        Main export of the PIXI core library
 * @author      Mat Groves <mat@goodboydigital.com>
 * @copyright   2013-2015 GoodBoyDigital
 * @license     {@link https://github.com/pixijs/pixi.js/blob/master/LICENSE|MIT License}
 */

/**
 * @namespace PIXI
 */

var RESULT = {};

function buildCore() {
    // export core and const. We assign core to const so that the non-reference types in const remain in-tact
    var core = Object.assign(require('./const'), require('./math'), {
        // utils
        utils: require('./utils'),
        //ticker: require('./ticker'),

        // display
        DisplayObject:          require('./display/DisplayObject'),
        Container:              require('./display/Container'),

        // sprites
        Sprite:                 require('./sprites/Sprite'),
        //ParticleContainer:      require('./particles/ParticleContainer'),
        SpriteRenderer:         require('./sprites/webgl/SpriteRenderer'),
        //ParticleRenderer:       require('./particles/webgl/ParticleRenderer'),

        // text
        Text:                   require('./text/Text'),

        // primitives
        Graphics:               require('./graphics/Graphics'),
        GraphicsData:           require('./graphics/GraphicsData'),
        GraphicsRenderer:       require('./graphics/webgl/GraphicsRenderer'),

        // textures
        Texture:                require('./textures/Texture'),
        BaseTexture:            require('./textures/BaseTexture'),
        RenderTexture:          require('./textures/RenderTexture'),
        //VideoBaseTexture:       require('./textures/VideoBaseTexture'),
        //TextureUvs:             require('./textures/TextureUvs'),

        // renderers - canvas
        CanvasRenderer:         require('./renderers/canvas/CanvasRenderer'),
        CanvasGraphics:         require('./renderers/canvas/utils/CanvasGraphics'),
        CanvasBuffer:           require('./renderers/canvas/utils/CanvasBuffer'),

        // renderers - webgl
        WebGLRenderer:          require('./renderers/webgl/WebGLRenderer'),
        WebGLManager:           require('./renderers/webgl/managers/WebGLManager'),
        ShaderManager:          require('./renderers/webgl/managers/ShaderManager'),
        Shader:                 require('./renderers/webgl/shaders/Shader'),
        TextureShader:          require('./renderers/webgl/shaders/TextureShader'),
        PrimitiveShader:        require('./renderers/webgl/shaders/PrimitiveShader'),
        ComplexPrimitiveShader: require('./renderers/webgl/shaders/ComplexPrimitiveShader'),
        ObjectRenderer:         require('./renderers/webgl/utils/ObjectRenderer'),
        RenderTarget:           require('./renderers/webgl/utils/RenderTarget'),

        // filters - webgl
        //AbstractFilter:         require('./renderers/webgl/filters/AbstractFilter'),
        //FXAAFilter:             require('./renderers/webgl/filters/FXAAFilter'),
        //SpriteMaskFilter:       require('./renderers/webgl/filters/SpriteMaskFilter'),

        /**
         * This helper function will automatically detect which renderer you should be using.
         * WebGL is the preferred renderer as it is a lot faster. If webGL is not supported by
         * the browser then this function will return a canvas renderer
         *
         * @memberof PIXI
         * @param width=800 {number} the width of the renderers view
         * @param height=600 {number} the height of the renderers view
         * @param [options] {object} The optional renderer parameters
         * @param [options.view] {HTMLCanvasElement} the canvas to use as a view, optional
         * @param [options.transparent=false] {boolean} If the render view is transparent, default false
         * @param [options.antialias=false] {boolean} sets antialias (only applicable in chrome at the moment)
         * @param [options.preserveDrawingBuffer=false] {boolean} enables drawing buffer preservation, enable this if you
         *      need to call toDataUrl on the webgl context
         * @param [options.resolution=1] {number} the resolution of the renderer, retina would be 2
         * @param [noWebGL=false] {boolean} prevents selection of WebGL renderer, even if such is present
         *
         * @return {WebGLRenderer|CanvasRenderer} Returns WebGL renderer if available, otherwise CanvasRenderer
         */
        autoDetectRenderer: function (width, height, options, noWebGL)
        {
            width = width || 800;
            height = height || 600;

            if (!noWebGL && core.utils.isWebGLSupported())
            {
                return new core.WebGLRenderer(width, height, options);
            }

            return new core.CanvasRenderer(width, height, options);
        }
    });

    for(var key in core) {
        RESULT[key] = core[key];
    }
    return RESULT;
}

function init(callback) {
    require('./const');
    require('./math');

    requestAnimationFrame(function PIXI_Core_A(){
        require('./utils');
        //ticker: require('./ticker'),

        requestAnimationFrame(function PIXI_Core_B() {

            // display
            require('./display/DisplayObject');
            require('./display/Container');

            requestAnimationFrame(function PIXI_Core_C() {
                // sprites
                require('./sprites/Sprite');
                require('./sprites/webgl/SpriteRenderer');

                requestAnimationFrame(function PIXI_Core_D() {
                    // text
                    require('./text/Text');

                    // primitives
                    require('./graphics/Graphics');
                    require('./graphics/GraphicsData');
                    require('./graphics/webgl/GraphicsRenderer');

                    // textures
                    require('./textures/Texture');
                    require('./textures/BaseTexture');
                    require('./textures/RenderTexture');


                    // renderers - canvas
                    require('./renderers/canvas/CanvasRenderer');
                    require('./renderers/canvas/utils/CanvasGraphics');
                    require('./renderers/canvas/utils/CanvasBuffer');

                    // renderers - webgl
                    require('./renderers/webgl/WebGLRenderer');
                    require('./renderers/webgl/managers/WebGLManager');
                    require('./renderers/webgl/managers/ShaderManager');
                    require('./renderers/webgl/shaders/Shader');
                    require('./renderers/webgl/shaders/TextureShader');
                    require('./renderers/webgl/shaders/PrimitiveShader');
                    require('./renderers/webgl/shaders/ComplexPrimitiveShader');
                    require('./renderers/webgl/utils/ObjectRenderer');
                    require('./renderers/webgl/utils/RenderTarget');

                    requestAnimationFrame(function PIXI_Core_Final() {
                        callback(buildCore());
                    })
                });
            });
        });
    });
}

RESULT.init = init;
module.exports = RESULT;
