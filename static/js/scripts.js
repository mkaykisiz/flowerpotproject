(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/js/themes/3/main.js":[function(require,module,exports){
require('../../common/main');
require('../../components/chat/main');
require('../../components/messages/main');
require('./_pages');
},{"../../common/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/main.js","../../components/chat/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/main.js","../../components/messages/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/main.js","./_pages":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/3/_pages.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_skins.js":[function(require,module,exports){
var asyncLoader = require('../lib/async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + skin + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"../lib/async":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/lib/async.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_skins');
require('../components/forms/main');
require('../components/tables/main');
require('../components/other/_dropdown');
require('../components/other/_tooltip');
require('../components/other/_offcanvas');
require('../components/other/_ratings');
},{"../components/forms/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/main.js","../components/other/_dropdown":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_dropdown.js","../components/other/_offcanvas":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_offcanvas.js","../components/other/_ratings":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_ratings.js","../components/other/_tooltip":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_tooltip.js","../components/tables/main":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/main.js","./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_breakpoints.js","./_skins":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/common/_skins.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint480', function () {
        $('.chat-window-container .panel:not(:last)').remove();
        $('.chat-window-container .panel').attr('id', 'chat-0001');
    });

    $(window).bind('enterBreakpoint768', function () {
        $("body").removeClass('show-chat');

        if ($('.chat-window-container .panel').length == 3) {
            $('.chat-window-container .panel:first').remove();
            $('.chat-window-container .panel:first').attr('id', 'chat-0001');
            $('.chat-window-container .panel:last').attr('id', 'chat-0002');
        }
    });

    $(window).bind('exitBreakpoint768', function () {
        $("body").removeClass('show-chat');


    });
    $(window).bind('enterBreakpoint1024', function () {

    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_check-chat.js":[function(require,module,exports){
module.exports = function () {
    if (!$('body').hasClass('show-chat')) {
        //alert('no chat ');
        $('.chat-window-container .panel-body').addClass('display-none');
        $('.chat-window-container input').addClass('display-none');
    } else {
        $('.chat-window-container .panel-body').removeClass('display-none');
        $('.chat-window-container input').removeClass('display-none');
    }
};

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_hide.js":[function(require,module,exports){
(function ($) {
    "use strict";

    function checkChat() {
        if (! $('body').hasClass('show-chat')) {
            $('.chat-window-container .panel-body').addClass('display-none');
            $('.chat-window-container input').addClass('display-none');
        } else {
            $('.chat-window-container .panel-body').removeClass('display-none');
            $('.chat-window-container input').removeClass('display-none');
        }
    }

    checkChat();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_search.js":[function(require,module,exports){
(function ($) {

    // match anything
    $.expr[ ":" ].containsNoCase = function (el, i, m) {
        var search = m[ 3 ];
        if (! search) return false;
        return new RegExp(search, "i").test($(el).text());
    };

    // Search Filter
    function searchFilterCallBack($data, $opt) {
        var search = $data instanceof jQuery ? $data.val() : $(this).val(),
            opt = typeof $opt == 'undefined' ? $data.data.opt : $opt;

        var $target = $(opt.targetSelector);
        $target.show();

        if (search && search.length >= opt.charCount) {
            $target.not(":containsNoCase(" + search + ")").hide();
        }
    }

    // input filter
    $.fn.searchFilter = function (options) {
        var opt = $.extend({
            // target selector
            targetSelector: "",
            // number of characters before search is applied
            charCount: 1
        }, options);

        return this.each(function () {
            var $el = $(this);
            $el.off("keyup", searchFilterCallBack);
            $el.on("keyup", null, {opt: opt}, searchFilterCallBack);
        });

    };

    // Filter by All/Online/Offline
    $(".chat-filter a").on('click', function (e) {

        e.preventDefault();
        $('.chat-contacts li').hide();
        $('.chat-contacts').find($(this).data('target')).show();

        $(".chat-filter li").removeClass('active');
        $(this).parent().addClass('active');

        $(".chat-search input").searchFilter({targetSelector: ".chat-contacts " + $(this).data('target')});

        // Filter Contacts by Search and Tabs
        searchFilterCallBack($(".chat-search input"), {
            targetSelector: ".chat-contacts " + $(this).data('target'),
            charCount: 1
        });
    });

    // Trigger Search Filter
    $(".chat-search input").searchFilter({targetSelector: ".chat-contacts li"});

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_toggle.js":[function(require,module,exports){
(function ($) {

    $('[data-toggle="chat-box"]').on('click', function () {
        $(".chat-contacts li:first").trigger('click');
        if ($(this).data('hide')) $(this).hide();
    });

    (function () {
        var toggleBtn = $('[data-toggle="sidebar-chat"]');
        // If No Sidebar Exit
        if (!toggleBtn.length) return;

        toggleBtn.on('click', function () {

            $('body').toggleClass('show-chat');

            require('./_check-chat')();
        });
    })();

    require('./_check-chat')();
})(jQuery);
},{"./_check-chat":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_check-chat.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_windows.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var container = $('.chat-window-container');

    // Click User
    $(".chat-contacts li").on('click', function () {

        if ($('.chat-window-container [data-user-id="' + $(this).data('userId') + '"]').length) return;

        // If user is offline do nothing
        if ($(this).attr('class') === 'offline') return;

        var source = $("#chat-window-template").html();
        var template = Handlebars.compile(source);

        var context = {user_image: $(this).find('img').attr('src'), user: $(this).find('.contact-name').text()};
        var html = template(context);

        var clone = $(html);

        clone.attr("data-user-id", $(this).data("userId"));

        container.find('.panel:not([id^="chat"])').remove();

        var count = container.find('.panel').length;

        count ++;
        var limit = $(window).width() > 768 ? 3 : 1;
        if (count >= limit) {
            container.find('#chat-000'+ limit).remove();
            count = limit;
        }

        clone.attr('id', 'chat-000' + parseInt(count));
        container.append(clone).show();

        clone.show();
        clone.find('> .panel-body').removeClass('display-none');
        clone.find('> input').removeClass('display-none');
    });

    // Change ID by No. of Windows
    function chatLayout() {
        container.find('.panel').each(function (index, value) {
            $(this).attr('id', 'chat-000' + parseInt(index + 1));
        });
    }

    // remove window
    $("body").on('click', ".chat-window-container .close", function () {
        $(this).parent().parent().remove();
        chatLayout();
        if ($(window).width() < 768) $('.chat-window-container').hide();
    });

    // Chat heading collapse window
    $('body').on('click', '.chat-window-container .panel-heading', function (e) {
        e.preventDefault();
        $(this).parent().find('> .panel-body').toggleClass('display-none');
        $(this).parent().find('> input').toggleClass('display-none');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_search');
require('./_windows');
require('./_toggle');
require('./_hide');
},{"./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_breakpoints.js","./_hide":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_hide.js","./_search":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_search.js","./_toggle":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_toggle.js","./_windows":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/chat/_windows.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Datepicker INIT
    $('.datepicker').datepicker();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Minicolors INIT
    $('.minicolors').each(function () {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function (hex, opacity) {
                if (! hex) return;
                if (opacity) hex += ', ' + opacity;
                if (typeof console === 'object') {
                    console.log(hex);
                }
            },
            theme: 'bootstrap'
        });
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.selectpicker').selectpicker();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#ex1').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });

    $("#ex2").slider();

    $("#ex6").slider();

    $("#ex6").on("slide", function (slideEvt) {
        $("#ex6SliderVal").text(slideEvt.value);
    });

    $('.slider-handle').html('<i class="fa fa-bars fa-rotate-90"></i>');

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/main.js":[function(require,module,exports){
require('./_progress-bars');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
},{"./_datepicker":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_datepicker.js","./_minicolors":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_minicolors.js","./_progress-bars":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_progress-bars.js","./_selectpicker":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_selectpicker.js","./_slider":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/forms/_slider.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint320', function () {
        var img = $('.messages-list .panel ul img');
        $('.messages-list .panel ul').width(img.first().width() * img.length);
    });

    $(window).bind('exitBreakpoint320', function () {
        $('.messages-list .panel ul').width('auto');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_nicescroll.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var nice = $('.messages-list .panel').niceScroll({cursorborder: 0, cursorcolor: "#25ad9f", zindex: 1});

    var _super = nice.getContentSize;

    nice.getContentSize = function () {
        var page = _super.call(nice);
        page.h = nice.win.height();
        return page;
    };

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_nicescroll');
},{"./_breakpoints":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_breakpoints.js","./_nicescroll":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/messages/_nicescroll.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Dropdown
    $('.dropdown-toggle').dropdown();

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_offcanvas.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // OffCanvas
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_ratings.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Ratings
    $('.rating span.star').on('click', function () {
        var total = $(this).parent().children().length;
        var clickedIndex = $(this).index();
        $('.rating span.star').removeClass('filled');
        for (var i = clickedIndex; i < total; i ++) {
            $('.rating span.star').eq(i).addClass('filled');
        }
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/other/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Table Checkbox All
    $('#checkAll').on('click', function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_datatables.js":[function(require,module,exports){
(function ($) {

    // Datatables
    $('#data-table').dataTable();

})(jQuery);
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/main.js":[function(require,module,exports){
require('./_datatables');
require('./_check-all');
},{"./_check-all":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_check-all.js","./_datatables":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/components/tables/_datatables.js"}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/lib/async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/timeline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).gridalicious({
            gutter: 15,
            width: 370,
            selector: '> div'
        });
    });

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/users.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#users-filter-select').on('change', function () {
        if (this.value === 'name') {
            $('#user-first').removeClass('hidden');
            $('#user-search-name').removeClass('hidden');
        } else {
            $('#user-first').addClass('hidden');
            $('#user-search-name').addClass('hidden');
        }
        if (this.value === 'friends') {
            $('.select-friends').removeClass('hidden');

        } else {
            $('.select-friends').addClass('hidden');
        }
        if (this.value === 'name') {
            $('.search-name').removeClass('hidden');

        } else {
            $('.search-name').addClass('hidden');
        }
    });

})(jQuery);

},{}],"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/themes/3/_pages.js":[function(require,module,exports){
require('../../pages/users');
require('../../pages/timeline');
},{"../../pages/timeline":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/timeline.js","../../pages/users":"/Applications/MAMP/htdocs/social-2/dev/dev/app/js/pages/users.js"}]},{},["./app/js/themes/3/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvdGhlbWVzLzMvbWFpbi5qcyIsImFwcC9qcy9jb21tb24vX2JyZWFrcG9pbnRzLmpzIiwiYXBwL2pzL2NvbW1vbi9fc2tpbnMuanMiLCJhcHAvanMvY29tbW9uL21haW4uanMiLCJhcHAvanMvY29tcG9uZW50cy9jaGF0L19icmVha3BvaW50cy5qcyIsImFwcC9qcy9jb21wb25lbnRzL2NoYXQvX2NoZWNrLWNoYXQuanMiLCJhcHAvanMvY29tcG9uZW50cy9jaGF0L19oaWRlLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvY2hhdC9fc2VhcmNoLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvY2hhdC9fdG9nZ2xlLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvY2hhdC9fd2luZG93cy5qcyIsImFwcC9qcy9jb21wb25lbnRzL2NoYXQvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL2Zvcm1zL19kYXRlcGlja2VyLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvZm9ybXMvX21pbmljb2xvcnMuanMiLCJhcHAvanMvY29tcG9uZW50cy9mb3Jtcy9fcHJvZ3Jlc3MtYmFycy5qcyIsImFwcC9qcy9jb21wb25lbnRzL2Zvcm1zL19zZWxlY3RwaWNrZXIuanMiLCJhcHAvanMvY29tcG9uZW50cy9mb3Jtcy9fc2xpZGVyLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvZm9ybXMvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL21lc3NhZ2VzL19icmVha3BvaW50cy5qcyIsImFwcC9qcy9jb21wb25lbnRzL21lc3NhZ2VzL19uaWNlc2Nyb2xsLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvbWVzc2FnZXMvbWFpbi5qcyIsImFwcC9qcy9jb21wb25lbnRzL290aGVyL19kcm9wZG93bi5qcyIsImFwcC9qcy9jb21wb25lbnRzL290aGVyL19vZmZjYW52YXMuanMiLCJhcHAvanMvY29tcG9uZW50cy9vdGhlci9fcmF0aW5ncy5qcyIsImFwcC9qcy9jb21wb25lbnRzL290aGVyL190b29sdGlwLmpzIiwiYXBwL2pzL2NvbXBvbmVudHMvdGFibGVzL19jaGVjay1hbGwuanMiLCJhcHAvanMvY29tcG9uZW50cy90YWJsZXMvX2RhdGF0YWJsZXMuanMiLCJhcHAvanMvY29tcG9uZW50cy90YWJsZXMvbWFpbi5qcyIsImFwcC9qcy9saWIvYXN5bmMuanMiLCJhcHAvanMvcGFnZXMvdGltZWxpbmUuanMiLCJhcHAvanMvcGFnZXMvdXNlcnMuanMiLCJhcHAvanMvdGhlbWVzLzMvX3BhZ2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuLi8uLi9jb21tb24vbWFpbicpO1xucmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jaGF0L21haW4nKTtcbnJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVzc2FnZXMvbWFpbicpO1xucmVxdWlyZSgnLi9fcGFnZXMnKTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQod2luZG93KS5zZXRCcmVha3BvaW50cyh7XG4gICAgICAgIGRpc3RpbmN0OiB0cnVlLFxuICAgICAgICBicmVha3BvaW50czogWyAzMjAsIDQ4MCwgNzY4LCAxMDI0IF1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCJ2YXIgYXN5bmNMb2FkZXIgPSByZXF1aXJlKCcuLi9saWIvYXN5bmMnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhbmdlU2tpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIik7XG4gICAgICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYXN5bmNMb2FkZXIoWyAnY3NzLycgKyBza2luICsgJy5taW4uY3NzJyBdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5yZW1vdmVQcm9wKCdkaXNhYmxlZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW5cIiwgJCh0aGlzKS5kYXRhKCdza2luJykpO1xuXG4gICAgICAgIGNoYW5nZVNraW4oKTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIik7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcgJiYgc2tpbiAhPSAnZGVmYXVsdCcpIHtcbiAgICAgICAgY2hhbmdlU2tpbigpO1xuICAgIH1cblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19icmVha3BvaW50cycpO1xucmVxdWlyZSgnLi9fc2tpbnMnKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybXMvbWFpbicpO1xucmVxdWlyZSgnLi4vY29tcG9uZW50cy90YWJsZXMvbWFpbicpO1xucmVxdWlyZSgnLi4vY29tcG9uZW50cy9vdGhlci9fZHJvcGRvd24nKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3RoZXIvX3Rvb2x0aXAnKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvb3RoZXIvX29mZmNhbnZhcycpO1xucmVxdWlyZSgnLi4vY29tcG9uZW50cy9vdGhlci9fcmF0aW5ncycpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDQ4MCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWw6bm90KDpsYXN0KScpLnJlbW92ZSgpO1xuICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbCcpLmF0dHIoJ2lkJywgJ2NoYXQtMDAwMScpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDc2OCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoJ3Nob3ctY2hhdCcpO1xuXG4gICAgICAgIGlmICgkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbCcpLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbDpmaXJzdCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWw6Zmlyc3QnKS5hdHRyKCdpZCcsICdjaGF0LTAwMDEnKTtcbiAgICAgICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsOmxhc3QnKS5hdHRyKCdpZCcsICdjaGF0LTAwMDInKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2V4aXRCcmVha3BvaW50NzY4JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnc2hvdy1jaGF0Jyk7XG5cblxuICAgIH0pO1xuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQxMDI0JywgZnVuY3Rpb24gKCkge1xuXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoISQoJ2JvZHknKS5oYXNDbGFzcygnc2hvdy1jaGF0JykpIHtcbiAgICAgICAgLy9hbGVydCgnbm8gY2hhdCAnKTtcbiAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwtYm9keScpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciBpbnB1dCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbC1ib2R5JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIGlucHV0JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgIH1cbn07XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGZ1bmN0aW9uIGNoZWNrQ2hhdCgpIHtcbiAgICAgICAgaWYgKCEgJCgnYm9keScpLmhhc0NsYXNzKCdzaG93LWNoYXQnKSkge1xuICAgICAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciAucGFuZWwtYm9keScpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgICAgICQoJy5jaGF0LXdpbmRvdy1jb250YWluZXIgaW5wdXQnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyIC5wYW5lbC1ib2R5JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgICAgICAgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciBpbnB1dCcpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQ2hhdCgpO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvLyBtYXRjaCBhbnl0aGluZ1xuICAgICQuZXhwclsgXCI6XCIgXS5jb250YWluc05vQ2FzZSA9IGZ1bmN0aW9uIChlbCwgaSwgbSkge1xuICAgICAgICB2YXIgc2VhcmNoID0gbVsgMyBdO1xuICAgICAgICBpZiAoISBzZWFyY2gpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoc2VhcmNoLCBcImlcIikudGVzdCgkKGVsKS50ZXh0KCkpO1xuICAgIH07XG5cbiAgICAvLyBTZWFyY2ggRmlsdGVyXG4gICAgZnVuY3Rpb24gc2VhcmNoRmlsdGVyQ2FsbEJhY2soJGRhdGEsICRvcHQpIHtcbiAgICAgICAgdmFyIHNlYXJjaCA9ICRkYXRhIGluc3RhbmNlb2YgalF1ZXJ5ID8gJGRhdGEudmFsKCkgOiAkKHRoaXMpLnZhbCgpLFxuICAgICAgICAgICAgb3B0ID0gdHlwZW9mICRvcHQgPT0gJ3VuZGVmaW5lZCcgPyAkZGF0YS5kYXRhLm9wdCA6ICRvcHQ7XG5cbiAgICAgICAgdmFyICR0YXJnZXQgPSAkKG9wdC50YXJnZXRTZWxlY3Rvcik7XG4gICAgICAgICR0YXJnZXQuc2hvdygpO1xuXG4gICAgICAgIGlmIChzZWFyY2ggJiYgc2VhcmNoLmxlbmd0aCA+PSBvcHQuY2hhckNvdW50KSB7XG4gICAgICAgICAgICAkdGFyZ2V0Lm5vdChcIjpjb250YWluc05vQ2FzZShcIiArIHNlYXJjaCArIFwiKVwiKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbnB1dCBmaWx0ZXJcbiAgICAkLmZuLnNlYXJjaEZpbHRlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBvcHQgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICAvLyB0YXJnZXQgc2VsZWN0b3JcbiAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yOiBcIlwiLFxuICAgICAgICAgICAgLy8gbnVtYmVyIG9mIGNoYXJhY3RlcnMgYmVmb3JlIHNlYXJjaCBpcyBhcHBsaWVkXG4gICAgICAgICAgICBjaGFyQ291bnQ6IDFcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJCh0aGlzKTtcbiAgICAgICAgICAgICRlbC5vZmYoXCJrZXl1cFwiLCBzZWFyY2hGaWx0ZXJDYWxsQmFjayk7XG4gICAgICAgICAgICAkZWwub24oXCJrZXl1cFwiLCBudWxsLCB7b3B0OiBvcHR9LCBzZWFyY2hGaWx0ZXJDYWxsQmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIC8vIEZpbHRlciBieSBBbGwvT25saW5lL09mZmxpbmVcbiAgICAkKFwiLmNoYXQtZmlsdGVyIGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5jaGF0LWNvbnRhY3RzIGxpJykuaGlkZSgpO1xuICAgICAgICAkKCcuY2hhdC1jb250YWN0cycpLmZpbmQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkuc2hvdygpO1xuXG4gICAgICAgICQoXCIuY2hhdC1maWx0ZXIgbGlcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAkKFwiLmNoYXQtc2VhcmNoIGlucHV0XCIpLnNlYXJjaEZpbHRlcih7dGFyZ2V0U2VsZWN0b3I6IFwiLmNoYXQtY29udGFjdHMgXCIgKyAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpfSk7XG5cbiAgICAgICAgLy8gRmlsdGVyIENvbnRhY3RzIGJ5IFNlYXJjaCBhbmQgVGFic1xuICAgICAgICBzZWFyY2hGaWx0ZXJDYWxsQmFjaygkKFwiLmNoYXQtc2VhcmNoIGlucHV0XCIpLCB7XG4gICAgICAgICAgICB0YXJnZXRTZWxlY3RvcjogXCIuY2hhdC1jb250YWN0cyBcIiArICQodGhpcykuZGF0YSgndGFyZ2V0JyksXG4gICAgICAgICAgICBjaGFyQ291bnQ6IDFcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VyIFNlYXJjaCBGaWx0ZXJcbiAgICAkKFwiLmNoYXQtc2VhcmNoIGlucHV0XCIpLnNlYXJjaEZpbHRlcih7dGFyZ2V0U2VsZWN0b3I6IFwiLmNoYXQtY29udGFjdHMgbGlcIn0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJjaGF0LWJveFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcIi5jaGF0LWNvbnRhY3RzIGxpOmZpcnN0XCIpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ2hpZGUnKSkgJCh0aGlzKS5oaWRlKCk7XG4gICAgfSk7XG5cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdG9nZ2xlQnRuID0gJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1jaGF0XCJdJyk7XG4gICAgICAgIC8vIElmIE5vIFNpZGViYXIgRXhpdFxuICAgICAgICBpZiAoIXRvZ2dsZUJ0bi5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0b2dnbGVCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3Nob3ctY2hhdCcpO1xuXG4gICAgICAgICAgICByZXF1aXJlKCcuL19jaGVjay1jaGF0JykoKTtcbiAgICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIHJlcXVpcmUoJy4vX2NoZWNrLWNoYXQnKSgpO1xufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBjb250YWluZXIgPSAkKCcuY2hhdC13aW5kb3ctY29udGFpbmVyJyk7XG5cbiAgICAvLyBDbGljayBVc2VyXG4gICAgJChcIi5jaGF0LWNvbnRhY3RzIGxpXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lciBbZGF0YS11c2VyLWlkPVwiJyArICQodGhpcykuZGF0YSgndXNlcklkJykgKyAnXCJdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8gSWYgdXNlciBpcyBvZmZsaW5lIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cignY2xhc3MnKSA9PT0gJ29mZmxpbmUnKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNvdXJjZSA9ICQoXCIjY2hhdC13aW5kb3ctdGVtcGxhdGVcIikuaHRtbCgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoc291cmNlKTtcblxuICAgICAgICB2YXIgY29udGV4dCA9IHt1c2VyX2ltYWdlOiAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLCB1c2VyOiAkKHRoaXMpLmZpbmQoJy5jb250YWN0LW5hbWUnKS50ZXh0KCl9O1xuICAgICAgICB2YXIgaHRtbCA9IHRlbXBsYXRlKGNvbnRleHQpO1xuXG4gICAgICAgIHZhciBjbG9uZSA9ICQoaHRtbCk7XG5cbiAgICAgICAgY2xvbmUuYXR0cihcImRhdGEtdXNlci1pZFwiLCAkKHRoaXMpLmRhdGEoXCJ1c2VySWRcIikpO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcucGFuZWw6bm90KFtpZF49XCJjaGF0XCJdKScpLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciBjb3VudCA9IGNvbnRhaW5lci5maW5kKCcucGFuZWwnKS5sZW5ndGg7XG5cbiAgICAgICAgY291bnQgKys7XG4gICAgICAgIHZhciBsaW1pdCA9ICQod2luZG93KS53aWR0aCgpID4gNzY4ID8gMyA6IDE7XG4gICAgICAgIGlmIChjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmZpbmQoJyNjaGF0LTAwMCcrIGxpbWl0KS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGNvdW50ID0gbGltaXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjbG9uZS5hdHRyKCdpZCcsICdjaGF0LTAwMCcgKyBwYXJzZUludChjb3VudCkpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kKGNsb25lKS5zaG93KCk7XG5cbiAgICAgICAgY2xvbmUuc2hvdygpO1xuICAgICAgICBjbG9uZS5maW5kKCc+IC5wYW5lbC1ib2R5JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgICAgICBjbG9uZS5maW5kKCc+IGlucHV0JykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hhbmdlIElEIGJ5IE5vLiBvZiBXaW5kb3dzXG4gICAgZnVuY3Rpb24gY2hhdExheW91dCgpIHtcbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy5wYW5lbCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdpZCcsICdjaGF0LTAwMCcgKyBwYXJzZUludChpbmRleCArIDEpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIHdpbmRvd1xuICAgICQoXCJib2R5XCIpLm9uKCdjbGljaycsIFwiLmNoYXQtd2luZG93LWNvbnRhaW5lciAuY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgICBjaGF0TGF5b3V0KCk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCkgJCgnLmNoYXQtd2luZG93LWNvbnRhaW5lcicpLmhpZGUoKTtcbiAgICB9KTtcblxuICAgIC8vIENoYXQgaGVhZGluZyBjb2xsYXBzZSB3aW5kb3dcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5jaGF0LXdpbmRvdy1jb250YWluZXIgLnBhbmVsLWhlYWRpbmcnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnPiAucGFuZWwtYm9keScpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCc+IGlucHV0JykudG9nZ2xlQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX3NlYXJjaCcpO1xucmVxdWlyZSgnLi9fd2luZG93cycpO1xucmVxdWlyZSgnLi9fdG9nZ2xlJyk7XG5yZXF1aXJlKCcuL19oaWRlJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBEYXRlcGlja2VyIElOSVRcbiAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gTWluaWNvbG9ycyBJTklUXG4gICAgJCgnLm1pbmljb2xvcnMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5taW5pY29sb3JzKHtcbiAgICAgICAgICAgIGNvbnRyb2w6ICQodGhpcykuYXR0cignZGF0YS1jb250cm9sJykgfHwgJ2h1ZScsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6ICQodGhpcykuYXR0cignZGF0YS1kZWZhdWx0VmFsdWUnKSB8fCAnJyxcbiAgICAgICAgICAgIGlubGluZTogJCh0aGlzKS5hdHRyKCdkYXRhLWlubGluZScpID09PSAndHJ1ZScsXG4gICAgICAgICAgICBsZXR0ZXJDYXNlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtbGV0dGVyQ2FzZScpIHx8ICdsb3dlcmNhc2UnLFxuICAgICAgICAgICAgb3BhY2l0eTogJCh0aGlzKS5hdHRyKCdkYXRhLW9wYWNpdHknKSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAkKHRoaXMpLmF0dHIoJ2RhdGEtcG9zaXRpb24nKSB8fCAnYm90dG9tIGxlZnQnLFxuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoaGV4LCBvcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCEgaGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkpIGhleCArPSAnLCAnICsgb3BhY2l0eTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgLy8gUHJvZ3Jlc3MgQmFyIEFuaW1hdGlvblxuICAgICQoJy5wcm9ncmVzcy1iYXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS53aWR0aCgkKHRoaXMpLmF0dHIoJ2FyaWEtdmFsdWVub3cnKSArICclJyk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcuc2VsZWN0cGlja2VyJykuc2VsZWN0cGlja2VyKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNleDEnKS5zbGlkZXIoe1xuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICdDdXJyZW50IHZhbHVlOiAnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCIjZXgyXCIpLnNsaWRlcigpO1xuXG4gICAgJChcIiNleDZcIikuc2xpZGVyKCk7XG5cbiAgICAkKFwiI2V4NlwiKS5vbihcInNsaWRlXCIsIGZ1bmN0aW9uIChzbGlkZUV2dCkge1xuICAgICAgICAkKFwiI2V4NlNsaWRlclZhbFwiKS50ZXh0KHNsaWRlRXZ0LnZhbHVlKTtcbiAgICB9KTtcblxuICAgICQoJy5zbGlkZXItaGFuZGxlJykuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1iYXJzIGZhLXJvdGF0ZS05MFwiPjwvaT4nKTtcblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19wcm9ncmVzcy1iYXJzJyk7XG5yZXF1aXJlKCcuL19zbGlkZXInKTtcbnJlcXVpcmUoJy4vX3NlbGVjdHBpY2tlcicpO1xucmVxdWlyZSgnLi9fZGF0ZXBpY2tlcicpO1xucmVxdWlyZSgnLi9fbWluaWNvbG9ycycpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDMyMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGltZyA9ICQoJy5tZXNzYWdlcy1saXN0IC5wYW5lbCB1bCBpbWcnKTtcbiAgICAgICAgJCgnLm1lc3NhZ2VzLWxpc3QgLnBhbmVsIHVsJykud2lkdGgoaW1nLmZpcnN0KCkud2lkdGgoKSAqIGltZy5sZW5ndGgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2V4aXRCcmVha3BvaW50MzIwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcubWVzc2FnZXMtbGlzdCAucGFuZWwgdWwnKS53aWR0aCgnYXV0bycpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgbmljZSA9ICQoJy5tZXNzYWdlcy1saXN0IC5wYW5lbCcpLm5pY2VTY3JvbGwoe2N1cnNvcmJvcmRlcjogMCwgY3Vyc29yY29sb3I6IFwiIzI1YWQ5ZlwiLCB6aW5kZXg6IDF9KTtcblxuICAgIHZhciBfc3VwZXIgPSBuaWNlLmdldENvbnRlbnRTaXplO1xuXG4gICAgbmljZS5nZXRDb250ZW50U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbChuaWNlKTtcbiAgICAgICAgcGFnZS5oID0gbmljZS53aW4uaGVpZ2h0KCk7XG4gICAgICAgIHJldHVybiBwYWdlO1xuICAgIH07XG5cbn0pKGpRdWVyeSk7IiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMnKTtcbnJlcXVpcmUoJy4vX25pY2VzY3JvbGwnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIERyb3Bkb3duXG4gICAgJCgnLmRyb3Bkb3duLXRvZ2dsZScpLmRyb3Bkb3duKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIE9mZkNhbnZhc1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cIm9mZmNhbnZhc1wiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLnJvdy1vZmZjYW52YXMnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFJhdGluZ3NcbiAgICAkKCcucmF0aW5nIHNwYW4uc3RhcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgdmFyIGNsaWNrZWRJbmRleCA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgJCgnLnJhdGluZyBzcGFuLnN0YXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSBjbGlja2VkSW5kZXg7IGkgPCB0b3RhbDsgaSArKykge1xuICAgICAgICAgICAgJCgnLnJhdGluZyBzcGFuLnN0YXInKS5lcShpKS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gVG9vbHRpcFxuICAgICQoXCJib2R5XCIpLnRvb2x0aXAoe3NlbGVjdG9yOiAnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScsIGNvbnRhaW5lcjogXCJib2R5XCJ9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gVGFibGUgQ2hlY2tib3ggQWxsXG4gICAgJCgnI2NoZWNrQWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCd0YWJsZScpLmZpbmQoJ3RkIGlucHV0OmNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRoaXMuY2hlY2tlZCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgIC8vIERhdGF0YWJsZXNcbiAgICAkKCcjZGF0YS10YWJsZScpLmRhdGFUYWJsZSgpO1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2RhdGF0YWJsZXMnKTtcbnJlcXVpcmUoJy4vX2NoZWNrLWFsbCcpOyIsImZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXG4gICAgdmFyIGRvbmUgPSBmYWxzZSwgdG9wID0gdHJ1ZSxcblxuICAgICAgICBkb2MgPSB3aW4uZG9jdW1lbnQsXG4gICAgICAgIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBtb2Rlcm4gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lcixcblxuICAgICAgICBhZGQgPSBtb2Rlcm4gPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgICAgICByZW0gPSBtb2Rlcm4gPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgICAgICBwcmUgPSBtb2Rlcm4gPyAnJyA6ICdvbicsXG5cbiAgICAgICAgaW5pdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS50eXBlID09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPSAnY29tcGxldGUnKSByZXR1cm47XG4gICAgICAgICAgICAoZS50eXBlID09ICdsb2FkJyA/IHdpbiA6IGRvYylbIHJlbSBdKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKCEgZG9uZSAmJiAoZG9uZSA9IHRydWUpKSBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHBvbGwsIDUwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbml0KCdwb2xsJyk7XG4gICAgICAgIH07XG5cbiAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykgZm4uY2FsbCh3aW4sICdsYXp5Jyk7XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghIG1vZGVybiAmJiByb290LmRvU2Nyb2xsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRvcCA9ICEgd2luLmZyYW1lRWxlbWVudDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b3ApIHBvbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBkb2NbIGFkZCBdKHByZSArICdET01Db250ZW50TG9hZGVkJywgaW5pdCwgZmFsc2UpO1xuICAgICAgICBkb2NbIGFkZCBdKHByZSArICdyZWFkeXN0YXRlY2hhbmdlJywgaW5pdCwgZmFsc2UpO1xuICAgICAgICB3aW5bIGFkZCBdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgdmFyIGFzeW5jTG9hZGVyID0gZnVuY3Rpb24gKHVybHMsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdXJscy5mb3JlYWNoKGZ1bmN0aW9uIChpLCBmaWxlKSB7XG4gICAgICAgICAgICBsb2FkQ3NzKGZpbGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGVja2luZyBmb3IgYSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNhbGxpbmcgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICBjb250ZW50TG9hZGVkKHdpbmRvdywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBsb2FkQ3NzID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICB2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVsgMCBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH07XG5cbiAgICAvLyBzaW1wbGUgZm9yZWFjaCBpbXBsZW1lbnRhdGlvblxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JlYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIHRoaXNbIGkgXSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgYXN5bmNMb2FkZXIodXJscywgY2FsbGJhY2spO1xuXG59OyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlKj1cImdyaWRhbGljaW91c1wiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmdyaWRhbGljaW91cyh7XG4gICAgICAgICAgICBndXR0ZXI6IDE1LFxuICAgICAgICAgICAgd2lkdGg6IDM3MCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnPiBkaXYnXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJCgnLnNoYXJlIHRleHRhcmVhJykub24oJ2tleXVwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiLnNoYXJlIGJ1dHRvblwiKVsgJCh0aGlzKS52YWwoKSA9PT0gJycgPyAnaGlkZScgOiAnc2hvdycgXSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKCEgJChcIiNzY3JvbGwtc3B5XCIpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgdmFyIG9mZnNldCA9ICQoXCIjc2Nyb2xsLXNweVwiKS5vZmZzZXQoKS50b3A7XG5cbiAgICAkKCdib2R5Jykuc2Nyb2xsc3B5KHt0YXJnZXQ6ICcjc2Nyb2xsLXNweScsIG9mZnNldDogb2Zmc2V0fSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyN1c2Vycy1maWx0ZXItc2VsZWN0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgJCgnI3VzZXItZmlyc3QnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAkKCcjdXNlci1zZWFyY2gtbmFtZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyN1c2VyLWZpcnN0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJCgnI3VzZXItc2VhcmNoLW5hbWUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICdmcmllbmRzJykge1xuICAgICAgICAgICAgJCgnLnNlbGVjdC1mcmllbmRzJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2VsZWN0LWZyaWVuZHMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICAgICAgJCgnLnNlYXJjaC1uYW1lJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2VhcmNoLW5hbWUnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsInJlcXVpcmUoJy4uLy4uL3BhZ2VzL3VzZXJzJyk7XG5yZXF1aXJlKCcuLi8uLi9wYWdlcy90aW1lbGluZScpOyJdfQ==
