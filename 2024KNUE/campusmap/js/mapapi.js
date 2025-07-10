var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(36.61017838775379, 127.35929464987605), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var $info_list = $('.map_content_wrap .map_info_wrap .info_box .info_list'),
    infolist_Html = $info_list.html(),
    $DataBox = $('.map_content_wrap .map_info_wrap .databox');
$DataBox.html(infolist_Html);

var markers = [];
var kakaomarkers = [];
var customOverlay;
var KaKaoOverlays = [];

function changeMarkers() {

    if(customOverlay) {
        customOverlay.setMap(null);
    }
    kakaomarkers = [];
    KaKaoOverlays = [];
    markers.forEach(function(element, index, array){
        var Title = markers[index].title,
            latitude = markers[index].latitude,
            longtitude = markers[index].longtitude;
        var iwcontent =
            '<div data-index="'+index+'" class="customoverlay item_'+index+'">' +
            '<div class="overlaybox">'+
            '<button type="button" class="titlebox"><span class="title">'+(index+1)+'</span></button>'+
            '</div>'+
            '<button type="button" onclick="closeOverlay('+index+');" class="close_overlay">닫기</button>'+
            '</div>';
        customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: new kakao.maps.LatLng(latitude, longtitude),
            content: iwcontent,
            yAnchor: 1
        });
        KaKaoOverlays.push(customOverlay);

    });
}
function closeOverlay(IDX) {
    KaKaoOverlays[IDX].setMap(null);
}
function closeOverlayAll() {
    for (var i = 0; i < KaKaoOverlays.length; i++) {
        KaKaoOverlays[i].setMap(null);
    }
}

function relayout() {
    setTimeout(function(){
        map.relayout();
    }, 300);
}

