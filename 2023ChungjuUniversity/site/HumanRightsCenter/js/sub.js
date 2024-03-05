"use strict";

try {
	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//상태처리
			$.responsive.functions.processingSubState = function(state, event) {
			};
			
			$.tags.dcmt.ready(function() {
				$.tags.html.responsive({
					//인터넷 익스플로러(7, 8)에서 반응형 플러그인 실행 여부
					lowInternetExplorer : false,

					//PC 플랫폼에서 모바일 플랫폼 스크립트 실행 여부
					mobilePlatformScriptsOnPCPlatform : true,

					//분기함수 실행여부
					branchFunction : true,

					//호출될 함수 명 목록 (예 : $.responsive.functions.processing#State)
					nameSpaceList : ["layout", "commonSub", "common", "sub"],

					//웹 범위가 끝나는 픽셀(webEndPixel에 적힌 숫자 초과이면 와이드로 간주함)
					webEndPixel : 1599,
					
					//태블릿 범위가 시작되는 픽셀 
					tabletStartPixel : 800,
					
					//모바일 범위가 시작되는 픽셀
					mobileStartPixel : 640
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}