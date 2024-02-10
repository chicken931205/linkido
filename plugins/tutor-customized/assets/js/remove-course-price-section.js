(function($){
    $( document ).ready( function() {
        $("div.tutor-course-price-wrapper.tutor-mb-32.tutor-row.tutor-align-center").css({'display': 'none'});

        $("div.tutor-row.tutor-mb-32 > div.tutor-col-12.tutor-mb-12 > label.tutor-fs-6.tutor-fw-medium.tutor-color-black").html("");
        $("div.tutor-row.tutor-mb-32 > div.tutor-col-12.tutor-mb-12 > label.tutor-fs-6.tutor-fw-medium.tutor-color-black").html("Total Sessions");

        $("div.tutor-row.tutor-mb-32 > div.tutor-col-6.tutor-col-sm-4.tutor-col-md-3:nth-child(2)").css({'display': 'none'});
    });
})(jQuery);