"use strict";

try {
	var mode = "",
		isRun = false,
		dataStyleOpen,
		dataStyleClose,
		daum = daum || false,
		originalSlick,
		documentReadyLnbOffsetTop = 0;

	//제이쿼리가 있으면
	if(jQuery) {
		dataStyleOpen = function() {
			var $this = $(this),
				$dataStyle = $this.parent("[data-style]"),
				STYLE = $dataStyle.data("style"),
				$dataStyleSiblings = $dataStyle.siblings("[data-style]"),
				$dataStyleSiblingsTarget = $dataStyleSiblings.children(".target"),
				$target = $dataStyle.children(".target");
			
			if(STYLE == "list") {
				if(!isRun) {
					isRun = true;
					$dataStyleSiblings.removeClass("active");
					$dataStyleSiblingsTarget.slideUp(500, "easeInOutExpo");

					$target.slideToggle(500, "easeInOutExpo", function() {
						isRun = false;
					});

					$dataStyle.toggleClass("active");
				}
			}
		};

		dataStyleClose = function() {
			var $this = $(this),
				$dataStyleFirst = $this.parents("[data-style]").first(),
				STYLE = $dataStyleFirst.data("style"),
				$target = $dataStyleFirst.children(".target");

			if(STYLE == "list") {
				if(!isRun) {
					isRun = true;
					$dataStyleFirst.removeClass("active");
					$target.slideUp(500, "easeInOutExpo", function() {
						isRun = false;
					});
				}
			}
		};

		//$ 중복방지
		(function($) {
			//반응형 플러그인
			$.responsive.functions.processingLayoutState = function(state, event) {
				//탭메뉴
				$.tags.tabMenuLiActive = $($.tags.tabMenuLi.filter(".active").get().reverse());
				$.tags.tabMenuLiActive.each(function(index) {
					var $this = $(this),
						$tabMenu = $this.parents(".tab_menu"),
						$tabContent = $this.children(".tab_content"),
						unlock = $tabMenu.data("unlock") || "",
						unlockCount = 1,
						i = 0;

					if(unlock) {
						unlock = unlock.removeBlank().split(",");
						unlockCount = unlock.length;
					}

					for(; i < unlockCount; i++) {
						if(state.indexOf(unlock[i]) > -1) {
							$tabMenu.css("padding-bottom", "");
							break;
						}else{
							$tabMenu.css("padding-bottom", $tabContent.outerHeight(true));
						}
					}
				});

				//와이드 || 웹
				if(state == "wideLayout" || state == "webLayout") {
					mode = "pc";

					//모바일 메뉴 특성 제거
					$.tags.header.removeClass("menu_active");
					$.tags.depth1Menu.removeClass("active");
					$.tags.depth3Menu.css("display", "");
					$.tags.depth4Menu.css("display", "");
					$.tags.depth1List.removeClass("active");
					$.tags.depth2List.removeClass("active");
					$.tags.depth3List.removeClass("active");
					$.tags.html.removeClass("freeze");

				//태블릿 || 모바일
				}else if(state == "tabletLayout" || state == "mobileLayout") {
					mode = "mobile";
				}
			};

			$.tags.dcmt.ready(function() {
				$.tags.header = $("#header");

				$.tags.lnb = $.tags.header.find(".lnb");
				$.tags.lnbWrap = $.tags.lnb.children(".lnb_wrap");
				$.tags.lnbWrapChildWrap = $.tags.lnbWrap.children(".wrap");

				$.tags.mobileLnbOpen = $.tags.header.children(".lnb_m_open");
				$.tags.mobileLnbOpenButton = $.tags.mobileLnbOpen.find("button");

				$.tags.mobileLnbClose = $.tags.lnb.find(".lnb_m_close");
				$.tags.mobileLnbCloseButton = $.tags.mobileLnbClose.find("button");

				$.tags.lnbTitle = $.tags.lnbWrapChildWrap.find(".lnb_title");
				$.tags.lnbTitleFirstAnchor = $.tags.lnbTitle.find(":tabbable").first();

				$.tags.lnbPrevLastAnchor = $.tags.lnb.prevAll().find(":tabbable").last();
				
				$.tags.depth1Menu = $.tags.lnb.find(".depth1_menu");
				$.tags.depth1List = $.tags.depth1Menu.children(".depth1_list");
				$.tags.depth1Anchor = $.tags.depth1List.children(".depth1_anchor");
				$.tags.depth1AnchorFirst = $.tags.depth1Anchor.first();
				
				$.tags.depth2Menu = $.tags.depth1List.children(".depth2_menu");
				$.tags.depth2List = $.tags.depth2Menu.children(".depth2_list");
				$.tags.depth2Anchor = $.tags.depth2List.children(".depth2_anchor");
				
				$.tags.depth3Menu = $.tags.depth2List.children(".depth3_menu");
				$.tags.depth3List = $.tags.depth3Menu.children(".depth3_list");
				$.tags.depth3Anchor = $.tags.depth3List.children(".depth3_anchor");
				
				$.tags.depth4Menu = $.tags.depth3List.children(".depth4_menu");
				$.tags.depth4List = $.tags.depth4Menu.children(".depth4_list");
				$.tags.depth4Anchor = $.tags.depth4List.children(".depth4_anchor");
				
				$.tags.depth1ListWithDepth2Menu = $.tags.depth2Menu.parent(".depth1_list");
				$.tags.depth2ListWithDepth3Menu = $.tags.depth3Menu.parent(".depth2_list");
				$.tags.depth3ListWithDepth4Menu = $.tags.depth4Menu.parent(".depth3_list");
				
				$.tags.container = $("#container");
				$.tags.containerWildCard = $.tags.container.find("*");
				$.tags.containerFirstAnchor = $.tags.container.find(":tabbable").first();
				
				$.tags.footer = $("#footer");
				$.tags.footerWrap = $.tags.footer.children(".wrap");
				
				$.tags.dataStyle = $("[data-style]");
				$.tags.dataStyleOpenButton = $.tags.dataStyle.children("button.open");
				$.tags.dataStyleCloseButton = $.tags.dataStyle.find("button.close");
				
				//메뉴 시작
				
				//2차메뉴를 가지고 있는 1차메뉴 부모에게 클래스 부여
				$.tags.depth1ListWithDepth2Menu.addClass("has");

				//3차메뉴를 가지고 있는 2차메뉴 부모에게 클래스 부여
				$.tags.depth2ListWithDepth3Menu.addClass("has");

				//4차메뉴를 가지고 있는 3차메뉴 부모에게 클래스 부여
				$.tags.depth3ListWithDepth4Menu.addClass("has");

				//1차메뉴 rule# 클래스 부여
				$.tags.depth1List.each(function(index) {
					var $this = $(this),
						INDEX_COUNT = index + 1;

					$this.addClass("rule" + INDEX_COUNT);
				});
				
				//2차메뉴 rule# 클래스 부여
				$.tags.depth2Menu.each(function(index) {
					var $this = $(this),
						$depth2List = $this.children(".depth2_list"),
						DEPTH2_LIST_COUNT = $depth2List.length,
						INDEX_COUNT = index + 1,
						i = 0;

					for(; i < DEPTH2_LIST_COUNT; i++) {
						$depth2List.eq(i).addClass("rule" + (i + 1));
					}
				});

				//1차메뉴 a
				$.tags.depth1Anchor.on("mouseenter.layout focusin.layout", function() {
					var $this = $(this),
						$depth1List = $this.parent(".depth1_list"),
						DEPTH1_LIST_COUNT = $.tags.depth1List.length,
						DEPTH1_LIST_INDEX = $depth1List.index(),
						$depth1ListNextFirst = $depth1List.next(".depth1_list").first(),
						$depth1ListSiblings = $depth1List.siblings(".depth1_list"),
						i = 0;

					if(mode == "pc") {
						for(; i < DEPTH1_LIST_COUNT; i++) {
							$.tags.lnb.removeClass("state" + (i + 1));
						}

						$.tags.lnb.addClass("state" + (DEPTH1_LIST_INDEX + 1));

						$depth1ListSiblings.removeClass("active");
						$.tags.depth1List.removeClass("active_next");
						$.tags.header.addClass("menu_active");
						$depth1List.addClass("active");
						$depth1ListNextFirst.addClass("active_next");
					}
				}).on("click.layout", function(event) {
					var $this = $(this),
						TARGET = $this.attr("target"),
						$depth2Menu = $this.nextAll(".depth2_menu"),
						$depth1List = $this.parent(".depth1_list"),
						$depth1Menu = $this.parents(".depth1_menu"),
						$depth1ListSiblings = $depth1List.siblings(".depth1_list");

					if(mode == "mobile") {
						if($depth2Menu.length && !$depth1List.hasClass("active")) {
							$depth1ListSiblings.removeClass("active");
							$depth1List.addClass("active");

							if($depth1List.hasClass("active")) {
								$depth1Menu.addClass("active");
							}else{
								$depth1Menu.removeClass("active");
							}

							event.preventDefault();
						}
					}
				});
				
				//2차메뉴 a
				$.tags.depth2Anchor.on("mouseenter.layout focusin.layout", function() {
					var $this = $(this),
						$depth2List = $this.parent(".depth2_list");

					if(mode == "pc") {
						$.tags.lnb.scrollTop(0);
						$.tags.lnbWrapChildWrap.scrollTop(0);
						$depth2List.addClass("active");
					}
				}).on("mouseleave.layout focusout.layout", function() {
					var $this = $(this),
						$depth2List = $this.parent(".depth2_list");

					if(mode == "pc") {
						$depth2List.removeClass("active");
					}
				}).on("click.layout", function(event) {
					var $this = $(this),
						TARGET = $this.attr("target"),
						$depth3Menu = $this.next(".depth3_menu"),
						$depth2List = $this.parent(".depth2_list"),
						$depth2ListSiblings = $depth2List.siblings(".depth2_list"),
						$depth2ListSiblingsDepth3Menu = $depth2ListSiblings.children(".depth3_menu");

					if(mode == "mobile") {
						if(!isRun) {
							if($depth3Menu.length && !$depth2List.hasClass("active")) {
								isRun = true;
								$depth2ListSiblings.removeClass("active");
								$depth2ListSiblingsDepth3Menu.slideUp(500, "easeInOutExpo");

								$depth3Menu.slideDown(500, "easeInOutExpo", function() {
									isRun = false;
								});

								$depth2List.addClass("active");

								event.preventDefault();
							}
						}else{
							event.preventDefault();
						}
					}
				});
				
				//2차메뉴
				$.tags.depth2Menu.on("mouseenter.layout", function() {
					var $this = $(this),
						$depth1List = $this.parents(".depth1_list"),
						$depth1ListNextFirst = $depth1List.next(".depth1_list").first(),
						$depth1ListSibings = $depth1List.siblings(".depth1_list");

					if(mode == "pc") {
						$.tags.depth1List.removeClass("active_next");
						$depth1ListSibings.removeClass("active");
						$depth1ListNextFirst.addClass("active_next");
						$depth1List.addClass("active");
					}
				});
				
				//3차메뉴 a
				$.tags.depth3Anchor.on("mouseenter.layout focusin.layout", function() {
					var $this = $(this),
						$depth3List = $this.parent(".depth3_list");

					if(mode == "pc") {
						$depth3List.addClass("active");
					}
				}).on("mouseleave.layout focusout.layout", function() {
					var $this = $(this),
						$depth3List = $this.parent(".depth3_list");

					if(mode == "pc") {
						$depth3List.removeClass("active");
					}
				}).on("click.layout", function(event) {
					var $this = $(this),
						TARGET = $this.attr("target"),
						$depth4Menu = $this.next(".depth4_menu"),
						$depth3List = $this.parent(".depth3_list"),
						$depth3ListSiblings = $depth3List.siblings(".depth3_list"),
						$depth3ListSiblingsDepth4Menu = $depth3ListSiblings.children(".depth4_menu");

					if(mode == "mobile") {
						if(!isRun) {

							if($depth4Menu.length && !$depth3List.hasClass("active")) {
								isRun = true;
								$depth3ListSiblings.removeClass("active");
								$depth3ListSiblingsDepth4Menu.slideUp(500, "easeInOutExpo");

								$depth4Menu.slideDown(500, "easeInOutExpo", function() {
									isRun = false;
								});

								$depth3List.addClass("active");

								event.preventDefault();
							}
						}else{
							event.preventDefault();
						}
					}
				});

				//4차메뉴 a
				$.tags.depth4Anchor.on("mouseenter.layout focusin.layout", function() {
					var $this = $(this),
						$depth4List = $this.parent(".depth4_list");

					if(mode == "mobile") {
						$depth4List.addClass("active");
					}
				}).on("mouseleave.layout focusout.layout", function() {
					var $this = $(this),
						$depth4List = $this.parent(".depth4_list");

					if(mode == "mobile") {
						$depth4List.removeClass("active");
					}
				});

				$.tags.lnbPrevLastAnchor.add($.tags.containerFirstAnchor).on("focusin.layout", function() {
					if(mode == "pc") {
						$.tags.depth1List.removeClass("active active_next");
						$.tags.header.removeClass("menu_active");
					}
				});
				
				$.tags.lnbTitleFirstAnchor.on("focusin.layout", function() {
					var i = 0,
						DEPTH1_LIST_COUNT = $.tags.depth1List.length;

					if(mode == "pc") {
						for(; i < DEPTH1_LIST_COUNT; i++) {
							$.tags.lnb.removeClass("state" + (i + 1));
						}

						$.tags.header.addClass("menu_active");
						$.tags.lnb.scrollTop(0);
						$.tags.lnbWrapChildWrap.scrollTop(0);
					}
				});

				$.tags.lnb.on("mouseleave.layout", function() {
					var $this = $(this)/*,
						DEPTH1_LIST_COUNT = $.tags.depth1List.length,
						i = 0*/;

					if(mode == "pc") {
						$.tags.depth1List.removeClass("active active_next");
						$.tags.header.removeClass("menu_active");

						/*for(; i < DEPTH1_LIST_COUNT; i++) {
							$this.removeClass("state" + (i + 1));
						}*/
					}
				});
				//메뉴 끝

				//목록
				$.tags.dataStyleOpenButton.on("click.layout", dataStyleOpen);
				$.tags.dataStyleCloseButton.on("click.layout", dataStyleClose);

				//모바일 메뉴 열기버튼
				$.tags.mobileLnbOpenButton.on("click.layout", function() {
					$.tags.header.addClass("menu_active");
					$.tags.html.addClass("freeze");
				});
				
				//모바일 메뉴 닫기버튼
				$.tags.mobileLnbCloseButton.on("click.layout", function() {
					$.tags.header.removeClass("menu_active");
					$.tags.mobileLnbOpenButton.removeClass("active");
					$.tags.html.removeClass("freeze");
				});

				//탭메뉴
				$.tags.tabMenu = $.tags.container.find(".tab_menu");
				$.tags.tabMenuWrap = $.tags.tabMenu.children(".tab_menu_wrap");
				$.tags.tabMenuUl = $.tags.tabMenuWrap.children("ul");
				$.tags.tabMenuLi = $.tags.tabMenuUl.children("li");
				$.tags.tabMenuOpenButton = $.tags.tabMenuLi.children(".open");

				$.tags.tabMenuOpenButton.on("click.layout", function(event) {
					var $this = $(this),
						$li = $this.parent("li"),
						$liSiblings = $li.siblings("li"),
						$tabMenu = $this.parents(".tab_menu"),
						$eachOfTabMenu = {},
						$eachOfTabMenuWrap = {},
						$eachOfTabMenuUl = {},
						$eachofTabMenuLiActive = {},
						$eachofTabContent = {},
						TAB_MENU_COUNT = $tabMenu.length,
						unlock = "",
						unlockCount = 1,
						i = 0,
						j = 0;
					

					$liSiblings.removeClass("active");
					$li.addClass("active");
					
					for(; i < TAB_MENU_COUNT; i++) {
						$eachOfTabMenu = $tabMenu.eq(i);
						$eachOfTabMenuWrap = $eachOfTabMenu.children(".tab_menu_wrap");
						$eachOfTabMenuUl = $eachOfTabMenuWrap.children("ul");
						$eachofTabMenuLiActive = $eachOfTabMenuUl.children("li.active");
						$eachofTabContent = $eachofTabMenuLiActive.children(".tab_content");
						unlock = $eachOfTabMenu.data("unlock") || "";

						if(unlock) {
							unlock = unlock.removeBlank().split(",");
							unlockCount = unlock.length;
						}

						for(; j < unlockCount; j++) {
							if(unlock[j] == $.responsive.info.nowState) {
								$eachOfTabMenu.css("padding-bottom", "");
								break;
							}else{
								$eachOfTabMenu.css("padding-bottom", $eachofTabContent.outerHeight(true));
							}
						}

						j = 0;
					}

					event.preventDefault();
				});

				//a태그 #,. 으로 시작하는 객체까지 스크롤 이동
				$.tags.hasObjectAnchor = $("a[href^='#'], a[href^='.']");
				$.tags.hasObjectAnchor.on("click.kit", function(event) {
					var $this = $(this),
						$scrollspy = $this.parents("[data-scrollspy='true']"),
						HREF = $this.attr("href"),
						$target = $(HREF);

					if(!isRun) {
						isRun = true;

						$target.scrollTo({
							scrollElement : "html, body",
							type : "offset",
							direction : ["top", "left"],
							duration : "500",
							easing : "easeInOutExpo",
							scrollspy : ($scrollspy[0]) ? true : false,
							complete : function() {
								isRun = false;
							}
						});
					}

					event.preventDefault();
				});
				
				//header sticky
				function setHeaderSticky(event) {
					var $this = $(this),
						SCROLL_TOP = $this.scrollTop(),
						SCROLL_LEFT = $this.scrollLeft();
					
					if(mode == "pc") {
						if(!documentReadyLnbOffsetTop) {
							$.tags.html.removeClass("header_sticky");
							documentReadyLnbOffsetTop = $.tags.lnb.offset().top;
						}

						if(SCROLL_TOP >= documentReadyLnbOffsetTop) {
							$.tags.html.addClass("header_sticky");
							$.tags.header.css("right", SCROLL_LEFT);
						}else{
							$.tags.html.removeClass("header_sticky");
							$.tags.header.css("right", "");
						}
					}else{
						$.tags.html.removeClass("header_sticky");
						$.tags.header.css("right", "");
					}
				}
				
				if($.tags.lnb.length) {
					documentReadyLnbOffsetTop = $.tags.lnb.offset().top;
					$.tags.wdw.on("scroll.headerSticky", setHeaderSticky).trigger("scroll.headerSticky");
					$.tags.wdw.eventEnd("resize.headerSticky", setHeaderSticky).trigger("resize.headerSticky");
				}

				$.tags.wdw.eventEnd("resize.layout", function() {
					//스크롤바 확인
					Kit.info.scrollBarWidth = Kit.browser.scrollBar.getWidth();
					if(Kit.info.scrollBarWidth > 0) {
						$.tags.html.addClass("has_scroll");
					}else{
						$.tags.html.removeClass("has_scroll");
					}
				}).trigger("resize.layout");
				
				//다음지도
				$.tags.map = $.tags.container.find(".root_daum_roughmap");
				$.tags.wdw.eventEnd("resize.map", function() {
					var i = 0,
						mapCount = $.tags.map.length,
						$map = {},
						getId = "",
						setId = "",
						timeStamp = 0,
						key = "",
						width = 0,
						height = 0,
						pcHeight = 0,
						mobileHeight = 0;

					if(daum && !$.responsive.bools.resize) {
						$.tags.map.children("div").remove();

						for(; i < mapCount; i++) {
							$map = $.tags.map.eq(i);
							timeStamp = $map.data("timestamp");
							key = $map.data("key");
							width = $map.data("width");
							pcHeight = $map.data("height");
							mobileHeight = $map.data("mobile-height");
							getId = $map.attr("id");
							setId = "daumRoughmapContainer" + timeStamp;

							if(getId != setId) {
								$map.attr("id", setId);
							}

							if($.responsive.info.nowState == "mobile" && mobileHeight) {
								height = mobileHeight;
							}else{
								height = pcHeight;
							}

							new daum.roughmap.Lander({
								"timestamp" : timeStamp,
								"key" : key,
								"mapWidth" : width,
								"mapHeight" : height
							}).render();
						}
					}

				}).trigger("resize.map");

				//캠퍼스맵
				$.tags.campusMapButton = $("a.campusmap, button.campusmap");
				$.tags.campusMapButton.on("click.layout", function(event) {
					window.open('/site/campusmap/sub.html', '_blank', 'scrollbars=yes, resizable=no, width=1250, height=860');
					event.preventDefault();
				});

				//slick ie7, ie8 responsive 막기
				if(Kit.info.browser == "ie7" || Kit.info.browser == "ie8") {
					originalSlick = $.fn.slick;

					$.fn.slick = function(options) {
						if(options.responsive) {
							delete options.responsive;
						}

						originalSlick.call(this, options);
						return this;
					};
				}

				//레이어팝업
				$.tags.layerPopup = $.tags.header.find(".layer_popup");
				$.tags.layerPopupWrap = $.tags.layerPopup.children(".wrap");
				$.tags.popup = $.tags.layerPopupWrap.children("div[class^='popup']");

				$.tags.popup.on("mousedown.drag", function(event) {
					var $this = $(this),
						POSITION = $this.position(),
						X = event.clientX - POSITION.left,
						Y = event.clientY - POSITION.top;

					$.tags.dcmt.on("mousemove.drag", function(event) { 
						$this.css("left", event.clientX - X); 
						$this.css("top", event.clientY - Y);
					});

					event.preventDefault();
				});

				$.tags.dcmt.on("mouseup.drag", function(event) {
					$.tags.dcmt.off("mousemove.drag");
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}