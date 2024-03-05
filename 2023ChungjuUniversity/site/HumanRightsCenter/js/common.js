"use strict";

try {
	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//상태처리
			$.responsive.functions.processingCommonState = function(state, event) {
			};
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}