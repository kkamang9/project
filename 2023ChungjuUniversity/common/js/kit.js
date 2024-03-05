"use strict";

try {
	/**
	 * @name 모든 문자열 치환
	 * @description 지정한 문자열에서 beforeString 적힌 문자열이 afterString으로 모두 치환 됩니다.
	 * @since 2017-01-16
	 * @param {string} beforeString
	 * @param {string} afterString
	 * @return {string}
	 */
	String.prototype.replaceAll = function(beforeString, afterString) {
		return this.split(beforeString).join(afterString);
	};

	/**
	 * @name 모든 공백 제거
	 * @since 2017-01-16
	 * @return {string}
	 */
	String.prototype.removeBlank = function() {
	   return this.replace(/[\s\t\n\xA0]+/g, "");
	};

	/**
	 * @name 첫번째 글자를 대문자로 바꾸기
	 * @since 2017-01-16
	 * @return {string}
	 */
	String.prototype.toFirstLetterUpperCase = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	/**
	 * @name 배열안에서 문자열 찾기
	 * @since 2017-01-16
	 * @param {string} string
	 * @return {boolean}
	 */
	Array.prototype.inArray = function(string) {
		return this.join(",").indexOf(string) > -1;
	};
	
	/**
	 * @name 한자리 숫자에 0 붙이기
	 * @since 2017-01-16
	 * @param {number} number
	 * @return {string, number}
	 */
	Number.prototype.padding = function(number) {
		return (number < 10) ? "0" + number : number;
	};

	/**
	 * @name Kit.js
	 * @author (주)한신정보기술 퍼블리셔팀 권정현({@link mailto:kjh3859@hanshinit.co.kr})
	 * @version 1.0
	 * @since 2017-01-16
	 * @see
	 * <ol>
	 *     <li>2017-01-16 - 최초생성</li>
	 * </ol>
	 */
	this.Kit = {
		/**
		 * @description Kit에 관련된 정보를 정의하는 객체입니다.
		 * @since 2017-01-16
		 */
		info : {
			prefix : "Kit",
			version : "1.0",
			platform : ("win16,win32,win64,mac,linux".indexOf(navigator.platform.toLowerCase()) > -1) ? "pc" : "mobile",
			documentReady : false,
			windowLoad : false
		},

		/**
		 * @description 브라우저와 관련된 것들을 정의하는 객체입니다.
		 * @since 2017-01-16
		 */
		browser : {
			/**
			 * @name 브라우저 확인
			 * @since 2017-01-16
			 * @return {string}
			 */
			type : function() {
				var AGENT = navigator.userAgent.toLowerCase(),
					result = "";

				if(AGENT.indexOf("msie 7.0") > -1) {
					result = "ie7";
				}else if(AGENT.indexOf("msie 8.0") > -1) {
					result = "ie8";
				}else if(AGENT.indexOf("msie 9.0") > -1) {
					result = "ie9";
				}else if(AGENT.indexOf("msie 10.0") > -1) {
					result = "ie10";
				}else if(AGENT.indexOf("trident/7.0") > -1) {
					result = "ie11";
				}else if(AGENT.indexOf("edge") > -1) {
					result = "edge";
				}else if(AGENT.indexOf("whale") > -1) {
					result = "whale";
				}else if(AGENT.indexOf("samsungbrowser") > -1) {
					result = "samsung";
				}else if(AGENT.indexOf("opr") > -1) {
					result = "opera"; 
				}else if(AGENT.indexOf("chrome") > -1) {
					result = "chrome";
				}else if(AGENT.indexOf("firefox") > -1) {
					result = "firefox"; 
				}else if(AGENT.indexOf("safari") > -1) {
					result = "safari";
				}else{
					result = "etc";
					console.log(AGENT);
				}

				return result;
			},

			/**
			 * @description 스크롤바와 관련된 것들을 정의하는 객체입니다.
			 * @since 2017-01-16
			 */
			scrollBar : {
				/**
				 * @name 가로 스크롤바 존재여부
				 * @since 2017-01-16
				 * @param {object} element
				 * @return {boolean}
				 */
				hasHorizontal : function(element) {
					return (element) ? element.scrollWidth > element.clientWidth : document.documentElement.scrollWidth > document.documentElement.clientWidth;
				},

				/**
				 * @name 세로 스크롤바 존재여부
				 * @since 2017-01-16
				 * @param {object} element
				 * @return {boolean}
				 */
				hasVertical : function(element) {
					return (element) ? element.scrollHeight > element.clientHeight : document.documentElement.scrollHeight > document.documentElement.clientHeight;
				},

				/**
				 * @name 세로 스크롤바가 최대로 갈 수 있는 위치
				 * @since 2017-01-16
				 * @param {object} element
				 * @return {number}
				 */
				getTopMax : function(element) {
					return (element) ? element.scrollHeight - element.clientHeight : document.documentElement.scrollHeight - document.documentElement.clientHeight;
				},

				/**
				 * @name 가로 스크롤바가 최대로 갈 수 있는 위치
				 * @since 2017-01-16
				 * @param {object} element
				 * @return {number}
				 */
				getLeftMax : function(element) {
					return (element) ? element.scrollWidth - element.clientWidth : document.documentElement.scrollWidth - document.documentElement.clientWidth;
				},

				/**
				 * @name 스크롤바 넓이
				 * @since 2017-01-16
				 * @return {number}
				 */
				getWidth : function() {
					var result = 0,
						div = document.createElement("div"),
						dateTime = new Date().getTime();
					
					div.id = "scroll" + dateTime;
					div.style.visibility = "hidden";
					div.style.overflow = "scroll";
					div.style.position = "absolute";
					div.style.top = 0;
					div.style.left = 0;
					div.style.zIndex = -1;
					div.style.width = "100px";
					div.style.height = "100px";
					document.body.appendChild(div);
					div = document.getElementById("scroll" + dateTime);
					result = div.offsetWidth - div.clientWidth;

					if(div) {
						document.body.removeChild(div);
					}

					return result;
				}
			},

			/**
			 * @description 쿠키와 관련된 것들을 정의하는 객체입니다.
			 * @since 2017-01-16
			 */
			cookie : {
				
				/**
				 * @name 쿠키 사용가능 여부
				 * @since 2017-01-16
				 */
				support : navigator.cookieEnabled,

				/**
				 * @name 쿠키 생성
				 * @since 2017-01-16
				 * @param {string} name
				 * @param {string} value
				 * @param {number} days
				 * @return {boolean}
				 */
				set : function(name, value, days) {
					var createDate = Kit.info.serverDate,
						result = false;

					if(!days) {
						days = -1;
					}

					value = escape(value);
					createDate.setDate(createDate.getDate() + days);
					
					document.cookie = name + "=" + value + "; expires=" + createDate.toUTCString() + "; path=/;";
					
					//쿠키생성 후 확인해서 있으면
					if(this.get(name)) {
						result = true;
					}

					return result;
				},

				/**
				 * @name 쿠키값 얻기
				 * @since 2017-01-16
				 * @param {string} name
				 * @return {string}
				 */
				get : function(name) {
					var COOKIE_DATA = document.cookie,
						COOKIE_SPLIT = COOKIE_DATA.split(";"),
						COOKIE_SPLIT_COUNT = COOKIE_SPLIT.length,
						i = 0,
						result = "";

					for(; i < COOKIE_SPLIT_COUNT; i++) {
						var cookieSplitValue = COOKIE_SPLIT[i];
						
						while(cookieSplitValue.charAt(0) == " ") {
							cookieSplitValue = cookieSplitValue.substring(1);
							break;
						}

						if(cookieSplitValue.indexOf(name) > -1) {
							result = unescape(cookieSplitValue.substring(name.length + 1, cookieSplitValue.length));
							break;
						}
					}

					return result;
				}
			}
		},

		/**
		 * @description 문자열과 관련된 것들을 정의하는 객체입니다.
		 * @since 2017-01-16
		 */
		string : {
			/**
			 * @name 파라미터 파싱
			 * @description 주소에서 원하는 이름의 파라미터 값을 얻을 수 있습니다.
			 * @since 2017-01-16
			 * @param {string} name
			 * @param {string} url
			 * @return {boolean, string}
			 */
			param : function(name, url) {
				var REGEX = new RegExp("[?&]" + name.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"),
					result = REGEX.exec(url) || REGEX.exec(window.location.href);

				if(!result) {
					result = false;
				}else if(!result[2]) {
					result = "";
				}else{
					result = decodeURIComponent(result[2].replace(/\+/g, " "));
				}

				return result;
			},
			
			/**
			 * @name 문자열 파싱
			 * @description startString과endString 사이에 문자열을 모두 얻을 수 있습니다. (대문자와 섞어서 마크업을 했다면 소문자로 매개변수 입력 바랍니다.)
			 * @since 2017-01-16
			 * @param {string} startString
			 * @param {string} endString
			 * @param {string} fullString
			 * @return {array}
			 */
			parse : function(startString, endString, fullString) {
				var START_STRING_COUNT = startString.length,
					startIndex = 0,
					endIndex = 0,
					nowIndex = 0,
					results = [];
				
				fullString = fullString || document.documentElement.outerHTML.toLowerCase();

				while(fullString.indexOf(startString, startIndex) > -1) {
					startIndex = fullString.indexOf(startString, startIndex);
					nowIndex = startIndex + START_STRING_COUNT;
					endIndex = fullString.indexOf(endString, nowIndex);

					if(endIndex > -1) {
						results.push(fullString.substring(nowIndex, endIndex));
						startIndex = endIndex + 1;
					}else{
						break;
					}
				}

				return results;
			},

			/**
			 * @name 문자열 복사
			 * @since 2017-01-16
			 * @param {string} string
			 * @return {string}
			 */
			copy : function(string) {
				var result = "";

				if(Kit.info.browser.indexOf("ie") > -1) {
					window.clipboardData.setData("Text", string);

					if(window.clipboardData.getData("Text") == string) {
						alert('복사되었습니다.');
					}

					result = "clipboard";
				}else{
					prompt('Ctrl+C를 눌러 복사하세요.', string);
					result = "prompt";
				}

				return result;
			}
		},

		/**
		 * @description css와 관련된 것들을 정의하는 객체입니다.
		 * @since 2017-01-16
		 */
		css : {
		    /**
			 * @name css규칙 입력
			 * @description 자바스크립트로 원하는 css규칙을 추가할 수 있습니다. (가급적이면 개발페이지에서 head에 link태그 또는 style태그를 이용하지 못하고 호환성은 피해가야할때 사용 바랍니다.)
			 * @since 2017-01-16
			 * @param {string} rules
			 * @return {object}
			 */
			set : function(rules) {
				var head = document.head,
					style = head.getElementsByTagName("style"),
					STYLE_COUNT = style.length;

				head.innerHTML += "<style type=\"text/css\">" + rules + "</style>";
				style = head.getElementsByTagName("style");
				return style[STYLE_COUNT];
			}
		}
	};

	/**
	 * @description Kit.info.browser에 현재 접속한 브라우저가 무엇인지 입력 합니다.
	 * @since 2017-01-16
	 */
	Kit.info.browser = Kit.browser.type();

	/**
	 * @name 제이쿼리 플러그인 모음
	 * @description 제이쿼리에 관련된 공통부분을 정의하는 부분 입니다.
	 * @version jQuery - v1.12.4 기반
	 */

	//제이쿼리가 있으면
	if(jQuery) {
		//제이쿼리 겹침방지
		(function($) {
			/**
			 * @name 태그 그룹
			 * @description 제이쿼리 셀렉터를 정의하는 공간입니다.
			 */
			$.tags = {
				wdw : $(window),
				dcmt : $(document)
			};

			//$객체에 함수상속
			$.extend($, {				
				/**
				 * @description 반응형 플러그인과 관련된 것들을 정의하는 객체입니다.
				 */
				responsive : {
					/**
					 * @description 반응형 플러그인에 대한 정보를 정의하는 객체입니다.
					 */
					info : {
						detectedPlatform : Kit.info.platform,
						detectedBrowser : Kit.info.browser,
						logs : [],
						nowState : "",
						prevState : "",
						isRun : false
					},

					/**
					 * @description 화면정보에 대해 정의하는 객체입니다.
					 */
					screen : {
						tempWidth : 0
					},

					/**
					 * @description 옵션으로부터 받아온 bool값을 정의하는 객체입니다.
					 */
					bools : {
						browserLimits : Kit.info.browser == "ie7" || Kit.info.browser == "ie8"
					},

					/**
					 * @description 함수들을 정의하는 객체입니다.
					 */
					functions : {},

					/**
					 * @name 반응형 분기 확인
					 * @description 현재상태와 새로넣은 상태와 값을 비교합니다.
					 * @since 2017-01-16
					 * @param {string} state
					 * @return {boolean}
					 */
					check : function(state) {
						return (state == this.info.nowState) ? false : true;
					},

					/**
					 * @name 반응형 분기 지정
					 * @description 새로운 상태를 지정합니다.
					 * @since 2017-01-16
					 * @param {string} state
					 * @param {object} event
					 * @return {boolean}
					 */
					setState : function(state, event) {
						var result = false;

						if(this.check(state)) {
							this.info.jqueryObject.removeClass(this.info.nowState);
							this.info.jqueryObject.addClass(state);
							this.info.prevState = this.info.nowState;
							this.info.nowState = state;
							this.info.logs.push(state);
							console.log("현재상태 : " + state);
							this.callFunction(state, event);
							result = true;
						}else{
							this.callFunction(state + "All", event);
						}

						return result;
					},

					/**
					 * @name 반응형 지정분기점 보기
					 * @description 원하는 분기지점을 볼 수 있습니다. 일자를 지정하면 그 일수동안 그 상태를 보게 됩니다.
					 * @since 2017-01-16
					 * @param {string} mode
					 * @param {number} days
					 * @return {boolean}
					 */
					view : function(mode, days) {
						var result = false;

						if(mode == "wide" || mode == "web" || mode == "tablet" || mode == "mobile") {
							$.tags.wdw.trigger("resize.responsive");
							this.setState(mode, this.screen.event);

							if($.isNumeric(days)) {
								Kit.browser.cookie.set("view", mode, days);
							}

							result = true;
						}

						return result;
					},

					/**
					 * @name 미디어쿼리 대체
					 * @description maxWidth, maxHeight, minWidth, minHeight에 등록한 숫자가 클래스로 표출이 됩니다.
					 * @since 2017-01-16
					 * @param {array} maxWidth
					 * @param {array} maxHeight
					 * @param {array} minWidth
					 * @param {array} minHeight
					 * @return {boolean}
					 */
					setMedia : function(maxWidth, maxHeight, minWidth, minHeight) {
						var i = 0,
							numberI = i,
							eachOfArguments = {},
							countOfEachArguments = 0,
							widthOrHeight = "",
							widthOrHeightLowerCase = "",
							maxOrMin = "",
							operator = [],
							j = 0,
							removeClassTest = false,
							addClassTest = false,
							result = 0;
						
						for(i in arguments) {
							numberI = parseInt(i, 10);
							eachOfArguments = arguments[numberI];
							countOfEachArguments = eachOfArguments.length;
							widthOrHeight = (numberI % 2) ? "Height" : "Width";
							widthOrHeightLowerCase = widthOrHeight.toLowerCase();
							maxOrMin = (Math.floor(numberI / 2)) ? "min" : "max";
							operator = (maxOrMin == "min") ? ["<=", ">="] : [">=", "<="];
							
							//매개변수에 배열에 값이 있으면
							if(countOfEachArguments) {
								for(; j < countOfEachArguments; j++) {
									removeClassTest = eval(this.screen["window" + widthOrHeight] + operator[0] + eachOfArguments[j]);
									addClassTest = eval(this.screen["window" + widthOrHeight] + operator[1] + eachOfArguments[j]);

									if(removeClassTest) {
										this.info.jqueryObject.removeClass(maxOrMin + "_" + widthOrHeightLowerCase + eachOfArguments[j]);
									}

									if(addClassTest) {
										this.info.jqueryObject.addClass(maxOrMin + "_" + widthOrHeightLowerCase + eachOfArguments[j]);
									}
								}

								result++;
							}
						}

						return (result) ? true : false;
					},

					/**
					 * @name 반응형 분기함수 실행
					 * @description 
					 * @since 2017-01-16
					 * @param {string} prefix
					 * @param {object} event
					 * @return {boolean}
					 */
					callFunction : function(prefix, event) {
						var i = 0,
							nameSpace = "",
							nameSpaceToFirstLetterUpperCase = "",
							functionName = [],
							result = 0;

						if(this.bools.branchFunction) {
							for(; i < this.nameSpace.count; i++) {
								nameSpace = this.nameSpace.list[i];
								nameSpaceToFirstLetterUpperCase = nameSpace.toFirstLetterUpperCase();
								functionName[0] = prefix + nameSpaceToFirstLetterUpperCase;
								functionName[1] = "processing" + nameSpaceToFirstLetterUpperCase + "State";

								if(this.functions[functionName[1]]) {
									this.functions[functionName[1]](functionName[0], event);
									result++;
								}
							}
						}

						return (result) ? true : false;
					}
				},

				/**
				 * @description 이벤트 종료 플러그인과 관련된 것들을 정의하는 객체입니다.
				 */
				eventEnd : {
					index : -1
				}
			});

			//fn객체에 함수상속
			$.fn.extend({
				/**
				 * @name 반응형 분기
				 * @description 지정한 객체에 클래스로 상태를 표기하며 브라우저의 가로 사이즈에 따라서 현재 디바이스 상태를 체크하여 함수를 호출 합니다.
				 * @since 2017-01-16
				 * @param {object} options 
								   @param {boolean} lowInternetExplorer ie7, ie8에서 반응형 실행여부,
								   @param {boolean} mobilePlatformScriptsOnPCPlatform PC 플랫폼에서 모바일 플랫폼 스크립트 실행여부,
								   @param {boolean} branchFunction 분기함수 실행여부,
								   @param {array[number]} maxWidth 미디어쿼리 max-width,
								   @param {array[number]} maxHeight 미디어쿼리 max-height,
								   @param {array[number]} minWidth 미디어쿼리 min-width,
								   @param {array[number]} minHeight 미디어쿼리 min-height,
								   @param {array[string]} nameSpaceList 함수($.responsive.functions.allProgram)를 지역으로 뿌릴 자바스크립트 파일명(program.js),
								   @param {number} webEndPixel 웹범위가 끝나는 픽셀 값,
								   @param {number} tabletStartPixel 태블릿이 시작되는 픽셀 값,
								   @param {number} mobileStartPixel 모바일이 시작되는 픽셀 값
				 * @return {object}
				 */
				responsive : function(options) {
					//지정한 객체로 부터 받아온 매개변수 객체를 기본틀에 상속시킨다.
					var $this = this.first(),
						$window = $.tags.wdw,
						settings = $.extend({
							lowInternetExplorer : false,
							mobilePlatformScriptsOnPCPlatform : true,
							branchFunction : true,
							maxWidth : [],
							maxHeight : [],
							minWidth : [],
							minHeight : [],
							nameSpaceList : [],
							webEndPixel : 1599,
							tabletStartPixel : 800,
							mobileStartPixel : 640
						}, options),
						SCROLL_BAR_WIDTH = Kit.info.scrollBarWidth;

					//중복실행 방지
					if(!$.responsive.info.isRun) {
						//responsive정보
						$.responsive.info.jqueryObject = $this;
						$.responsive.info.isRun = true;

						//화면정보
						$.responsive.screen.loadedWidth = $window.width();
						$.responsive.screen.loadedHeight = $window.height();
						
						if(Kit.browser.scrollBar.hasVertical()) {
							$.responsive.screen.loadedWidth += SCROLL_BAR_WIDTH;
						}

						if(Kit.browser.scrollBar.hasHorizontal()) {
							$.responsive.screen.loadedHeight += SCROLL_BAR_WIDTH;
						}
						
						//true or false정보
						$.responsive.bools.lowInternetExplorer = settings.lowInternetExplorer;
						$.responsive.bools.mobilePlatformScriptsOnPCPlatform = settings.mobilePlatformScriptsOnPCPlatform;
						$.responsive.bools.branchFunction = settings.branchFunction;

						//이름목록
						$.responsive.nameSpace = {
							list : settings.nameSpaceList,
							count : settings.nameSpaceList.length
						};
						
						//범위정보
						$.responsive.range = {
							webEndPixel : settings.webEndPixel,
							tabletStartPixel : settings.tabletStartPixel,
							mobileStartPixel : settings.mobileStartPixel,
							maxWidth : settings.maxWidth,
							maxHeight : settings.maxHeight,
							minWidth : settings.minWidth,
							minHeight : settings.minHeight,
							maxWidthCount : settings.maxWidth.length,
							maxHeightCount : settings.maxHeight.length,
							minWidthCount : settings.minWidth.length,
							minHeightCount : settings.minHeight.length
						};

						$window.on("resize.responsive", function(event) {
							var _VIEW_VALUE = Kit.browser.cookie.get("view"),
								_SCROLL_BAR_WIDTH = Kit.browser.scrollBar.getWidth();
							
							$.responsive.info.event = event;
							$.responsive.bools.resize = true;

							//화면정보 갱신
							$.responsive.screen.windowWidth = $window.width();
							$.responsive.screen.windowHeight = $window.height();
							
							if(Kit.browser.scrollBar.hasVertical()) {
								$.responsive.screen.windowWidth += _SCROLL_BAR_WIDTH;
							}

							if(Kit.browser.scrollBar.hasHorizontal()) {
								$.responsive.screen.windowHeight += _SCROLL_BAR_WIDTH;
							}

							//가로값이 변경되었을때 실행(이유 : 모바일기기에서 화면확대, 축소시에 resize함수 발생 때문에)
							if($.responsive.screen.windowWidth != $.responsive.screen.tempWidth) {
								$.responsive.screen.tempWidth = $.responsive.screen.windowWidth;
								$.responsive.bools.resize = false;

								//전체범위
								$.responsive.callFunction("all", event);

								//lowInternetExplorer가 true이면서 maxWidthCount, maxHeightCount, minWidthCount, minHeightCount가 1개이상 존재할때
								if($.responsive.bools.lowInternetExplorer && $.responsive.bools.browserLimits && ($.responsive.range.maxWidthCount || $.responsive.range.maxHeightCount || $.responsive.range.minWidthCount || $.responsive.range.minHeightCount)) {
									$.responsive.setMedia($.responsive.range.maxWidth, $.responsive.range.maxHeight, $.responsive.range.minWidth, $.responsive.range.minHeight);
								}
								
								//lowInternetExplorer가 false이면서 접속한 브라우저가 ie7, ie8인 경우
								if(!$.responsive.bools.lowInternetExplorer && $.responsive.bools.browserLimits) {
									$.responsive.setState("web", event);

								//쿠키값 확인 후 적용
								}else if(_VIEW_VALUE == "wide" || _VIEW_VALUE == "web" || _VIEW_VALUE == "tablet" || _VIEW_VALUE == "mobile") {
									$.responsive.setState(_VIEW_VALUE, event);

								//mobilePlatformScriptsOnPCPlatform가 false이면서 접속한 플랫폼이 pc인경우
								}else if(!$.responsive.bools.mobilePlatformScriptsOnPCPlatform && $.responsive.info.detectedPlatform == "pc") {
									//1599초과 와이드
									if($.responsive.screen.windowWidth > $.responsive.range.webEndPixel) {
										$.responsive.setState("wide", event);
									
									//나머지 웹
									}else{
										$.responsive.setState("web", event);
									}
								//1599초과 와이드
								}else if($.responsive.screen.windowWidth > $.responsive.range.webEndPixel) {
									$.responsive.setState("wide", event);

								//800초과 웹
								}else if($.responsive.screen.windowWidth > $.responsive.range.tabletStartPixel) {
									$.responsive.setState("web", event);

								//640초과 태블릿
								}else if($.responsive.screen.windowWidth > $.responsive.range.mobileStartPixel) {
									$.responsive.setState("tablet", event);

								//640 ~ 0 모바일
								}else{
									$.responsive.setState("mobile", event);
								}
							}
						}).trigger("resize.responsive");

						//브라우저 상태, 플랫폼 상태 클래스 추가
						$this.addClass($.responsive.info.detectedBrowser + " " + $.responsive.info.detectedPlatform + "_platform");
					}

					//객체리턴
					return $this;
				},

				/**
				 * @name 스크롤 이동
				 * @description 지정한 객체가 있는곳 까지 부드러운 스크롤링으로 넘어 갑니다.
				 * @since 2017-01-16
				 * @param {object} options
								   @param {object} scrollElement
								   @param {object} targetElement
								   @param {string} type(offset, position)
								   @param {string} direction
								   @param {number, string} duration(밀리세컨드, fast, slow)
								   @param {string} easing
								   @param {function} complete
				 * @return {boolean}
				 */
				scrollTo : function(options) {
					var settings = $.extend({
							scrollElement : "html, body",
							type : "offset",
							direction : ["top", "left"],
							duration : "500",
							easing : "swing",
							scrollspy : false,
							complete : function() {}
						}, options),
						$this = this.first(),
						$window = $.tags.wdw,
						WINDOW_WIDTH = $window.width(),
						WINDOW_HEIGHT = $window.height(),
						TARGET_OUTER_WIDTH = $this.outerWidth(true),
						TARGET_OUTER_HEIGHT = $this.outerHeight(true),
						TARGET_OFFSET = $this.offset(),
						TARGET_POSITION = $this.position(),
						$scroll = $(settings.scrollElement),
						$eachOfScroll = {},
						SCROLL_COUNT = $scroll.length,
						scrollOuterWidth = 0,
						scrollOuterHeight = 0,
						scrollOffset = {},
						scrollPosition = {},
						scrollTop = 0,
						scrollLeft = 0,
						scrollTopMax = 0,
						scrollLeftMax = 0,
						tempObject = {},
						value = [],
						HASH = $this.attr("id") || "",
						i = 0,
						tagName = "",
						DIRECTION_COUNT = settings.direction.length,
						isHtmlBody = false;

					for(; i < DIRECTION_COUNT; i++) {
						settings.direction[i] = settings.direction[i].toLowerCase();

						if(settings.direction[i] == "right") {
							settings.direction[i] = "Left";
						}else if(settings.direction[i] == "bottom") {
							settings.direction[i] = "Top";
						}else{
							settings.direction[i] = settings.direction[i].toFirstLetterUpperCase();
						}
					}

					i = 0;
					settings.type = settings.type.toLowerCase();

					if(settings.direction.inArray("Top") && settings.direction.inArray("Left")) {
						settings.direction = [];
						settings.direction.push("Top");
						settings.direction.push("Left");
					}else if(settings.direction.inArray("Top")) {
						settings.direction = [];
						settings.direction.push("Top");
					}else if(settings.direction.inArray("Left")) {
						settings.direction = [];
						settings.direction.push("Left");
					}
					
					DIRECTION_COUNT = settings.direction.length;

					for(; i < SCROLL_COUNT; i++) {
						$eachOfScroll = $scroll.eq(i);
						tagName = $eachOfScroll[0].tagName.toLowerCase();

						if(tagName == "html" || tagName == "body") {
							isHtmlBody = true;
							break;
						}
					}
					
					i = 0;

					if(SCROLL_COUNT > 1 && !isHtmlBody) {
						$scroll = $scroll.first();
					}

					scrollOuterWidth = $scroll.outerWidth(true);
					scrollOuterHeight = $scroll.outerHeight(true);
					scrollOffset = $scroll.offset();
					scrollPosition = $scroll.position();
					scrollTop = $scroll.scrollTop();
					scrollLeft = $scroll.scrollLeft();
					scrollTopMax = Kit.browser.scrollBar.getTopMax($scroll[0]);
					scrollLeftMax = Kit.browser.scrollBar.getLeftMax($scroll[0]);

					//scrollElement && targetElement가 document상에 존재하면
					if($this[0] && $scroll[0]) {
						//value가 음수이면 0이고 아닐경우 10진수로 변환
						for(; i < DIRECTION_COUNT; i++) {
							//방향이 왼쪽일경우
							if(settings.direction[i] == "Left") {
								//type이 포지션이면
								if(settings.type == "position") {
									scrollLeft = TARGET_POSITION.left - scrollPosition.left + scrollLeft;
									
									if(scrollLeftMax < scrollLeft) {
										value.push(scrollLeft - scrollOuterWidth + TARGET_OUTER_WIDTH);
									}else{
										value.push(scrollLeft);
									}
								
								//아닐경우 offset으로 처리
								}else{
									scrollLeft = TARGET_OFFSET.left - WINDOW_WIDTH + TARGET_OUTER_WIDTH;

									if(scrollLeftMax < TARGET_OFFSET.left) {
										if(scrollLeft > 0 && !settings.scrollspy) {
											value.push(scrollLeft);
										}else{
											value.push(scrollLeftMax);
										}
									}else{
										value.push(TARGET_OFFSET.left);
									}
								}

							//아닐경우 top으로 처리
							}else{
								if(settings.type == "position") {
									scrollTop = TARGET_POSITION.top - scrollPosition.top + scrollTop;

									if(scrollTopMax < scrollTop) {
										value.push(scrollTop - scrollOuterHeight + TARGET_OUTER_HEIGHT);
									}else{
										value.push(scrollTop);
									}
								}else{
									scrollTop = TARGET_OFFSET.top - WINDOW_HEIGHT + TARGET_OUTER_HEIGHT;

									if(scrollTopMax < TARGET_OFFSET.top) {
										if(scrollTop > 0 && !settings.scrollspy) {
											value.push(scrollTop);
										}else{
											value.push(scrollTopMax);
										}
									}else{
										value.push(TARGET_OFFSET.top);
									}
								}
							}

							if(value[i] < 0) {
								value[i] = 0;
							}else{
								value[i] = parseInt(value[i], 10);
							}

							tempObject["scroll" + settings.direction[i]] = value[i];
						}
						
						$scroll.stop(true, true).animate(tempObject, {
							duration : settings.duration,
							easing : settings.easing,
							complete : function() {
								$this.moveFocus();

								if(HASH.length > 1) {
									$this.attr("id", "temp");
									window.location.hash = HASH;
									$this.attr("id", HASH);
								}

								if(typeof settings.complete == "function") {
									$.proxy(settings.complete, $this[0])();
								}
							}
						});
					}else if(typeof settings.complete == "function") {
						$.proxy(settings.complete, $this[0])();
					}

					return $this;
				},

				/**
				 * @name 초점 이동
				 * @description 초점이 있던 없던 지정한 객체로 초점이동 할 수 있습니다.
				 * @since 2017-01-16
				 * @return {string}
				 */
				moveFocus : function() {
					var $this = this.first(),
						TAB_INDEX = $this.attr("tabindex"),
						result = "";
					
					if(TAB_INDEX) {
						$this.focus();
						result = "초점 이동";
					}else{
						$this.attr("tabindex", -1);
						$this.focus();
						$this.removeAttr("tabindex");
						result = "초점 생성 후 이동";
					}

					return result;
				},

				/**
				 * @name 정확한 선택자 얻기
				 * @description 지정한 객체에 대한 부모에서 부터 자신까지의 셀렉터를 얻을 수 있습니다.
				 * @since 2017-01-16
				 * @return {string}
				 */
				getExactSelector : function(path) {
					var $this = this.first(),
						TAG_NAME = $this[0].tagName.toLowerCase(),
						ID = $this.attr("id"),
						CLASS = $this.attr("class");

					path = path || "";

					if(TAG_NAME == "html") {
						return TAG_NAME + path;
					}else{
						ID = (ID) ? TAG_NAME += "#" + ID : "";
						CLASS = (CLASS) ? TAG_NAME += "." + CLASS.replaceAll(" ", ".") : "";

						return $this.parent().getExactSelector(" > " + TAG_NAME + path);
					}
				},

				/**
				 * @name 자신의 선택자 얻기
				 * @description 지정한 객체에 대한 셀렉터를 얻을 수 있습니다.
				 * @since 2017-01-16
				 * @return {string}
				 */
				getSelfSelector : function() {
					var $this = this.first(),
						TAG_NAME = $this[0].tagName.toLowerCase(),
						ID = $this.attr("id"),
						CLASS = $this.attr("class");

					ID = (ID) ? TAG_NAME += "#" + ID : "";
					CLASS = (CLASS) ? TAG_NAME += "." + CLASS.replaceAll(" ", ".") : "";

					return TAG_NAME;
				},

				/**
				 * @name 클래스 얻기
				 * @description 지정한 객체에 대한 클래스를 얻을 수 있습니다.
				 * @since 2017-01-16
				 * @return {array}
				 */
				getClass : function(element) {
					var $this = this.first(),
						CLASS = $this.attr("class");

					return (CLASS) ? CLASS.split(" ") : [];
				},
				
				/**
				 * @name 클래스 갯수
				 * @description 지정한 객체에 대한 클래스 갯수를 얻을 수 있습니다.
				 * @since 2017-01-16
				 * @return {number}
				 */
				countClass : function() {
					var $this = this.first(),
						CLASS = $this.attr("class");

					return (CLASS) ? CLASS.split(" ").length : 0;
				},

				/**
				 * @name 배경 플레이스 홀더
				 * @description 지정한 객체가 포커스인이 되면 배경이 사라졌다가 포커스아웃이 되면 배경이 생성 되며 포커스가 갈 수 있는 객체에만 사용이 가능하며 인터넷 익스플로러10미만에서 placeholder속성을 대체 할 수 있습니다.
				 * @since 2017-01-16
				 * @param {string} value
				 * @return {function}
				 */
				placeholder : function(value) {
					return this.each(function() {
						var _$this = $(this),
							_VALUE = _$this.val();
						
						_$this.val("").css("background", value);

						_$this.focusin(function() {
							_$this.css("background", "transparent none");
						}).focusout(function() {
							if(!_VALUE.length) {
								_$this.css("background", value);
							}
						});
					});
				},

				/**
				 * @name 속성값 치환
				 * @description 지정한 객체의 속성에 있는 값을 치환 합니다.
				 * @since 2017-01-16
				 * @param {string} attribute
				 * @param {string} beforeString
				 * @param {string} afterString
				 */
				replaceAttrValue : function(attribute, beforeString, afterString) {
					return this.each(function() {
						var _$this = $(this),
							_ATTRIBUTE = _$this.attr(attribute);

						if(_ATTRIBUTE.indexOf(beforeString) > -1) {
							_$this.attr(attribute, _ATTRIBUTE.replaceAll(beforeString, afterString));
						}
					});
				},

				/**
				 * @name 텍스트 치환
				 * @description 지정한 객체의 텍스트 내용을 바꿔 줍니다.
				 * @since 2017-01-16
				 * @param {string} beforeString
				 * @param {string} afterString
				 */
				replaceText : function(beforeString, afterString) {
					return this.each(function() {
						var _$this = $(this),
							_TEXT = _$this.text();

						if(_TEXT.indexOf(beforeString) > -1) {
							_$this.text(_TEXT.replaceAll(beforeString, afterString));
						}
					});
				},

				/**
				 * @name 특정글자 삭제
				 * @description 지정한 객체의 텍스트 내용을 공백으로 바꿔 줍니다.
				 * @since 2017-01-16
				 * @param {string} string
				 */
				removeString : function(string) {
					return this.each(function() {
						var _$this = $(this),
							_HTML_CODE = _$this.html();

						_$this.html(_HTML_CODE.replaceAll(string, ""));
					});
				},

				/**
				 * @name 이벤트 종료 후 콜백
				 * @description 지정한 객체의 이벤트가 종료되면 콜백을 호출 합니다.
				 * @param {string} event
				 * @param {function} callback
				 * @param {number} sensitivity
				 */
				eventEnd : function(event, callback, sensitivity) {
					var eventCount = 0;

					sensitivity = sensitivity || 500;
					event = event.split(/\s/g);
					eventCount = event.length;

					return this.each(function() {
						var _$this = $(this),
							_i = 0,
							_eventSplit = [],
							_eventNameSpaceToFirstLetterUpperCase = "",
							_point = "";

						for(; _i < eventCount; _i++) {
							_eventSplit = event[_i].split(".");
							_eventSplit[1] = (_eventSplit[1]) ? _eventSplit[1] : "";
							_point = (_eventSplit[1]) ? "." : "";
							_eventNameSpaceToFirstLetterUpperCase = _eventSplit[1].toFirstLetterUpperCase();
							$.eventEnd.index++;
							$.eventEnd[$.eventEnd.index] = {
								jqueryObject : _$this,
								sensitivity : sensitivity,
								eventName : _eventSplit[0] + _point + _eventSplit[1],
								setTimeoutName : _eventSplit[0] + _eventNameSpaceToFirstLetterUpperCase + "End",
								callbackName : _eventSplit[0] +_eventNameSpaceToFirstLetterUpperCase + "Callback"
							};

							_$this.on($.eventEnd[$.eventEnd.index].eventName, function(event) {
								var _this = this,
									_eventName = event.type + "." + event.handleObj.namespace,
									_index = "",
									_j = 0;
								
								for(_j in $.eventEnd) {
									if($.eventEnd[_j].eventName == _eventName) {
										break;
									}
								}
								if(_this[$.eventEnd[_j].setTimeoutName]) {
									clearTimeout(_this[$.eventEnd[_j].setTimeoutName]);
									_this[$.eventEnd[_j].setTimeoutName] = 0;
								}

								this[$.eventEnd[_j].setTimeoutName] = setTimeout(function() {
									if(typeof callback == "function") {
										_this[$.eventEnd[_j].callbackName] = callback;
										_this[$.eventEnd[_j].callbackName](event);
									}
								}, $.eventEnd[_j].sensitivity);
							});
						}
					});
				},
				
				/**
				 * @name 이벤트 종료 후 콜백 멈춤
				 * @description 지정한 객체에 이벤트 종료시 발생되던 콜백을 중단 합니다.
				 * @param {string} eventName
				 */
				eventEndStop : function(eventName) {
					return this.each(function() {
						var _$this = $(this),
							_i = 0;

						for(_i in $.eventEnd) {
							if($.eventEnd[_i].jqueryObject && $.eventEnd[_i].jqueryObject.length && _$this.is($.eventEnd[_i].jqueryObject) && $.eventEnd[_i].eventName == eventName) {
								$.eventEnd[_i].jqueryObject.off($.eventEnd[_i].eventName);
								clearTimeout($.eventEnd[_i].jqueryObject[0][$.eventEnd[_i].setTimeoutName]);
								$.eventEnd[_i].jqueryObject[0][$.eventEnd[_i].setTimeoutName] = 0;
								$.eventEnd[_i].jqueryObject[0][$.eventEnd[_i].callbackName] = undefined;
								delete $.eventEnd[_i];
							}
						}
					});
				}
			});

			//제이쿼리UI가 없으면
			if(!$.ui) {
				/**
				 * @name 포커스를 가진 태그 셀렉터, 탭으로 접근 가능한 태그 셀랙터
				 * @lincense jQuery UI - v1.12.1
				 * @since 2017-01-16
				 */

				/**
				 * @name 포커스를 가지고 있는지 확인
				 * @description 지정한 노드가 포커스를 가졌는지 확인 합니다.
				 * @return {boolean}
				 */
				 $.focusable = function(element, hasTabindex) {
					var map,
						mapName,
						img,
						focusableIfVisible,
						fieldset,
						nodeName = element.nodeName.toLowerCase();

					if("area" === nodeName) {
						map = element.parentNode;
						mapName = map.name;

						if(!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
							return false;
						}

						img = $("img[usemap='#" + mapName + "']");

						return img.length > 0 && img.is(":visible");
					}

					if(/^(input|select|textarea|button|object)$/.test(nodeName)) {
						focusableIfVisible = !element.disabled;

						if(focusableIfVisible) {
							fieldset = $(element).closest("fieldset")[0];

							if(fieldset) {
								focusableIfVisible = !fieldset.disabled;
							}
						}
					}else if("a" === nodeName) {
						focusableIfVisible = element.href || hasTabindex;
					}else{
						focusableIfVisible = hasTabindex;
					}

					return focusableIfVisible && $(element).is(":visible") && $.visible($(element));
				};

				/**
				 * @name 포커스를 가진 태그 셀렉터, 탭으로 접근 가능한 태그 셀랙터
				 * @description 지정한 객체가 포커스가 있으면 접근 가능 합니다., 지정한 객체가 탭으로 접근이 가능하면 접근 가능 합니다.
				 */
				$.extend($.expr[":"], {
					focusable : function(element) {
						return $.focusable(element, $.attr(element, "tabindex") != null);
					},

					tabbable : function(element) {
						var tabIndex = $.attr(element, "tabindex"),
							hasTabindex = tabIndex != null;

						return (!hasTabindex || tabIndex >= 0) && $.focusable(element, hasTabindex);
					}
				});

				/**
				 * @description IE8은 계산 된 값에 대한 표시 / 숨김으로 상속을 해결하지 않습니다.
				 */
				$.visible = function(element) {
					var visibility = element.css("visibility");

					while(visibility == "inherit") {
						element = element.parent();
						visibility = element.css("visibility");
					}

					return visibility != "hidden";
				};
			}

			/**
			 * @name document 준비 후
			 * @description css, js, image, iframe, 외부URL 등이 작동하기 이전에 발생될 이벤트를 정의하는 부분입니다.
			 * @since 2017-01-16
			 */
			$.tags.dcmt.ready(function() {
				Kit.info.documentReady = true;

				/**
				 * @description Kit.info.scrollBarWidth에 현재 접속한 브라우저의 스크롤바 넓이를 입력 합니다.
				 * @since 2017-01-16
				 */
				Kit.info.scrollBarWidth = Kit.browser.scrollBar.getWidth();

				/**
				 * @description 제이쿼리 셀렉터를 정의하는 공간입니다.
				 */
				$.tags.wildCard = $("*");
				$.tags.tabbableWildCard = $.tags.wildCard.find(":tabbable");
				$.tags.html = $("html");
				$.tags.head = $("head");
				$.tags.body = $("body");
				$.tags.bodyWildCard = $.tags.body.find("*");
				$.tags.loaded = $(".loaded");
			});

			/**
			 * @name window 로드 후
			 * @description css, js, image, iframe, 외부URL 등이 작동한 후 발생될 이벤트를 정의하는 부분입니다.
			 * @since 2017-01-16
			 */
			$.tags.wdw.load(function() {
				Kit.info.windowLoad = true;

				/**
				 * @name 로드 후 클래스
				 * @description 페이지 애니메이션을 위해 써야 합니다.
				 */
				$.tags.loaded.addClass("active");
				$.tags.loaded.removeClass("loaded");
			});
			
			/**
			 * @name 시간정의
			 * @description 서버시간, 문서 준비된 시간, 윈도우 로드 후 시간을 Kit.info에 정의 합니다. 서버시간은 로드 후 계속 갱신 됩니다.
			 * @since 2017-01-16
			 */
			$.ajax({
				type : "GET",
				url : window.location.href,
				success : function(data, textStatus, xhr) {
					var _documentReady = false,
						_windowLoad = false,
						_REALTIME_INTERVAL_MILLISECONDS = 1000;

					Kit.info.serverDate = new Date(xhr.getResponseHeader("Date"));

					Kit.realTimeInterval = setInterval(function() {
						Kit.info.serverDate = new Date(Kit.info.serverDate.setTime(Kit.info.serverDate.getTime() + _REALTIME_INTERVAL_MILLISECONDS));
						
						if(Kit.info.documentReady && !_documentReady) {
							Kit.info.documentReadyDate = Kit.info.serverDate;
							_documentReady = true;
						}
						
						if(Kit.info.windowLoad && !_windowLoad) {
							Kit.info.windowLoadDate = Kit.info.serverDate;
							_windowLoad = true;

							//서버시간 갱신을 멈출려면 아래주석을 풀어주세요.
							clearInterval(Kit.realTimeInterval);
						}
					}, _REALTIME_INTERVAL_MILLISECONDS);
				}
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}