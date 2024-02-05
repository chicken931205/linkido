(function ($) {
    // Make sure you run this code under Elementor.
    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction("frontend/element_ready/the7-woocommerce-loop-product-image.default", function ($widget, $) {
            $(document).ready(function () {
                if (elementorFrontend.isEditMode()) {
                    The7ElementorAnimation.patchElementsAnimation($widget);
                }
                $widget.productSlider();
            })
        });


        if (!elementorFrontend.isEditMode()) {
            The7ElementorAnimation.patchElementsAnimation($('.elementor-widget-the7-woocommerce-loop-product-image .the7-overlay-content'));
        }


        if (elementorFrontend.isEditMode()) {
            elementorEditorAddOnChangeHandler("the7-woocommerce-loop-product-image", refresh);
        }

        function refresh(controlView, widgetView) {
            let refresh_controls = [
                ...The7ElementorSettings.getResponsiveSettingList('hover_visibility'),
            ];
            const controlName = controlView.model.get('name');
            if (-1 !== refresh_controls.indexOf(controlName)) {
                const $widget = $(widgetView.$el);
                const widgetData = $widget.data('productSlider');
                if (typeof widgetData !== 'undefined') {
                    widgetData.refresh();
                } else {
                    $widget.productSlider();
                }
            }
        }
    });

    $.productSlider = function (el) {
        let $widget = $(el),
            methods,
            elementorSettings,
            elementorAnimation,
            elementsWithAnimation,
            settings,
            overlayTemplateExist = false,
            $overlay,
            visibility;
        const $imgSlider = $widget.find(".owl-carousel");

        // Store a reference to the object.
        $.data(el, "productSlider", $widget);

        // Private methods.
        methods = {
            init: function () {
                $widget.layzrInitialisation();
                $overlay = $widget.find('.the7-overlay-content');
                if ($overlay.length) {
                    overlayTemplateExist = true;
                    elementorAnimation = new The7ElementorAnimation();
                    elementsWithAnimation = elementorAnimation.findAnimationsInNode($overlay);

                    if($widget.find('a.post-thumbnail-rollover').length && !elementorFrontend.isEditMode()){
                        $overlay.css('cursor', 'pointer');
                        $overlay.on('click', function(e){
                            let $this = $(this),
                                $thisParent = $this.parent();
                            let $imgWrap =  $thisParent.hasClass('product-image-carousel-wrap') ? $thisParent.find('.dt-owl-item.active a.post-thumbnail-rollover') : $thisParent.find('a.post-thumbnail-rollover');
                            if((e.target.tagName.toLowerCase() !== 'a' && !$(e.target).parents('a').length) && e.target.tagName.toLowerCase() !== 'button' ){
                                if(typeof $imgWrap.attr('data-elementor-open-lightbox') != 'undefined'){
                                    //for lighbox
                                    $imgWrap.trigger("click");
                                }else{
                                    //for regular img link
                                    window.location.href = $imgWrap.attr('href');
                                }
                            }
                        })
                    }
                }

                elementorSettings = new The7ElementorSettings($widget);
                $widget.refresh();
                 if (overlayTemplateExist) {
                    visibility = The7ElementorSettings.getResponsiveControlValue(settings, 'hover_visibility');

                    switch (visibility) {
                        case 'hover-hide':
                            elementorAnimation.animateElements(elementsWithAnimation);
                            break;
                    }


                }
                 // Support image transitions.
                $widget.one('mouseenter', function() {
                    $widget.find('.post-thumbnail-rollover img').addClass('run-img-transitions');
                });
                if ($imgSlider.length) {
                    var $dotsEach = '1' == $imgSlider.attr("data-scroll-mode"),
                    $navPrevHtml = $widget.find('.owl-prev-icon').html(),
                    $navNextHtml = $widget.find('.owl-next-icon').html(),
                    $animateOut = settings['transition'] === 'fade' ? 'fadeOut' : false,
                    $animateIn = settings['transition'] === 'fade' ? 'fadeIn' : false,
                    $transitionSpeed = settings['transition_speed'] ? settings['transition_speed'] : 600,
                    $sliderAutoslideEnable = settings['autoplay'] ? settings['autoplay'] : false,
                    $sliderAutoslidePause = settings['pause_on_hover'] ? settings['pause_on_hover'] : false,
                    $sliderAutoslideDelay = settings['autoplay_speed'] ? settings['autoplay_speed'] : 5000,
                    $navContainer = $widget.find('.elementor-widget-container .owl-nav'),
                    $dotsContainer = $widget.find('.elementor-widget-container .owl-dots'),
                    reloadLayzTimer;
                    $widget.find('.owl-prev-icon').remove();
                    $widget.find('.owl-next-icon').remove();
                    var updateLazyr = function () {
                        clearTimeout(reloadLayzTimer);
                        reloadLayzTimer = setTimeout(function () {
                            $imgSlider.layzrCarouselUpdate();
                        }, 20);
                    }
                    $imgSlider.on('initialized.owl.carousel', function (event) {
                        updateLazyr();
                    });
                    $imgSlider.owlCarousel({
                        items: 1,
                        autoHeight: false,
                        center: false,
                        margin: 0,
                        loadedClass: 'owl-loaded',
                        slideBy: 1,
                        loop: true,
                        smartSpeed: $transitionSpeed,
                        animateOut: $animateOut,
                        animateIn: $animateIn,
                        autoplay: $sliderAutoslideEnable,
                        autoplayTimeout: $sliderAutoslideDelay,
                        autoplayHoverPause:$sliderAutoslidePause,
                        nav: true,
                        navContainer: $navContainer,
                        navElement: "a",
                        navText: [$navPrevHtml, $navNextHtml],
                        dots: true,
                        dotsContainer: $dotsContainer,
                    });
                    $imgSlider.on('change.owl.carousel', function (event) {
                        clearTimeout(reloadLayzTimer);
                        reloadLayzTimer = setTimeout(function () {
                            $imgSlider.layzrCarouselUpdate();
                            $('.dt-owl-item.cloned .lazy-load', $imgSlider).parent().removeClass('layzr-bg');
                        }, 20);
                    });
                }
            },
            handleResize: function () {
                if (overlayTemplateExist) {
                    visibility = The7ElementorSettings.getResponsiveControlValue(settings, 'hover_visibility');
                    switch (visibility) {
                        case 'always':
                            elementorAnimation.animateElements(elementsWithAnimation);
                            break;
                        case 'disabled':
                            elementorAnimation.resetElements(elementsWithAnimation);
                            break;
                    }
                }
            },
            bindEvents: function () {
                elementorFrontend.elements.$window.on('the7-resize-width-debounce', methods.handleResize);
                if (overlayTemplateExist) {
                    $widget.on({mouseenter: methods.mouseenter, mouseleave: methods.mouseleave});
                }
            },
            unBindEvents: function () {
                elementorFrontend.elements.$window.off('the7-resize-width-debounce', methods.handleResize);
                if (overlayTemplateExist) {
                    $widget.off({mouseenter: methods.mouseenter, mouseleave: methods.mouseleave});
                }
            },
            mouseenter: function () {
                switch (visibility) {
                    case 'hover':
                        methods.addAnimation();
                        break;
                    case 'hover-hide':
                        methods.resetAnimation();
                        break;
                }
            },
            mouseleave: function () {
                switch (visibility) {
                    case 'hover':
                        methods.resetAnimation();
                        break;
                    case 'hover-hide':
                        methods.addAnimation();
                        break;
                }
            },
            onOverlayTransitionsEnd: function (event){
                if (event.originalEvent.propertyName === "opacity") {
                    elementorAnimation.resetElements(elementsWithAnimation);
                }
            },
            resetAnimation: function(){
                $overlay.on("transitionend", methods.onOverlayTransitionsEnd);
            },
            addAnimation: function(){
                $overlay.off("transitionend", methods.onOverlayTransitionsEnd);
                elementorAnimation.animateElements(elementsWithAnimation);
            }
        };
        $widget.refresh = function () {
            settings = elementorSettings.getSettings();
            methods.unBindEvents();
            methods.bindEvents();
            methods.handleResize();
        };
        $widget.delete = function () {
            methods.unBindEvents();
            $widget.removeData("productSlider");
        };
        methods.init();
    };

    $.fn.productSlider = function () {
        return this.each(function () {
            if ($(this).data("productSlider") !== undefined) {
                $(this).removeData("productSlider")
            }
            new $.productSlider(this);
        });
    };
})(jQuery);
