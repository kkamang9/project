'use strict';

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window);
            $(function() {
                
                // 음성 메인 팝업 슬라이드 - S
                var $popupBox = $('.popup_box'),
                    $popupSlide = $popupBox.find('.popup_slide'),
                    $popupButtonWrap = $popupBox.find('.popup_button_wrap'),
                    $popupButtonPrev = $popupButtonWrap.find('.button_box.prev .btn'),
                    $popupButtonNext = $popupButtonWrap.find('.button_box.next .btn'),
                    $popupButtonAuto = $popupButtonWrap.find('.button_box.auto .btn'),
                    $popupNumberBox = $popupButtonWrap.find('.number_box'),
                    $popupNumberTotal = $popupNumberBox.find('.popup_num.total'),
                    $popupNumberCurrent = $popupNumberBox.find('.popup_num.current');
                $popupSlide.slick({
                    accessibility: true,
                    variableWidth: false,
                    adaptiveHeight: false,
                    rows: 1,
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                    fade: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    pauseOnDotsHover: true,
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    arrows: true,
                    prevArrow: $popupButtonPrev,
                    nextArrow: $popupButtonNext,
                    autoArrow: $popupButtonAuto,
                    pauseText: '정지',
                    playText: '재생',
                    total: $popupNumberTotal,
                    current: $popupNumberCurrent,
                    dots: false,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    zIndex: 0,
                    responsive: [{}]
                });
                // 음성 메인 팝업 슬라이드 - E
                
                // 임시 S
                var $startGalleryItem = $('.gallery_wrap .gallery_box .gallery_slide .slide_item'),
                    $startGalleryItemLength = $startGalleryItem.length;
                var $startImgArray = [];
                var $startDataArray = [];
                var MinData = 0;
                var MaxData = 0;
                $startGalleryItem.each(function(){
                    var $this = $(this),
                        DataImg = $this.attr('data-img'),
                        $thisImg = $this.find('img'),
                        thisImgSrc = $thisImg.attr('src');
                    $startDataArray.push(DataImg);
                    $startImgArray.push(thisImgSrc);
                    MinData = Math.min.apply(null, $startDataArray);
                    MaxData = Math.max.apply(null, $startDataArray);
                });
                for(var i=0; i<$startGalleryItemLength; i++){
                    $startGalleryItem.eq(i).prepend('<i class="hidden_left hidden_clone" style="background-image:url('+$startImgArray[i-1]+');"></i>');
                    $startGalleryItem.eq(i).append('<i class="hidden_right hidden_clone" style="background-image:url('+$startImgArray[i+1]+');"></i>');
                }
                if($startImgArray[MinData-1] == null ){
                    $startGalleryItem.eq(MinData).find('.hidden_clone').remove();
                    $startGalleryItem.eq(MinData).prepend('<i class="hidden_left hidden_clone" style="background-image:url('+$startImgArray[MaxData]+');"></i>');
                    $startGalleryItem.eq(MinData).append('<i class="hidden_right hidden_clone" style="background-image:url('+$startImgArray[MinData+1]+');"></i>');
                }
                if($startImgArray[MaxData+1]  == null ){
                    $startGalleryItem.eq(MaxData).find('.hidden_clone').remove();
                    $startGalleryItem.eq(MaxData).prepend('<i class="hidden_left hidden_clone" style="background-image:url('+$startImgArray[MaxData-1]+');"></i>');
                    $startGalleryItem.eq(MaxData).append('<i class="hidden_right hidden_clone" style="background-image:url('+$startImgArray[MinData]+');"></i>');
                }
                // 임시 E
                
                // 갤러리 슬라이드 - S
                var $galleryBox = $('.gallery_wrap .gallery_box'),
                    $gallerySlide = $galleryBox.find('.gallery_slide'),
                    $galleryButtonInner = $galleryBox.find('.button_wrap .button_inner'),
                    $galleryPrev = $galleryButtonInner.find('.button_box.prev .btn'),
                    $galleryNext = $galleryButtonInner.find('.button_box.next .btn'),
                    $galleryDot = $galleryButtonInner.find('.dot_wrap'),
                    $galleryItem = $gallerySlide.find('.slide_item'),
                    $galleryLink = $galleryItem.find('.link');
                $gallerySlide.slick({
                    accessibility: true,
                    variableWidth: false,
                    adaptiveHeight: false,
                    rows: 1,
                    slidesPerRow: 3,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 1000,
                    fade: true,
                    infinite: true,
                    autoplay: false,
                    arrows: true,
                    prevArrow: $galleryPrev,
                    nextArrow: $galleryNext,
                    dots: true,
                    appendDots: $galleryDot,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    zIndex: 0,
                    responsive: [
                        {
                            breakpoint: 1001,
                            settings: {
                                slidesPerRow: 1,
                                arrows: false,
                            }
                        }
                    ]
                });
                $galleryLink.on('mouseover',function(){
                    $(this).parent($galleryItem).addClass('on');
                });
                $galleryLink.on('mouseleave',function(){
                    $(this).parent($galleryItem).removeClass('on');
                });
                // 갤러리 슬라이드 - E

                $window.on('screen:wide screen:web', function(event) {});
                $window.on('screen:tablet screen:phone', function(event) {});
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}
