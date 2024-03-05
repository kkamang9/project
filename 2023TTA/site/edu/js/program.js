(function ($) {
    'use strict';
    $(function () {
        //여기서부터 코드 작성해주세요

        //레이어 팝업 시작
        var $PLayerDiv = $('.p_layer_div');
        $PLayerDiv.each(function(){
            var $this = $(this),
                $PLayerSpan = $this.find('.p_layer_span'),
                $PLayerBtn = $PLayerSpan.find('button.p_layer_btn');
            $PLayerBtn.on('click', function(){
                var $MyBtn = $(this),
                    $MyPLayerSpan = $MyBtn.parent('.p_layer_span'),
                    $MyPLayerDiv = $MyPLayerSpan.parent('.p_layer_div'),
                    $MyPLayerInner = $MyPLayerSpan.siblings('.p_layer_inner'),
                    $CloneMyPLayerInner = $MyPLayerInner.clone(),
                    $ProgramWrapper = $('#wrapper'),
                    IsPLayerActive = $ProgramWrapper.is('.p_layer_active');
                if(!IsPLayerActive){
                    $MyPLayerDiv.addClass('active');
                    $ProgramWrapper.addClass('p_layer_active');
                    $ProgramWrapper.prepend('<div class="p_layer"></div>');
                    $MyPLayerDiv.append($MyPLayerInner);
                    $ProgramWrapper.find('.p_layer').append($CloneMyPLayerInner);
                    $ProgramWrapper.find('.p_layer').find('button.close_layer_btn').focus();
                }
            });
        });
        $(document).on('click', 'button.close_layer_btn', function(){
            var $this = $(this),
                $ProgramWrapper = $('#wrapper'),
                $ActivePLayerDiv = $ProgramWrapper.find('.p_layer_div.active'),
                $ActivePLayerBtn = $ActivePLayerDiv.find('button.p_layer_btn'),
                $PLayer = $ProgramWrapper.find('.p_layer'),
                IsPlayerDivActive = $PLayerDiv.is('.active');
            $ProgramWrapper.removeClass('p_layer_active');
            if(IsPlayerDivActive){
                $PLayerDiv.removeClass('active');
            }
            $PLayer.remove();
            $ActivePLayerBtn.focus();
        });
        $(document).on('click', 'button.close_type', function(){
            var $this = $(this),
                $ProgramWrapper = $('#wrapper'),
                $ActivePLayerDiv = $ProgramWrapper.find('.p_layer_div.active'),
                $ActivePLayerBtn = $ActivePLayerDiv.find('button.p_layer_btn'),
                $PLayer = $ProgramWrapper.find('.p_layer'),
                IsPlayerDivActive = $PLayerDiv.is('.active');
            $ProgramWrapper.removeClass('p_layer_active');
            if(IsPlayerDivActive){
                $PLayerDiv.removeClass('active');
            }
            $PLayer.remove();
            $ActivePLayerBtn.focus();
        });
        //레이어 팝업 끝

        //출력 공통 시작
        var $PrintWrapper = $('#wrapper'),
            $PrintBox = $('.print_box');
        $PrintBox.each(function(){
            var $this = $(this),
                $EduSpan = $this.find('.edu_btn'),
                $EduBtn = $EduSpan.find('button.btn');
            $EduBtn.on('click', function(){
                var $MyBtn = $(this),
                    $MyEduSpan = $MyBtn.parent('.edu_btn'),
                    $PrintWrap = $MyEduSpan.siblings('.print_wrap'),
                    $ClonePrintWrap = $PrintWrap.clone();
                $PrintWrapper.prepend('<div class="print_layer"></div>');
                $PrintWrapper.addClass('print_active');
                $PrintWrapper.find('.print_layer').append($ClonePrintWrap);
                window.print();
            });
            window.onafterprint = function(){
                $PrintWrapper.find('.print_layer').remove();
                $PrintWrapper.removeClass('print_active');
                window.close();
            }
        });
        //출력 공통 끝

        //신용카드, 무통장입금 체크 시 동의 버튼 타입 변경 시작
        var $PayRadio = $('.pay_radio');
        $PayRadio.each(function(){
            var $this = $(this);
            $this.on('click', function(){
                var $MyRadio = $(this),
                    $MyTable = $MyRadio.parents('.table'),
                    $PayTypeBox = $MyTable.siblings('.pay_type_box'),
                    $PayTypeBtn = $PayTypeBox.find('.pay_type_btn'),
                    $MooTong = $MyTable.siblings('.mootong'),
                    PayType1 = $MyRadio.is('.pay_type1'),
                    PayType2 = $MyRadio.is('.pay_type2');
                if(PayType1){
                    $PayTypeBox.removeClass('pay_type2').addClass('pay_type1');
                    $PayTypeBtn.removeClass('pay_type2').addClass('pay_type1');
                    $MooTong.removeClass('active');
                }
                if(PayType2){
                    $PayTypeBox.removeClass('pay_type1').addClass('pay_type2');
                    $PayTypeBtn.removeClass('pay_type1').addClass('pay_type2');
                    $MooTong.addClass('active');
                }
            });
        });
        //신용카드, 무통장입금 체크 시 동의 버튼 타입 변경 끝

        //할인형태 세크 시 타입 변경 시작
        var $SaleRadio = $('.sale_radio');
        $SaleRadio.each(function(){
            var $this = $(this);
            $this.on('click', function(){
                var $MyRadio = $(this),
                    $MyEduForm = $MyRadio.parent('.edu_form'),
                    $OtherEduForm = $MyEduForm.siblings('.edu_form'),
                    $MyEduProCell = $MyEduForm.parent('.edu_pro_cell'),
                    $MyTd = $MyEduProCell.parent('td'),
                    $MyTr = $MyTd.parent('tr'),
                    $PayTypeTr = $MyTr.siblings('tr.pay_type_tr'),
                    IsActive = $MyEduForm.is('.active'),
                    $MyTable = $MyRadio.parents('.table'),
                    $PayTypeBox = $MyTable.siblings('.pay_type_box'),
                    $PayTypeBtn = $PayTypeBox.find('.pay_type_btn'),
                    $MooTong = $MyTable.siblings('.mootong');
                if(!IsActive){
                    $OtherEduForm.removeClass('active');
                    $MyEduForm.addClass('active');
                    var Nomarl = $MyEduForm.is('.nomarl'),
                        MOU = $MyEduForm.is('.mou'),
                        Busi = $MyEduForm.is('.busi'),
                        Student = $MyEduForm.is('.student');
                    //일반(할인제외)
                    if(Nomarl){
                        $MyTd.addClass('nomarl').removeClass('mou busi student');
                        $PayTypeTr.removeClass('none');
                        $PayTypeBtn.removeClass('pay_type_student');
                    }
                    //MOU
                    if(MOU){
                        $MyTd.addClass('mou').removeClass('nomarl busi student');
                        $PayTypeTr.removeClass('none');
                        $PayTypeBtn.removeClass('pay_type_student');
                    }
                    //표준화사업참가자
                    if(Busi){
                        $MyTd.addClass('busi').removeClass('nomarl mou student');
                        $PayTypeTr.removeClass('none');
                        $PayTypeBtn.removeClass('pay_type_student');

                    }
                    //학생
                    if(Student){
                        $MyTd.addClass('student').removeClass('nomarl mou busi');
                        $PayTypeTr.addClass('none');
                        $PayTypeBtn.addClass('pay_type_student');
                        $('.pay_radio.pay_type1').click();
                        $MooTong.removeClass('active');
                    }
                }
            });
        });
        //할인형태 세크 시 타입 변경 끝

        //무통장 입금 시 개인수강 및 회사지원 선택 시 타입 변경 시작
        var $PersonRadio = $('.person_radio');
        $PersonRadio.each(function(){
            var $this = $(this);
            $this.on('click', function(){
                var $MyRadio = $(this),
                    $MyEduForm = $MyRadio.parent('.edu_form'),
                    $MyEduProCell = $MyEduForm.parent('.edu_pro_cell'),
                    $MyTd = $MyEduProCell.parent('td'),
                    $MyTr = $MyTd.parent('tr'),
                    $PersonTypeTr = $MyTr.siblings('tr.person_type_tr'),
                    IsPeoPle = $MyRadio.is('.people'),
                    IsComPany = $MyRadio.is('.company');
                if(IsComPany){
                    $PersonTypeTr.removeClass('none');
                }
                else{
                    $PersonTypeTr.addClass('none');
                }
            });
        });

        //무통장 입금 시 개인수강 및 회사지원 선택 시 타입 변경 끝

        //유료화면에서 동의 클릭 시 신청됨 문구 표출 시작
        $(document).on('click', '.p_layer .pay_inner button.pay_type_btn', function(){
            var $this = $(this),
                PayType1 = $this.is('.pay_type1'),
                PayType2 = $this.is('.pay_type2'),
                PayTypeStudent = $this.is('.pay_type_student'),
                $MyEduSpan = $this.parent('.edu_btn'),
                $MyBtnBox = $MyEduSpan.parent('.btn_box'),
                $MyPayInner = $MyBtnBox.parent('.pay_inner'),
                IsSuccessActive = $MyPayInner.is('.success_active');
            if(!IsSuccessActive){
                if(PayType1){
                    if(PayTypeStudent){
                        $MyPayInner.addClass('success_active');
                    }
                    else{
                        alert('결제창으로 이동됩니다');
                        $MyPayInner.addClass('success_active');
                    }
                }
                else if(PayType2){
                    $MyPayInner.addClass('success_active');
                }
                else if(PayTypeStudent){
                    $MyPayInner.addClass('success_active');
                }
                else{
                    alert('결제형태를 선택해주세요');
                }
            }
        });
        //유료화면에서 동의 클릭 시 신청됨 문구 표출 끝

        //무료화면에서 동의 클릭 시 신청됨 문구 표출 시작
        $(document).on('click', '.p_layer .free_inner button.free_type_btn', function(){
            var $this = $(this),
                $MyEduSpan = $this.parent('.edu_btn'),
                $MyBtnBox = $MyEduSpan.parent('.btn_box'),
                $MyFresInner = $MyBtnBox.parent('.free_inner'),
                IsSuccessActive = $MyFresInner.is('.success_active');
            console.log('test');
            if(!IsSuccessActive){
                $MyFresInner.addClass('success_active');
            }
        });
        //무료화면에서 동의 클릭 시 신청됨 문구 표출 끝
    });
})(jQuery);