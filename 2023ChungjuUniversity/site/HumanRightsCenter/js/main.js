"use strict";

try {
	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//상태처리

			$.tags.dcmt.ready(function() {

				$.tags.html.responsive({
					//인터넷 익스플로러(7, 8)에서 반응형 플러그인 실행 여부
					lowInternetExplorer : false,

					//PC 플랫폼에서 모바일 플랫폼 스크립트 실행 여부
					mobilePlatformScriptsOnPCPlatform : true,

					//분기함수 실행여부
					branchFunction : true,

					//호출될 함수 명 목록 (예 : $.responsive.functions.processing#State)
					nameSpaceList : ["layout", "common", "main"],

					//웹 범위가 끝나는 픽셀(webEndPixel에 적힌 숫자 초과이면 와이드로 간주함)
					webEndPixel : 1599,
					
					//태블릿 범위가 시작되는 픽셀 
					tabletStartPixel : 800,
					
					//모바일 범위가 시작되는 픽셀
					mobileStartPixel : 640
				});

				//비주얼 슬라이드 시작
				var $NoticeSlide = $('.notice .notice_slide');
				$NoticeSlide.slick({
					//기본
					autoplay : true,
					dots : false,
					draggable : true,
					swipe : true,
					swipeToSlide : true,
					slidesToShow : 1,  //표출할 슬라이드 개수
					slidesToScroll : 1,  //넘어가는 개수
					rows : 1,	//행 표출 개수
					slidesPerRow : 2,  //열 표출 개수
					infinite: true,
					arrows : true,
					prevArrow : $('.notice .notice_button .notice_prev'),
					nextArrow : $('.notice .notice_button .notice_next'),
					isRunOnLowIE : false,
					pauseOnArrowClick : true,
					pauseOnDotsClick : true,
					pauseOnSwipe : true,
					pauseOnDirectionKeyPush : true,
					zIndex : 1,
					vertical: true, //세로모드 유무
					verticalSwiping: true, //세로일때 터치 유무
					responsive : [{
						breakpoint : 801,
						settings : {
							arrows : false,
							slidesToShow : 4,  //표출할 슬라이드 개수
							slidesPerRow : 1  //열 표출 개수
						}
					},{
						breakpoint : 641,
						settings : {
							arrows : false,
							slidesToShow : 2,  //표출할 슬라이드 개수
							slidesPerRow : 1  //열 표출 개수
						}
					}]
				});
				//비주얼 슬라이드 끝

			});


		})(jQuery);
	}
}catch(e) {
	console.error(e);
}