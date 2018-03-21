(function($) {
    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        console.log(angle);
        return (angle < 0) ? angle + 360 : angle;
    }

    function setRotation(obj, direction) {
        var currentRotation = getRotationDegrees(obj);
        var newRotation = (direction == 'left') ? currentRotation - 90 : currentRotation + 90;
        obj.css('transform', 'rotate(' + newRotation + 'deg)');
    }

    $(document).ready(function() {
        $(document).on('o:expanded', '#page-action-menu a.collapse', function() {
            var button = $(this);
            $(document).on('mouseup.page-actions', function(e) {
                var pageActionMenu = $('#page-action-menu ul');
                if (pageActionMenu.is(e.target)) {
                    return;
                }
                if (!button.is(e.target)) {
                    button.click();
                }
                $(document).off('mouseup.page-actions');
            });
        });
    
        $('.layout button').click(function(e) {
            $('.layout button').toggleClass('active');
            $('.wikitext-featherlight').toggleClass('horizontal').toggleClass('vertical');
            $('.layout button:disabled').removeAttr('disabled');
            $('.layout button.active').attr('disabled', true);
        });
    
        $('.full-screen').featherlight('.wikitext-featherlight', {
            beforeOpen: function() {
                $('#wikitext .media-render').panzoom('destroy');
            },
            afterOpen: function() {
                $('.featherlight-content .media-render').panzoom();
            },
            beforeClose: function() {
                $('.featherlight-content .media-render').panzoom('destroy');
            },
            afterClose: function() {
                $('#wikitext .media-render').panzoom();
            }
        });

        $('.panzoom-container').on('click', '.rotate-left', function() {
            var panzoomImg = $(this).parents('.panzoom-container').find('img');
            setRotation(panzoomImg, 'left');
        });

        $('.panzoom-container').on('click', '.rotate-right', function() {
            var panzoomImg = $(this).parents('.panzoom-container').find('img');
            setRotation(panzoomImg, 'right');
        });

        $('.panzoom-container').on('click', '.reset', function() {
            var panzoomImg = $(this).parents('.panzoom-container').find('img');
            panzoomImg.css('transform', 'none');
        });

        // Handle page action menu.
        $(document).on('o:expanded', '#page-action-menu a.collapse', function() {
            var button = $(this);
            $(document).on('mouseup.page-actions', function(e) {
                var pageActionMenu = $('#page-action-menu ul');
                if (pageActionMenu.is(e.target)) {
                    return;
                }
                if (!button.is(e.target)) {
                    button.click();
                }
            });
        });

        // Close all sidebars before opening another.
        $('a.sidebar-content').on('click', function(e) {
            var sidebars = $('.sidebar').each(function() {
                Omeka.closeSidebar($(this));
            });
        });
    });
})(jQuery)

