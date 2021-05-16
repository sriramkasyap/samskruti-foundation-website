function EasyPeasyParallax() {
    var scrollPos = jQuery(document).scrollTop();
    var targetOpacity = 1;
    var flag = false;
    if (scrollPos < 100) {
        targetOpacity = "0";
    } else {
        targetOpacity = (scrollPos * 2) / window.innerHeight;
        flag = true;
    }
    // targetOpacity;
    jQuery("nav").css({
        "background-color": "rgba(255, 255, 255, " + targetOpacity + ")",
    });

    if (flag && scrollPos > 300) {
        jQuery("nav").addClass("turn-white");
    } else {
        jQuery("nav").removeClass("turn-white");
    }
}

$(function () {
    $(window).scroll(function () {
        EasyPeasyParallax();
    });

    $(".smooth-scroll").on("click", function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $("html, body").animate(
                {
                    scrollTop:
                        window.innerWidth > 768
                            ? $(hash).offset().top
                            : $(hash).offset().top - 100,
                },
                800,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    // window.location.hash = hash;
                }
            );
        } // End if
    });
});
