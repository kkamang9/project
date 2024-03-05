"use strict";

try {
	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//상태처리
			$.responsive.functions.processingGraduateMainState = function(state, event) {
			};

			$.tags.dcmt.ready(function() {
				$.tags.rowgroup = $.tags.container.children(".rowgroup");
				$.tags.visual = $.tags.rowgroup.children(".visual");
				$.tags.visualControl = $.tags.visual.children(".visual_control");
				$.tags.visualControlWrap = $.tags.visualControl.children(".wrap");
				$.tags.visualPrevButton = $.tags.visualControlWrap.children("button.prev");
				$.tags.visualNextButton = $.tags.visualControlWrap.children("button.next");
				$.tags.visualList = $.tags.visual.children(".visual_list");

				$.tags.visualList.slick({
					draggable : false,
					swipe : false,
					slidesToShow : 1,
					autoplay : true,
					centerMode : true,
					centerPadding : 0,
					easing : "easeInOutExpo",
					cssEase : "cubic-bezier(1, 0, 0, 1)",
					variableWidth :true,
					speed : 500,
					responsive : [{
						breakpoint : 801,
						settings : {
							draggable : true,
					        swipe : true
						}
					}, {
						breakpoint : 641,
						settings : {
							draggable : true,
					        swipe : true,
							slidesToShow : 1
						}
					}],
					prevArrow : $.tags.visualPrevButton,
					nextArrow : $.tags.visualNextButton
				});


				$.tags.rowgroup2 = $.tags.container.children(".rowgroup2");
				$.tags.rowgroup2Wrap = $.tags.rowgroup2.children(".wrap");
				$.tags.rowgroup2Rowgroup = $.tags.rowgroup2Wrap.children(".rowgroup");
				$.tags.popup = $.tags.rowgroup2Rowgroup.children(".popup");
				$.tags.popupInnerWrap = $.tags.popup.children(".inner_wrap");
				$.tags.popupControl = $.tags.popupInnerWrap.children(".popup_control");
				$.tags.popupPrevButton = $.tags.popupControl.children("button.prev");
				$.tags.popupAutoButton = $.tags.popupControl.children("button.playing");
				$.tags.popupNextButton = $.tags.popupControl.children("button.next");
				$.tags.popupButtons = $.tags.popupPrevButton.add($.tags.popupNextButton);
				$.tags.popupList = $.tags.popupInnerWrap.children(".popup_list");

				$.tags.popupList.slick({
					draggable : false,
					swipe : false,
					easing : "easeInOutExpo",
					cssEase : "cubic-bezier(1, 0, 0, 1)",
					speed : 500,
					autoplay : true,
					autoplaySpeed : 3000,
					responsive : [{
						breakpoint : 801,
						settings : {
							draggable : true,
					        swipe : true
						}
					}],
					prevArrow : $.tags.popupPrevButton,
					nextArrow : $.tags.popupNextButton
				}).slickAuto({
					auto : $.tags.popupAutoButton,
					arrows : $.tags.popupButtons,
					arrowClickAfterStop : true
				});

				$.tags.rowgroup2Rowgroup2 = $.tags.rowgroup2Wrap.children(".rowgroup2");
				$.tags.service = $.tags.rowgroup2Rowgroup2.children(".service");
				$.tags.serviceControl = $.tags.service.children(".service_control");
				$.tags.servicePrevButton = $.tags.serviceControl.children("button.prev");
				$.tags.serviceNextButton = $.tags.serviceControl.children("button.next");
				$.tags.serviceList = $.tags.service.children(".service_list");
				$.tags.serviceListWrap = $.tags.serviceList.children(".service_list_wrap");
				$.tags.serviceListInnerWrap = $.tags.serviceListWrap.children(".inner_wrap");

				$.tags.serviceListInnerWrap.slick({ // 대학원 메인 빠른서비스 아이콘 
					draggable : false,
					swipe : false,
					easing : "easeInOutExpo",
					slidesToShow : 4, //아이콘 갯수 조정
					cssEase : "cubic-bezier(1, 0, 0, 1)",
					speed : 500,
					responsive : [{
						breakpoint : 641,
						settings : {
							draggable : true,
					        swipe : true,
							slidesToShow : 3
						}
					}, {
						breakpoint : 401,
						settings : {
							draggable : true,
					        swipe : true,
							slidesToShow : 2
						}
					}],
					prevArrow : $.tags.servicePrevButton,
					nextArrow : $.tags.serviceNextButton
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}