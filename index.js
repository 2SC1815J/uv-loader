/*
 * Universal Viewer Loader
 * https://github.com/2SC1815J/uv-loader
 *
 * Copyright 2018 2SC1815J
 */
(function() {
    'use strict';

    var match = location.search.match(/(?:&|\?)manifest=(.+?)(?:&|$)/);
    if (match) {
        var manifestUri = decodeURIComponent(match[1]);
        if (manifestUri) {
            var data = {
                manifest: manifestUri
            };
            match = location.search.match(/(?:&|\?)canvas=(.+?)(?:&|$)/);
            if (match) {
                var canvasUri = decodeURIComponent(match[1]);
                if (canvasUri) {
                    data.canvasId = canvasUri;
                }
            }
            UV.init('uv', data);
        }
    }
})();