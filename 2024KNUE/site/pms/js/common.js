// 탭메뉴 공통적으로 사용
//ex) tabOn(1,1);
function tabOn(tabid,a) {
	for (i=1;i<=10;i++) {
		if(i<10){inn="0"+i;} else {inn=""+i;}
		tabMenu = document.getElementById("tab"+tabid+"m"+i);
		tabContent = document.getElementById("tab"+tabid+"c"+i);
		tabMore = document.getElementById("tab"+tabid+"more"+i);
		if (tabMenu) { //객체가존재하면
			if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace("_on.", "_off."); } //이미지일때
			if (tabMenu.tagName=="A") { tabMenu.className=""; } //앵커일때
		}
		if (tabContent) { tabContent.style.display="none"; }
		if (tabMore) { tabMore.style.display="none"; }

	}
	if(a<10){ann="0"+a;} else {ann=""+a;}
	tabMenu = document.getElementById("tab"+tabid+"m"+a);
	tabContent = document.getElementById("tab"+tabid+"c"+a);
	tabMore = document.getElementById("tab"+tabid+"more"+a);
//	alert(tabMenu.tagName);
	if (tabMenu) { //객체가존재하면
		if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace("_off.", "_on."); } //이미지일때
		if (tabMenu.tagName=="A") { tabMenu.className="on"; } //앵커일때
	}
	if (tabContent) { tabContent.style.display="block"; }
	if (tabMore) { tabMore.style.display="block"; }
}

$(document).ready(function(){
	//이미지 롤오버
	$(".overimg").mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
	}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));
	}).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	});
});

/*
jQuery(function($){
	var total=$('#lnb .depth1').length;
	for(i=1;i<=total;i++){
		$('#lnb .depth1:nth-child('+i+')').addClass('rule0'+i);
	};
	var lnb_bg_box=$('#lnb .depth1:first-child .depth2').height();
	$('.lnb_bg_box,#lnb .depth2').height(lnb_bg_box);
	$('#lnb .depth1 a.tit').on('mouseenter focusin',function(){
		$('#lnb a.tit').removeClass('on').next('.depth2').removeClass('open');
		$(this).addClass('on').next('.depth2').addClass('open');
		$('#lnb .depth2,.lnb_bg,.lnb_bg_box').slideDown();
	});
	$('#lnb').mouseleave(function(event){
		$('#lnb .depth2,.lnb_bg,.lnb_bg_box').stop().slideUp();
		$('#lnb .info_depth2').hide();
	});
	$('#lnb .depth1').mouseover(function(){
		$('#lnb a.tit').removeClass('on').next('.depth2').removeClass('open');
		$(this).find('a.tit').addClass('on').next('.depth2').addClass('open');
	});
	$('#lnb .depth1').mouseleave(function(){
		$('#lnb a.tit').removeClass('on').next('.depth2').removeClass('open');
	});
	$('#lnb .depth1:last-child() .depth2 li:last-child()').focusout(function(){
		$('#lnb a.tit').removeClass('on').next('.depth2').removeClass('open');
	});
	$('.basic_srch').focusin(function(){
		$('#lnb a.tit').removeClass('on').next('.depth2').removeClass('open');
	});
});
*/

jQuery(function($){
	$(window).load(function(){
	//lnb
	$('#lnb li [id^=top1m]').on('mouseover',function(event){
	var menu = $(this).attr('id').split("top1m");

	var $target=$(event.target);
		$('#lnb .top2m').hide();
		if($target.is('#lnb #top2m'+menu[1])){
		}else{
			$('#lnb #top2m'+menu[1]).slideDown(150);
			$('#lnb .tit').removeClass('on');
 			$('#lnb #top1m'+menu[1]).addClass('on');
		};
	});

	$('#lnb').mouseleave(function(event){
		$('#lnb .top2m').stop().slideUp(150);
		//$('#header_bg').stop().slideUp(150);
		$('#lnb .tit').removeClass('on');
	});
	});

});