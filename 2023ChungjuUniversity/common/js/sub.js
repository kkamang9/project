"use strict";

try {
	if(jQuery) {
		(function($) {
			$.responsive.functions.processingCommonSubState = function(state, event) {
				if(mode == "pc") {
					//모바일 특성 제거
					$.tags.subTabMenuUl.css("display", "");
					$.tags.subTabMenuWrap.removeClass("active");
				}
			};

			$.tags.dcmt.ready(function() {
				//사이드 메뉴 시작
				$.tags.containerWrap = $.tags.container.children(".wrap");
				$.tags.colgroup = $.tags.container.find("main.colgroup");
				$.tags.side = $.tags.container.find(".side");
				$.tags.sideTitle = $.tags.side.children(".side_title");
				$.tags.sideMenu = $.tags.side.children(".side_menu");
				$.tags.sideDepth2Menu = $.tags.sideMenu.children(".depth2_menu");
				$.tags.sideDepth2List = $.tags.sideDepth2Menu.children(".depth2_list");
				$.tags.sideDepth2Anchor = $.tags.sideDepth2List.children(".depth2_anchor");
				$.tags.sideDepth3Menu = $.tags.sideDepth2List.children(".depth3_menu");
				$.tags.sideDepth2ListWithDepth3Menu = $.tags.sideDepth3Menu.parent(".depth2_list");
				$.tags.sideDepth3List = $.tags.sideDepth3Menu.children(".depth3_list");
				$.tags.sideDepth3Anchor = $.tags.sideDepth3List.children(".depth3_anchor");
				$.tags.sideDepth4Menu = $.tags.sideDepth3List.children(".depth4_menu");
				$.tags.sideDepth3ListWithDepth4Menu = $.tags.sideDepth4Menu.parent(".depth3_list");
				$.tags.sideDepth4List = $.tags.sideDepth4Menu.children(".depth4_list");
				$.tags.sideDepth4Anchor = $.tags.sideDepth4List.children(".depth4_anchor");
				
				//3차메뉴 부모에 has클래스 추가
				$.tags.sideDepth2ListWithDepth3Menu.addClass("has");

				//4차메뉴 부모에 has클래스 추가
				$.tags.sideDepth3ListWithDepth4Menu.addClass("has");
				
				//2차메뉴 자식에 3차메뉴가 없을경우 solo클래스 추가
				$.tags.sideDepth2List.each(function(index) {
					var $this = $(this),
						$depth3Menu = $this.children(".depth3_menu");

					if(!$depth3Menu.length) {
						$this.addClass("solo");
					}
				});
				
				//2차메뉴 a
				$.tags.sideDepth2Anchor.on("click.commonSub", function(event) {
					var $this = $(this),
						TARGET = $this.attr("target"),
						$depth3Menu = $this.next(".depth3_menu"),
						$depth2List = $this.parent(".depth2_list"),
						$depth2ListSiblings = $depth2List.siblings(".depth2_list"),
						$depth2ListSiblingsNotActivedDepth3Menu = $depth2ListSiblings.not(".actived").children(".depth3_menu");
					
					if(!isRun) {
						if($depth3Menu.length && !$depth2List.hasClass("actived") && !$depth2List.hasClass("active")) {
							isRun = true;
							$depth2ListSiblings.removeClass("active");
							$depth2ListSiblingsNotActivedDepth3Menu.slideUp(500, "easeInOutExpo");

							$depth3Menu.slideDown(500, "easeInOutExpo", function() {
								$.tags.wdw.trigger("scroll.sideSticky");
								isRun = false;
							});

							$depth2List.addClass("active");
							event.preventDefault();
						}
					}else{
						event.preventDefault();
					}
				}).on("mouseenter.commonSub focusin.commonSub", function() {
					var $this = $(this),
						$depth2List = $this.parent(".depth2_list"),
						$depth2ListSiblings = $depth2List.siblings(".depth2_list");
					
					$depth2ListSiblings.removeClass("hover");

					if(!$depth2List.hasClass("actived") && !$depth2List.hasClass("active")) {
						$depth2List.addClass("hover");
					}
				}).on("mouseleave.commonSub focusout.commonSub", function() {
					var $this = $(this),
						$depth2List = $this.parent(".depth2_list"),
						$depth2ListSiblings = $depth2List.siblings(".depth2_list");
					
					$depth2List.removeClass("hover");
				});

				//3차메뉴 a
				$.tags.sideDepth3Anchor.on("click.commonSub", function(event) {
					var $this = $(this),
						TARGET = $this.attr("target"),
						$depth4Menu = $this.next(".depth4_menu"),
						$depth3List = $this.parent(".depth3_list"),
						$depth3ListSiblings = $depth3List.siblings(".depth3_list"),
						$depth3ListSiblingsNotActivedDepth4Menu = $depth3ListSiblings.not(".actived").children(".depth4_menu");
					
					if(!isRun) {

						if($depth4Menu.length && !$depth3List.hasClass("actived") && !$depth3List.hasClass("active")) {
							isRun = true;
							$depth3ListSiblings.removeClass("active");
							$depth3ListSiblingsNotActivedDepth4Menu.slideUp(500, "easeInOutExpo");

							$depth4Menu.slideDown(500, "easeInOutExpo", function() {
								$.tags.wdw.trigger("scroll.sideSticky");
								isRun = false;
							});

							$depth3List.addClass("active");
							event.preventDefault();
						}
					}else{
						event.preventDefault();
					}
				}).on("mouseenter.commonSub focusin.commonSub", function() {
					var $this = $(this),
						$depth3List = $this.parent(".depth3_list"),
						$depth3ListSiblings = $depth3List.siblings(".depth3_list");
					
					$depth3ListSiblings.removeClass("hover");

					if(!$depth3List.hasClass("actived") && !$depth3List.hasClass("active")) {
						$depth3List.addClass("hover");
					}
				}).on("mouseleave.commonSub focusin.commonSub", function() {
					var $this = $(this),
						$depth3List = $this.parent(".depth3_list"),
						$depth3ListSiblings = $depth3List.siblings(".depth3_list");
					
					$depth3List.removeClass("hover");
				});

				//4차메뉴 a
				$.tags.sideDepth4Anchor.on("mouseenter.commonSub focusin.commonSub", function() {
					var $this = $(this),
						$depth4List = $this.parent(".depth4_list");
					
					if(!$depth4List.hasClass("actived")) {
						$depth4List.addClass("active");
					}
				}).on("mouseleave.commonSub focusout.commonSub", function() {
					var $this = $(this),
						$depth4List = $this.parent(".depth4_list");

					if(!$depth4List.hasClass("actived")) {
						$depth4List.removeClass("active");
					}
				});
				//사이드 메뉴 끝
				
				//표 시작
				$.tags.contents = $.tags.container.find("#contents");
				$.tags.table = $.tags.contents.find("table.table");
				$.tags.scrollTable = $.tags.table.filter(".scroll");
				$.tags.responsiveTable = $.tags.table.filter(".responsive");
				$.tags.responsiveTableThead = $.tags.responsiveTable.children("thead");
				$.tags.responsiveTableTheadTr = $.tags.responsiveTableThead.children("tr");
				$.tags.responsiveTableTheadTh = $.tags.responsiveTableTheadTr.children("th");
				
				//컨텐츠 표에 부모가 .table_group이 없을경우 마크업 삽입
				$.tags.table.each(function(index) {
					var $this = $(this),
						$tableGroup = $this.parent(".table_group");
					
					if(!$tableGroup.length) {
						$this.wrap("<div class=\"table_group\"></div>");
					}
				});

				$.tags.tableGroup = $.tags.table.parent(".table_group");
				$.tags.scrollTableGroup = $.tags.scrollTable.parent(".table_group");

				//표 제스처 마크업 유무 검사 후 없으면 삽입
				$.tags.scrollTableGroup.each(function(index) {
					var $this = $(this),
						$tableGesture = $this.children(".gesture");

					if(!$tableGesture.length) {
						$this.prepend("<div class=\"gesture left right\"><span class=\"skip\">좌우 드래그를 이용하시면 표의 우측 부분을 보실 수 있습니다.</span><button type=\"button\">아이콘 닫기</button></div>");
					}
				});

				$.tags.tableGesture = $.tags.scrollTableGroup.children(".gesture");
				$.tags.tableGestureButton = $.tags.tableGesture.children("button");

				//컨텐츠 표에 자식에 .table_line이 없을경우 마크업 삽입
				$.tags.tableGroup.each(function(index) {
					var $this = $(this),
						$tableLine = $this.children(".table_line");
					
					if(!$tableLine.length) {
						$this.append("<div class=\"table_line\">&nbsp;</div>");
					}
				});
				
				//표에 제스처아이콘 중앙정렬
				function setGestureLeftPosition(event) {
					var i = 0,
						TABLE_GROUP_COUNT = $.tags.scrollTableGroup.length,
						$tableGroup = {},
						$scrollTable = {},
						$tableGesture = {};
					
					//스크린상태가 태블릿 또는 모바일일때
					if(mode == "mobile") {
						$.tags.tableGesture.css("left", "");

						for(; i < TABLE_GROUP_COUNT; i++) {
							$tableGroup = $.tags.scrollTableGroup.eq(i);
							$scrollTable = $tableGroup.children("table.table");
							$tableGesture = $tableGroup.children(".gesture");
							
							$tableGesture.css("left", $tableGroup.scrollLeft() + parseInt($tableGesture.css("left"), 10));
							$tableGesture.addClass("active");
						}
					}else{
						$.tags.tableGesture.removeClass("active actived");
					}
				}
				
				//스크린에 제스처 중앙정렬
				function setGestureTopPosition(event) {
					var $this = $(this),
						i = 0,
						TABLE_GROUP_COUNT = $.tags.scrollTableGroup.length,
						$tableGroup = {},
						$scrollTable = {},
						$tableGesture = {};

					if(mode == "mobile" && $this.length) {
						for(; i < TABLE_GROUP_COUNT; i++) {
							$tableGroup = $.tags.scrollTableGroup.eq(i);
							$tableGesture = $tableGroup.children(".gesture");
							$tableGesture.css("top", $this.scrollTop() - $tableGroup.offset().top + ($this.height() / 2));
						}
					}
				}

				//단순 표 data-cell-header처리
				$.tags.responsiveTable.each(function(index) {
					var $this = $(this),
						$thead = $this.children("thead"),
						$theadTr = $thead.children("tr"),
						$theadTh = $theadTr.children("th"),
						THEAD_TH_COUNT = $theadTh.length,
						$tbody = $this.children("tbody"),
						$tbodyTr = $tbody.children("tr"),
						TBODY_TR_COUNT = $tbodyTr.length,
						$tfoot = $this.children("tfoot"),
						$tfootTr = $tfoot.children("tr"),
						TFOOT_TR_COUNT = $tfootTr.length,
						$tfootTrEach = {},
						$tfootTrEachOfChild = {},
						HEADING = "",
						i = 0,
						j = 0;

					for(; i < THEAD_TH_COUNT; i++) {
						HEADING = $theadTh.eq(i).text() + " : ";
						
						j = 0;

						//tbody
						for(; j < TBODY_TR_COUNT; j++) {
							$tbodyTr.eq(j).children(":eq(" + i + ")").attr("data-cell-header", HEADING);
						}

						j = 0;

						//tfoot
						for(; j < TFOOT_TR_COUNT; j++) {
							$tfootTrEach = $tfootTr.eq(j);
							$tfootTrEachOfChild = $tfootTrEach.children(":eq(" + i + ")");

							if($tfootTrEachOfChild[0].tagName.toLowerCase() == "td") {
								$tfootTrEachOfChild.attr("data-cell-header", HEADING);
							}
						}
					}
				});
				
				//제스처에 손모양버튼을 클릭하면 부모에 actived클래스 추가
				$.tags.tableGestureButton.on("click.table", function() {
					var $this = $(this),
						$tableGesture = $this.parent(".gesture");

					$tableGesture.addClass("actived");
				});
				
				//컨텐츠 표에 scroll클래스가 있는 객체의 .table_group을 스크롤 했을경우
				$.tags.scrollTableGroup.on("scroll.tableGesture", function() {
					var $this = $(this),
						$tableGesture = $this.children(".gesture");

					if(mode == "mobile") {
						$tableGesture.removeClass("active");
					}
				}).eventEnd("scroll.tableGesture", setGestureLeftPosition);
				
				//gesture 정렬
				$.tags.wdw.eventEnd("scroll.tableGesture", setGestureTopPosition).trigger("scroll.tableGesture");
				$.tags.wdw.eventEnd("resize.tableGesture", function(event) {
					setGestureTopPosition(event);
					setGestureLeftPosition(event);
				}).trigger("resize.tableGesture");

				//side sticky
				function setSideSticky(event) {
					var $this = $(this),
						SCROLL_TOP = $this.scrollTop(),
						SCROLL_LEFT = $this.scrollLeft(),
						WINDOW_HEIGHT = $.responsive.screen.windowHeight,
						SIDE_MIN_POSITION = 0,
						SIDE_MAX_POSITION = 0,
						SIDE_HEIGHT = 0,
						COLGROUP_OUTER_HEIGHT = $.tags.colgroup.outerHeight(true),
						SIDE_OUTER_HEIGHT = 0,
						SIDE_TITLE_OUTER_HEIGHT = $.tags.sideTitle.outerHeight(true),
						SIDE_MENU_WIDTH = $.tags.sideMenu.width(),
						SIDE_MENU_HEIGHT = 0,
						SIDE_DEPTH2_MENU_WIDTH = 0,
						CONTAINER_WRAP_OFFSET_LEFT = $.tags.containerWrap.offset().left,
						LNB_HEIGHT = $.tags.lnb.height(),
						LNB_BOTER_TOP_WIDTH = parseInt($.tags.lnb.css("border-top-width"), 10),
						LNB_BORDER_BOTTOM_WIDTH = parseInt($.tags.lnb.css("border-bottom-width"), 10),
						LNB_BORDER_HEIGHT = LNB_HEIGHT + LNB_BOTER_TOP_WIDTH + LNB_BORDER_BOTTOM_WIDTH;
					

					//스크린상태가 와이드 || 웹 일때
					if(mode == "pc") {
						$.tags.side.removeClass("sticky_start sticky_end sticky_full");
						
						SIDE_DEPTH2_MENU_WIDTH = $.tags.sideDepth2Menu.width();
						SIDE_MIN_POSITION = $.tags.side.offset().top - LNB_BORDER_HEIGHT;
						SIDE_OUTER_HEIGHT = $.tags.side.outerHeight(true) + LNB_BORDER_HEIGHT;
						SIDE_MAX_POSITION = COLGROUP_OUTER_HEIGHT - SIDE_OUTER_HEIGHT + SIDE_MIN_POSITION + LNB_BORDER_HEIGHT;
						SIDE_MENU_WIDTH += Kit.info.scrollBarWidth;

						if(SIDE_DEPTH2_MENU_WIDTH != SIDE_MENU_WIDTH) {
							$.tags.sideDepth2Menu.css("width", "");
							$.tags.sideDepth2Menu.width(SIDE_MENU_WIDTH);
						}

						//사이드메뉴 높이가 colgroup높이 이상일때
						if(SIDE_OUTER_HEIGHT <= COLGROUP_OUTER_HEIGHT) {
							//sticky가 종료
							if(SCROLL_TOP >= SIDE_MAX_POSITION) {
								$.tags.side.addClass("sticky_end").removeClass("sticky_start sticky_full"); 
								$.tags.side.css("left", "");
								$.tags.sideDepth2Menu.css("max-height", "");

							//sticky가 시작
							}else if(SCROLL_TOP >= SIDE_MIN_POSITION) {
								$.tags.side.css("left", CONTAINER_WRAP_OFFSET_LEFT - SCROLL_LEFT);
								$.tags.side.addClass("sticky_start").removeClass("sticky_end");

								//fixed후 스크린의 높이를 넘었을때
								SIDE_MENU_HEIGHT = SIDE_TITLE_OUTER_HEIGHT + $.tags.sideMenu.height() + LNB_BORDER_HEIGHT;

								if(WINDOW_HEIGHT <= SIDE_MENU_HEIGHT) {
									$.tags.side.addClass("sticky_full");
									SIDE_MENU_HEIGHT = WINDOW_HEIGHT - SIDE_TITLE_OUTER_HEIGHT - LNB_BORDER_HEIGHT;
									$.tags.sideDepth2Menu.css("max-height", SIDE_MENU_HEIGHT);

								}else{
									$.tags.side.removeClass("sticky_full");
									$.tags.sideDepth2Menu.css("max-height", "");
								}
							
							//sticky 시작전
							}else{
								$.tags.side.removeClass("sticky_start sticky_full");
								$.tags.side.css("left", "");
								$.tags.sideDepth2Menu.css("max-height", "");
							}
						}else{
							$.tags.side.removeClass("sticky_start sticky_end sticky_full");
							$.tags.side.css("left", "");
							$.tags.sideDepth2Menu.css("max-height", "");
						}
					}
				}
				
				//사이드메뉴가 있을때
				if($.tags.side.length && $.tags.lnb.length) {
					$.tags.sideDepth2Menu.width($.tags.sideMenu.width() + Kit.info.scrollBarWidth);
					$.tags.wdw.on("scroll.sideSticky", setSideSticky).trigger("scroll.sideSticky");
					$.tags.wdw.eventEnd("resize.sideSticky", setSideSticky).trigger("resize.sideSticky");
				}

				//서브 탭메뉴(모바일) 시작
				$.tags.subHead = $.tags.container.find(".sub_head");
				$.tags.subTabMenu = $.tags.subHead.children(".tab_menu");
				$.tags.subTabMenuWrap = $.tags.subTabMenu.children(".tab_menu_wrap");
				$.tags.subTabMenuUl = $.tags.subTabMenuWrap.children("ul");
				$.tags.subTabMenuLi = $.tags.subTabMenuUl.children("li");
				$.tags.subTabMenuOpenButton = $.tags.subTabMenuWrap.children("button");
				
				//800부터 시작되는 탭메뉴 셀렉트버튼 클릭했을때
				$.tags.subTabMenuOpenButton.on("click.commonSub", function() {
					var $this = $(this),
						$tabMenuWrap = $this.parent(".tab_menu_wrap"),
						$tabMenuUl = $this.next("ul");

					if(!isRun) {
						isRun = true;
						$tabMenuWrap.toggleClass("active");
						$tabMenuUl.slideToggle(500, "easeInOutExpo", function() {
							isRun = false;
						});
					}
				});
				//서브 탭메뉴(모바일) 시작

				$.tags.printButton = $.tags.container.find("button.print");
				$.tags.copyButton = $.tags.container.find("button.copy");
				$.tags.shareButton = $.tags.container.find("button.share");
				
				//url복사 버튼
				$.tags.copyButton.on("click.commonSub", function() {
					Kit.string.copy(window.location.href);
				});
				
				//프린트버튼
				$.tags.printButton.on("click.commonSub", function() {
					var SITE_ID = Kit.string.parse("/site/", "/", window.location.href)[0] || Kit.string.parse("/", "/", window.location.href)[1];

					window.open('/common/deco/print.jsp?siteId=' + SITE_ID, '_blank', 'toolbars=no, scrollbars=yes, resizable=no, width=750, height=750');
				});

				//만족도조사
				$.tags.satisfaction = $.tags.container.find(".satisfaction");
				$.tags.satisfactionList = $.tags.satisfaction.children(".satisfaction_list");
				$.tags.satisfactionForm = $.tags.satisfactionList.children("form");
				$.tags.satisfactionFieldset = $.tags.satisfactionForm.children("fieldset");
				$.tags.satisfactionInputRadio = $.tags.satisfactionFieldset.children(".input_radio");
				$.tags.satisfactionInputLine = $.tags.satisfactionInputRadio.children(".input_line");
				$.tags.satisfactionRadioButton = $.tags.satisfactionInputLine.children("input[name='cntntsEvlSe'][type='radio']");
				$.tags.satisfactionOpinion = $.tags.satisfactionFieldset.children(".opinion");
				$.tags.satisfactionOpinionText = $.tags.satisfactionOpinion.children("input[type='text']");
				$.tags.satisfactionSubmitButton = $.tags.satisfactionOpinion.children("input[type='submit']");
				
				$.tags.satisfactionSubmitButton.on("click.commonSub", function(event) {
					if(!$.tags.satisfactionRadioButton.is(":checked") || !$.tags.satisfactionOpinionText.val().length) {
						alert("만족도와 의견을 입력해주세요.");
						event.preventDefault();
					}
				});
				
				//조직구성 가져오기
				$.tags.dept = $.tags.contents.find(".dept");
				$.tags.dept.each(function() {
					var $this = $(this),
						$li = $this.parents("li.active"),
						$tabContent = $li.children(".tab_content"),
						$tabMenuOpenButton = $tabContent.prev("button.open"),
						deptCode = $this.data("dept-code");

					if(deptCode) {
						$.ajax({
							type : "POST",
							url : "../../common/deco/dept_emp_list.jsp",
							data : "dept_code=" + deptCode,
							dataType : "html",
							success : function(data) {
								$this.html(data);
								$tabMenuOpenButton.trigger("click.layout");
							}
						});
					}
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}
