function EasyPeasyParallax() {
    var scrollPos = jQuery(document).scrollTop();
    var targetOpacity = 1;
    var flag = false;
    if (scrollPos < 1) {
        targetOpacity = "0";
    } else {
        targetOpacity = (scrollPos * 2) / window.innerHeight;
        flag = true;
    }
    // targetOpacity;
    jQuery("nav").css({
        "background-color": "rgba(41, 41, 41, " + targetOpacity + ")",
    });

    if (flag) {
        jQuery("nav").addClass("turn-white");
    } else {
        jQuery("nav").removeClass("turn-white");
    }
}

$(function () {
    $(window).scroll(function () {
        EasyPeasyParallax();
    });
});