var SearchCount = 0;
$(function() {
    // 사이드메뉴 버튼 스크립트 시작
    var $mapContentWrap = $('.map_content_wrap'),
        $sideOpenBtn = $mapContentWrap.find('.map_info_wrap .side_open_box .btn');
    $sideOpenBtn.on('click',function(){
        if($mapContentWrap.is('.side_closed') === true){
            $mapContentWrap.removeClass('side_closed');
            $(this).attr('title','사이드메뉴 닫기');
        } else if($mapContentWrap.is('.side_closed') === false){
            $mapContentWrap.addClass('side_closed');
            $(this).attr('title','사이드메뉴 열기');
        }
        relayout();
    });
    // 사이드메뉴 버튼 스크립트 끝

    markers = [];
    var $infoItems = $info_list.find('.info_item');
    $infoItems.each(function(){
        var $this = $(this),
            $location_btn = $this.find('.link'),
            thisTitle = $location_btn.find('.text').text(),
            thislatitude = $location_btn.attr('data-latitude'),
            thislongtitude = $location_btn.attr('data-longtitude'),
            thisImage = $location_btn.attr('data-image'),
            thisdescription = $location_btn.attr('data-description'),
            thishomepage = $location_btn.attr('data-homepage'),
            thislocation = $location_btn.attr('data-location'),
            thistel = $location_btn.attr('data-tel'),

            //2024.05.17. 추가 시작
            thislisttext = $location_btn.attr('data-listtext');
        //2024.05.17. 추가 끝

        markers.push({
            title:thisTitle,
            latlng:new kakao.maps.LatLng(thislatitude, thislongtitude),
            latitude:thislatitude,
            longtitude:thislongtitude,
            image:thisImage,
            description:thisdescription,
            homepage:thishomepage,
            Location:thislocation,
            Tel:thistel,

            //2024.05.17. 추가 시작
            ListText : thislisttext
            //2024.05.17. 추가 끝
        });
    });
    changeMarkers();

    //검색
    $('.search_box .button_box.submit .btn').on('click', function(){
        var $this = $(this),
            $mapSearch = $('#mapSearch'),
            mapSearchVal = $mapSearch.val(),
            ActiveItemLength = $info_list.find('.info_item .link.active').length;
        if(!mapSearchVal){//검색어 없이 검색버튼 눌렀을때 전체 다시 로딩
            if(ActiveItemLength>0){
                $('.mapbox .detail_layer .close.in').click();
            }
            $info_list.empty().html($DataBox.html());
            closeOverlayAll();
            markers = [];
            $info_list.find('.info_item').each(function(){
                var $this = $(this),
                    $location_btn = $this.find('.link'),
                    thisTitle = $location_btn.find('.text').text(),
                    thislatitude = $location_btn.attr('data-latitude'),
                    thislongtitude = $location_btn.attr('data-longtitude'),
                    thisImage = $location_btn.attr('data-image'),
                    thisdescription = $location_btn.attr('data-description'),
                    thishomepage = $location_btn.attr('data-homepage'),
                    thislocation = $location_btn.attr('data-location'),
                    thistel = $location_btn.attr('data-tel'),

                    //2024.05.17. 추가 시작
                    thislisttext = $location_btn.attr('data-listtext');
                //2024.05.17. 추가 끝
                markers.push({
                    title:thisTitle,
                    latlng:new kakao.maps.LatLng(thislatitude, thislongtitude),
                    latitude:thislatitude,
                    longtitude:thislongtitude,
                    image:thisImage,
                    description:thisdescription,
                    homepage:thishomepage,
                    Location:thislocation,
                    Tel:thistel,

                    //2024.05.17. 추가 시작
                    ListText : thislisttext
                    //2024.05.17. 추가 끝
                });
            });
            changeMarkers();
        } else{//검색어가 있을때
            $('.databox2').empty();
            SearchCount = 0;
            $DataBox.find('.info_item').each(function(){
                var $this = $(this),
                    $location_btn = $this.find('.link'),
                    thisTitle = $location_btn.find('.text').text(),
                    Isincludes = thisTitle.indexOf(mapSearchVal);
                if(Isincludes != -1){
                    $('.databox2').append($this.clone());
                    SearchCount = SearchCount+1;
                }
            });
            if(SearchCount==0){
                alert('입력하신 시설명이 없습니다.');
            } else{
                if(ActiveItemLength>0){
                    $('.mapbox .detail_layer .close.in').click();
                }
                $info_list.empty().html($('.databox2').html());
                closeOverlayAll();
                markers = [];
                $info_list.find('.info_item').each(function(){
                    var $this = $(this),
                        ThisIndex = $this.index(),
                        $location_btn = $this.find('.link'),
                        $Num = $location_btn.find('.number span'),
                        thisTitle = $location_btn.find('.text').text(),
                        thislatitude = $location_btn.attr('data-latitude'),
                        thislongtitude = $location_btn.attr('data-longtitude'),
                        thisImage = $location_btn.attr('data-image'),
                        thisdescription = $location_btn.attr('data-description'),
                        thishomepage = $location_btn.attr('data-homepage'),
                        thislocation = $location_btn.attr('data-location'),
                        thistel = $location_btn.attr('data-tel'),

                        //2024.05.17. 추가 시작
                        thislisttext = $location_btn.attr('data-listtext');
                    //2024.05.17. 추가 끝
                    $Num.text(ThisIndex+1);
                    markers.push({
                        title:thisTitle,
                        latlng:new kakao.maps.LatLng(thislatitude, thislongtitude),
                        latitude:thislatitude,
                        longtitude:thislongtitude,
                        image:thisImage,
                        description:thisdescription,
                        homepage:thishomepage,
                        Location:thislocation,
                        Tel:thistel,

                        //2024.05.17. 추가 시작
                        ListText:thislisttext
                        //2024.05.17. 추가 끝
                    });
                });
                changeMarkers();
            }
        }
    });

    $('#mapSearch').keydown(function (e) {
        if(e.keyCode == 13) {
            // enter key(13) 눌렀을 때 이벤트
            $('.search_box .button_box.submit .btn').click();
        }
    });

    var $detail_layer = $('.detail_layer'),
        $layerTitle = $detail_layer.find('.titlebox .title'),
        $layerphotoBox = $detail_layer.find('.photobox'),
        $layerphoto = $detail_layer.find('.photo'),
        $layerInnerphoto = $detail_layer.find('.inner_photo'),
        $layerdescriptionbox = $detail_layer.find('.descriptionbox'),
        $layerhomepage = $detail_layer.find('.listitem.homepage'),
        $layerhomepageLink = $layerhomepage.find('.link'),
        $layerlocation = $detail_layer.find('.listitem.location'),
        $layerlocationText = $layerlocation.find('.text'),
        $layertel = $detail_layer.find('.listitem.tel'),
        $layerteltext = $detail_layer.find('.phonetext'),
        $layerClose = $detail_layer.find('.close'),
        $layerCloseIn = $detail_layer.find('.close.in'),
        $FocusPoint,

        //2024.05.17. 추가 시작
        $layerlisttext = $detail_layer.find('.listitem.listtext'),
        $layerlisttext_list_text = $detail_layer.find('.list_text');
    //2024.05.17. 추가 끝

    $(document).on('click', '.map_info_wrap .info_box .info_list .info_item .link', function() {
        var $this = $(this),
            $MyParent = $this.parent('.info_item'),
            ParentIndex = $MyParent.index(),
            IsActive = $this.is('.active'),
            $OtherParents = $MyParent.siblings('.info_item'),
            $OtherBtns = $OtherParents.find('.link'),
            thisTitle = $this.find('.text').text(),
            thislatitude = $this.attr('data-latitude'),
            thislongtitude = $this.attr('data-longtitude'),
            thisImageUrl = $this.attr('data-image'),
            thisdescription = $this.attr('data-description'),
            thishomepage = $this.attr('data-homepage'),
            thislocation = $this.attr('data-location'),
            thistel = $this.attr('data-tel'),
            thisImage = '<img src="'+thisImageUrl+'" alt="'+thisTitle+' 사진" />',
            $MyOverlay = $('.map_content_wrap .map_view_wrap .mapbox').find('.customoverlay[data-index="'+ParentIndex+'"]'),
            $MyOverlayBtn = $MyOverlay.find('.titlebox'),
            $AllOverlays = $('.map_content_wrap .map_view_wrap .mapbox').find('.customoverlay').not($MyOverlay),
            $AllOverlayBtns = $AllOverlays.find('.titlebox'),

            //2024.05.17. 추가 시작
            thislisttext = $this.attr('data-listtext'),
            $thisListTextDivUlHtml = $this.siblings('.list_text').find('ul').clone();
        //2024.05.17. 추가 끝

        if(!IsActive){
            $OtherBtns.removeClass('active').removeAttr('title');
            $this.addClass('active').attr('title', '선택됨');
            $AllOverlays.removeClass('active');
            $AllOverlayBtns.removeAttr('title');
            $MyOverlay.addClass('active');
            $MyOverlayBtn.attr('title', '선택됨');
            $layerTitle.text(thisTitle);
            $layerphotoBox.removeClass('active');
            $layerphoto.empty();
            $layerInnerphoto.removeAttr('style');
            $layerdescriptionbox.removeClass('active').empty();
            $layerhomepage.removeClass('active');
            $layerhomepageLink.attr('href', '').empty();
            $layerlocation.removeClass('active');
            $layerlocationText.empty();
            $layertel.removeClass('active');
            $layerteltext.empty();

            //2024.05.17. 추가 시작
            $layerlisttext.removeClass('active');
            $layerlisttext_list_text.empty();
            //2024.05.17. 추가 끝
            if(thisImageUrl){
                $layerphotoBox.addClass('active');
                $layerphoto.append(thisImage);
                $layerInnerphoto.css('background-image', 'url('+thisImageUrl+')');
            }
            if(thisdescription){
                $layerdescriptionbox.addClass('active').text(thisdescription);
            }
            if(thishomepage){
                $layerhomepage.addClass('active');
                $layerhomepageLink.attr('href', thishomepage).text(thishomepage);
            }
            if(thislocation){
                $layerlocation.addClass('active');
                $layerlocationText.text(thislocation);
            }
            if(thistel){
                $layertel.addClass('active');
                $layerteltext.text(thistel);
            }

            //2024.05.17. 추가 시작
            if(thislisttext){
                $layerlisttext.addClass('active');
                $layerlisttext_list_text.append($thisListTextDivUlHtml);
            }
            //2024.05.17. 추가 끝

            $detail_layer.fadeIn();
            $layerCloseIn.focus();
            $FocusPoint = $this;
        }
    });
    $(document).on('click', '.mapbox .customoverlay .overlaybox .titlebox', function() {
        var $this = $(this),
            $ThisOverlay = $this.parents('.customoverlay'),
            ThisIndex = $ThisOverlay.attr('data-index'),
            $MyParent = $info_list.find('.info_item').eq(ThisIndex),
            $MyBtn = $MyParent.find('.link'),
            IsActive = $MyBtn.is('.active'),
            $OtherParents = $MyParent.siblings('.info_item'),
            $OtherBtns = $OtherParents.find('.link'),
            thisTitle = $MyBtn.find('.text').text(),
            thislatitude = $MyBtn.attr('data-latitude'),
            thislongtitude = $MyBtn.attr('data-longtitude'),
            thisImageUrl = $MyBtn.attr('data-image'),
            thisdescription = $MyBtn.attr('data-description'),
            thishomepage = $MyBtn.attr('data-homepage'),
            thislocation = $MyBtn.attr('data-location'),
            thistel = $MyBtn.attr('data-tel'),
            thisImage = '<img src="'+thisImageUrl+'" alt="'+thisTitle+' 사진" />',
            $AllOverlays = $('.map_content_wrap .map_view_wrap .mapbox').find('.customoverlay').not($ThisOverlay),
            $AllOverlayBtns = $AllOverlays.find('.titlebox'),

            //2024.05.17. 추가 시작
            thislisttext = $MyBtn.attr('data-listtext'),
            $thisListTextDivUlHtml = $MyBtn.siblings('.list_text').find('ul').clone();
        //2024.05.17. 추가 끝
        if(!IsActive){
            $OtherBtns.removeClass('active').removeAttr('title');
            $MyBtn.addClass('active').attr('title', '선택됨');
            $AllOverlays.removeClass('active');
            $AllOverlayBtns.removeAttr('title');
            $ThisOverlay.addClass('active');
            $this.attr('title', '선택됨');
            $layerTitle.text(thisTitle);
            $layerphotoBox.removeClass('active');
            $layerphoto.empty();
            $layerInnerphoto.removeAttr('style');
            $layerdescriptionbox.removeClass('active').empty();
            $layerhomepage.removeClass('active');
            $layerhomepageLink.attr('href', '').empty();
            $layerlocation.removeClass('active');
            $layerlocationText.empty();
            $layertel.removeClass('active');
            $layerteltext.empty();

            //2024.05.17. 추가 시작
            $layerlisttext.removeClass('active');
            $layerlisttext_list_text.empty();
            //2024.05.17. 추가 끝

            if(thisImageUrl){
                $layerphotoBox.addClass('active');
                $layerphoto.append(thisImage);
                $layerInnerphoto.css('background-image', 'url('+thisImageUrl+')');
            }
            if(thisdescription){
                $layerdescriptionbox.addClass('active').text(thisdescription);
            }
            if(thishomepage){
                $layerhomepage.addClass('active');
                $layerhomepageLink.attr('href', thishomepage).text(thishomepage);
            }
            if(thislocation){
                $layerlocation.addClass('active');
                $layerlocationText.text(thislocation);
            }
            if(thistel){
                $layertel.addClass('active');
                $layerteltext.text(thistel);
            }

            //2024.05.17. 추가 시작
            if(thislisttext){
                $layerlisttext.addClass('active');
                $layerlisttext_list_text.append($thisListTextDivUlHtml);
            }
            //2024.05.17. 추가 끝


            $detail_layer.fadeIn();
            $layerCloseIn.focus();
            $FocusPoint = $this;
        }
    });
    $layerClose.on('click', function(){
        var $this = $(this),
            $AllOverlays = $('.map_content_wrap .map_view_wrap .mapbox').find('.customoverlay'),
            $AllOverlayBtns = $AllOverlays.find('.titlebox');
        $AllOverlays.removeClass('active');
        $AllOverlayBtns.removeAttr('title');
        $detail_layer.fadeOut(function(){
            $('.map_info_wrap .info_box .info_list .info_item .link').removeClass('active').removeAttr('title');
            $layerTitle.empty();
            $layerphotoBox.removeClass('active');
            $layerphoto.empty();
            $layerInnerphoto.removeAttr('style');
            $layerdescriptionbox.removeClass('active').empty();
            $layerhomepage.removeClass('active');
            $layerhomepageLink.attr('href', '').empty();
            $layerlocation.removeClass('active');
            $layerlocationText.empty();
            $layertel.removeClass('active');
            $layerteltext.empty();
            $FocusPoint.focus();

            //2024.05.17. 추가 시작
            $layerlisttext.removeClass('active');
            $layerlisttext_list_text.empty();
            //2024.05.17. 추가 끝
        });
    });
});