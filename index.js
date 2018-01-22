/*
 * Universal Viewer Loader
 * https://github.com/2sc1815j/universalviewer-loader
 *
 * Copyright 2018 2SC1815J
 */
(function() {
    'use strict';

    var manifestUri;
    var canvasUri;

    var match = location.search.match(/(?:&|\?)manifest=(.+?)(?:&|$)/);
    if (match) {
        manifestUri = decodeURIComponent(match[1]);
        match = location.search.match(/(?:&|\?)canvas=(.+?)(?:&|$)/);
        if (match) {
            canvasUri = decodeURIComponent(match[1]);
        }
    }
    if (manifestUri) {
        $.getJSON(manifestUri, function(manifest) {
            var canvasIndex = 0;
            var sequenceIndex = 0;
            if (canvasUri) {
                var canvasUri_ = canvasUri.replace(/^https?:/, '');
                try {
                    for (var j = 0; j < manifest.sequences.length; j++) {
                        for (var i = 0; i < manifest.sequences[j].canvases.length; i++) {
                            if (manifest.sequences[j].canvases[i]['@id'].replace(/^https?:/, '') === canvasUri_) {
                                canvasIndex = i;
                                sequenceIndex = j;
                                break;
                            }
                        }
                    }
                } catch (e) {
                    //
                }
            }
            $('.uv').attr('data-uri', manifestUri);
            $('.uv').attr('data-canvasindex', canvasIndex);
            $('.uv').attr('data-sequenceindex', sequenceIndex);
            loadViewer();
            if (history && history.replaceState && history.state !== undefined) {
                var newUrl = '?manifest=' + manifestUri;
                history.replaceState(null, document.title, newUrl);
            }
        });
    }

    function loadViewer() {
        //Based on https://github.com/UniversalViewer/universalviewer.github.io/blob/master/js/uv.js
        //MIT License
        //Copyright (c) 2016, Edward Silverton
        if (window.initPlayers && window.easyXDM) {
            initPlayers($('.uv'));
        } else {
            setTimeout(loadViewer, 100);
        }
    }
})();