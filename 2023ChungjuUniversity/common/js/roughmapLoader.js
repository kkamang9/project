(function(){
    var c=(location.protocol=="https:")?"https:":"http:";
    var a="1609191508";
    if(window.daum&&window.daum.roughmap&&window.daum.roughmap.cdn){
        return
    }window.daum=window.daum||{};
    window.daum.roughmap={
        cdn:a,URL_KEY_DATA_LOAD_PRE:c+"//t1.daumcdn.net/roughmap/",url_protocal:c
    };
    var b=c+"//s1.daumcdn.net/svc/attach/U0301/cssjs/place-map/"+a+"/roughmapLander.js";
    document.write('<script charset="UTF-8" src="'+b+'"><\/script>')
})();