"use strict";

try {
	//제이쿼리가 있으면
	if(jQuery) {
		$.tags.dcmt.ready(function() {
			var OPENER_DOCUMENT_CONTENTS_MARKUP = "";

			$.tags.headerAndFooter = $.tags.header.add($.tags.footer);
			$.tags.gnb = $.tags.header.children(".gnb");
			$.tags.gnbUl = $.tags.gnb.children("ul");
			$.tags.gnbLi = $.tags.gnbUl.children("li");
			$.tags.printButton = $.tags.gnbLi.children(".print");
			$.tags.printCloseButton = $.tags.gnbLi.children(".close");
			$.tags.printColgroup = $.tags.containerWrap.children(".colgroup");
			$.tags.article = $.tags.printColgroup.children("article");
			$.tags.subHead = $.tags.article.children(".sub_head");
			$.tags.path = $.tags.subHead.children(".path");
			$.tags.subTitle = $.tags.subHead.children(".sub_title");
			$.tags.contents = $.tags.article.children("#contents");
			$.tags.openerDocumentContents = $("#contents", window.opener.document);
			$.tags.openerDocumentPath = $(".path", window.opener.document);
			$.tags.openerDocumentSubTitle = $(".sub_title", window.opener.document);

			$.tags.path.html($.tags.openerDocumentPath.html().replace("/\s/g", ""));
			$.tags.subTitle.html($.tags.openerDocumentSubTitle.html().replace("/\s/g", ""));
			OPENER_DOCUMENT_CONTENTS_MARKUP = $.tags.openerDocumentContents.html().replace("/\s/g", "");

			$.tags.contents.html(OPENER_DOCUMENT_CONTENTS_MARKUP);
			$.tags.contents.addClass($.tags.openerDocumentContents.attr("class"));
			
			$.tags.printButton.on("click.print", function() {
				$.tags.headerAndFooter.addClass("active");
				window.print();
				$.tags.headerAndFooter.removeClass("active");
			});

			$.tags.printCloseButton.on("click.print", function() {
				window.close();
			});
			
			$.tags.container.on("focusin.print", function() {
				$.tags.header.moveFocus();
			});

			//빈페이지 였을때
			if(!OPENER_DOCUMENT_CONTENTS_MARKUP.length) {
				$.tags.contents.html("<div class=\"prepare\"><img src=\"../../common/images/contents/ready.png\" alt=\"콘텐츠 준비중입니다 빠르고 편리한 서비스를 위해 최선을 다하겠습니다.\"></div>");
			}
		});

		$.tags.wdw.load(function() {
			//풀캘린더
			$(".fc-toolbar.fc-header-toolbar").eq(0).remove();
			$(".fc-view-container").eq(0).remove();
		});
	}
}catch(e) {
	console.error(e);
}