var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var wsc_top = 0
var menu_height = 0
var msg_area = 'guest'
var msg_idx = 0
var msg_root = 0


$(window).bind('scroll', function() {

    wsc_top = parseInt($(window).scrollTop())

    // POPUP LAYER OFF TRIGGERS
    //if ($('#bank_popup').css('display') != 'none') mask(0)
    if ($('#photo_view_menu').css('display') != 'none') mask(0)
    if ($('#reply_form').css('display') != 'none') mask(0)

})


$(function() {

    // 쿠키 없으면 설정아이콘 노출
    if ($.cookie('setting_click_check') == "check") {
        $('.home_settiong_wrapper').css('opacity', 0)
    }
    else {
        $('.home_settiong_wrapper').css('opacity', 1)
    }

    // 하단 설정하기 메뉴 쿠키 저장값
    $('#tail_button_config').on('click', function() {
        $.cookie('setting_click_check', 'check')
    })

    // 설정 아이콘 클릭 트리거
    $('.home_settiong_btn').on('click' , function() {
        $('body, html').animate({scrollTop : ($('#tail_button_config').offset().top)}, 600);
        $('.home_settiong_wrapper').hide()
        $('.setting_fade').addClass('on')
    })


    // 마스크영역 클릭시 끄기 트리거
    $('#mask').bind('click', function() {
        if (mask_release_allow == true && $(this).css('opacity') > 0.1) {
            if ($('#mcni_wrapper').css('display') != 'none') {
                $('body').css('height', $(document).height() + 'px')
            }
            mask(0)
        }
    })

    // 입력폼 자동완성 끄기
    $('form').each(function() {
        $(this).attr('autocomplete', 'off')
    })

    // 입력상자 크기 자동조절 트리거
    $('textarea').bind('keyup', function(e) {
        textarea_resize($(this))
    })


    /* ==========================================
                        CONTACT
    =============================================*/

    $('.contact_button').bind('click', function() {
        mask(0.5)
        var type = $(this).data('type')
        $('#contact_' + type).show()
    })

    $('.contact_row').each(function(){
        //console.log($(this).data('checked'))
    })

    $('.family_group_block').each(function(){
        var side = $(this).data('type')
        var side_row_count = $('.contact_row[data-side='+side+']', this).length
        if (side_row_count == 0) {
            $('.section_content_wrap').removeClass('section_content_wrap_'+side)
            $('.family_group_block').addClass('family_group_block_'+side) // contact border
        } else {
            $('.section_content_wrap').addClass('section_content_wrap_'+side)
            $('.family_group_block').removeClass('family_group_block_'+side)
        }

    })

    $('.bank_family_group_block').each(function(){
        var side = $(this).data('type')
        var side_row_count = $('.family_members[data-side='+side+']', this).length
        if (side_row_count == 0) {
            $('.bank_family_group_block').addClass('bank_family_group_block_'+side) // bank border 숨김
        } else {
            $('.bank_family_group_block').removeClass('bank_family_group_block_'+side)
        }

    })

    /* ==========================================
                   갤러리 PHOTO LIST A
    =============================================*/

    //사진 리스트 더 보기 기능
    $('#photo_more_row').on('click', function() {
        $('#photo_more_img').attr('src', './img/loading4.gif')
        setTimeout(function() {
            $('.photo_wrapper').show()
            $('#photo_list_br_upload_row').show()
            $('#photo_more_row').hide()
        }, 450)
    })

    // 보정서비스
    $('#prod_banner1_close_checkbox').on('click', function() {
        $(this).attr('src', '/m/img/200903_01_01-checked.png')
        $.cookie('mcard_prod_banner1_off', 1, {
            expires: 90,
            path: '/'
        })
        $('#prod_banner1').fadeOut()
    })

    /* ==========================================
                갤러리 PHOTO LIST B
    ============================================= */

    var photo_view_swiper
    var photo_thmb_swiper
    var photo_pop_swiper

    // 사진 슬라이드
    photo_view_swiper = new Swiper('#photo_view_swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        on: {
            slideChangeTransitionEnd: function() {
                var page = Math.floor(this.realIndex / 5)
                photo_thmb_swiper.slideTo(page) // 작은 이미지는 나누기 5
                if (photo_pop_swiper) {
                    photo_pop_swiper.slideTo(this.realIndex)
                }
            }
        },
        navigation: {
            nextEl: "#photo_view_next_btn",
            prevEl: "#photo_view_prev_btn",
        },
    })

    // 사진 썸네일 슬라이드
    photo_thmb_swiper = new Swiper("#photo_thmb_swiper-container", {
        slideToClickedSlide: false,
        on: {
            slideChange: function() {
                // 썸네일 그룹(5개묶음) 페이징 오류 회피용. 오류 찾아내서 수정 필요
                $('#photo_thmb_swiper-pagination > span').removeClass('swiper-pagination-bullet-active')
                $('#photo_thmb_swiper-pagination').children().eq(this.activeIndex).addClass('swiper-pagination-bullet-active')
            }
        },

        pagination: {
            el: '#photo_thmb_swiper-pagination',
            clickable: true,
            type: 'bullets'
        },

    })

    // 사진 팝업 슬라이드
    function photo_pop_swiper_init() {
        photo_pop_swiper = new Swiper('#photo_pop_swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            slideToClickedSlide: true,
            on: {
                beforeInit: function() {
                    //console.log('beforeInit fire')
                },
                init: function() {
                    $('#photo_pic_pop_wrapper').hide() // 초기화 이후, 사진 팝업 영역 숨김
                },
                slideChangeTransitionEnd: function() {
                    var page = Math.floor(this.realIndex)
                    photo_view_swiper.slideTo(page)
                }
            },
            navigation: {
                nextEl: "#photo_pop_next_btn",
                prevEl: "#photo_pop_prev_btn",
            },
        })
    }


    var photo_pop_img_now_cnt = 0
    $('.photo_pop_img').on('load', function() { //사진 크게보기
        // do stuff
    }).each(function() {
        if (this.complete) {

            // photo pop image resize
            var photo_pop_img_lr_margin = 30
            var photo_pop_img_top_margin = 100
            if ($(this).width() > nw) {
                $(this).width((nw - photo_pop_img_lr_margin))
                $(this).css('height', 'auto')
            }
            if ($(this).height() > nh) {
                $(this).height(nh - photo_pop_img_top_margin)
                $(this).css('width', 'auto')
            }

            // vertical align middle
            var new_top = (nh - $(this).height()) / 2
            $(this).parent().css('margin-top', new_top)
            $(this).parent().css('width', nw - photo_pop_img_lr_margin)

            // close button location
            if ($(this).parent().width() - $(this).width() > 0) {
                var close_btn_margin = ($(this).parent().width() - $(this).width()) / 2
                $(this).parent().children('.pop_close_btn_wrap').css('right', close_btn_margin + 'px')
            }

            // photo pop swiper initialization
            photo_pop_img_now_cnt++
            if (photo_pop_img_now_cnt == $('.photo_pop_img').length) {
                //photo_pop_swiper_init()
            }

        }
    })

    photo_pop_swiper_init()


    $('.photo_view_slide').on('click', function() { // 갤러리 이미지 클릭 트리거

        $('#photo_pic_pop_wrapper').show()
        $('.photo_pop_img').css('opacity', '1')
        $('.pop_close_btn_wrap').css('opacity', '1')
        $('.pop_bg_layer').fadeIn() // 레이어 배경 보임
        $('body, html').addClass('notScroll')
        $('#photo_view_btn_row').fadeIn()

        //네비게이션 버튼
        setTimeout(function() {
            $('#photo_view_btn_row').hide()
        }, 4000)


    })

    // 사진 크게보기 닫기
    $('.photo_pop_img, .pop_close_btn_wrap, #photo_pic_pop_wrapper').on('click', function() {

        $('#photo_pic_pop_wrapper').hide()
        $('.pop_bg_layer').fadeOut() // 레이어 배경 숨김
        $('body, html').removeClass('notScroll')
    })

    // PHOTO THMB 이미지 클릭시
    $('.photo_thmb_thm_img').on('click', function() {

        // PHOTO VIEW IMAGE 처리
        var key = $(this).data('key')
        photo_view_swiper.slideTo(key)

        // 클릭한 썸네일 활성처리
        $('.photo_thmb_thm_img').css('opacity', '1')
        $(this).css('opacity', '0.3')

    })



    /* ==========================================
                        오시는길
    ============================================= */

    if (map_tel == '') {
        $('.tel_ask_btn').hide()
    }

    // 지도, 약도 탭
    $('.mcard_map_type_btn').on('click', function() {

        // 탭 버튼 활성 처리
        $('.mcard_map_type_btn').each(function() {
            $(this).removeClass('mcard_button2_on')
        })
        $(this).addClass('mcard_button2_on')

        // 클릭한 타입의 지도 출력처리
        $('.map_object').hide()
        $('.map_object[data-cat=' + $(this).data('cat') + ']').show()

    })

    $('#map_frame').attr('src', 'map_daum.php?lat=' + map_lat + '&lng=' + map_lng + '&map_name=' + venue_name + '&map_addr=' + map_addr + '&map_road=' + map_road)

    //
    $('.map_img').on('click', function() {
        window.open($('#map_frame').attr('src'))
    })

    $('.map_img_zoom_btn').on('click', function() {
        window.open('_img_large.php?src_url=' + $('.map_view_img').attr('src'))
    })

    /* ==========================================
                        계좌
    =============================================*/

    var family_group_name_prefix = new Array()
    family_group_name_prefix['a'] = '신랑'
    family_group_name_prefix['b'] = '신부'

    var family_group_name_color = new Array()
    family_group_name_color['a'] = '#8aa5d6'
    family_group_name_color['b'] = '#ee8196'

    // 보기
    $('.bank_txt_view_btn').on('click', function() {
        debugger;
        $('#bank_pop_txt_unm').text($(this).prev().text())

        $('#bank_pop_txt_acc').text($(this).data('bank_name') + ' ' + $(this).attr('data-bank_num'))

        $('#bank_popup').show()
        mask(0.4)

    })


    // 복사
    $('#bank_pop_copy_btn').on('click', function() {
        var bank_txt = $('#bank_pop_txt_acc').text().replace(/-/g,'')

        if (bank_txt.length > 1) {
            clipboard_copy(bank_txt)
            alert(bank_txt + ' 복사되었습니다')
        }
    })


    // 닫기
    $('#bank_pop_close_btn').on('click', function() {
        $('#bank_popup').hide()
        mask(0)
    })




    /* ==========================================
                        축하메시지
    =============================================*/

    /*  var guest_swiper = new Swiper('.guest-swiper-container', {
          on: {
              slideChange: function() {
                  $('.guest_paging_now_no').text(this.realIndex + 1)
              },
              slideChangeTransitionEnd: function() {
                  $('html, body').animate({
                      scrollTop: $('#guest_section_title_img').offset().top + 30
                  }, 200)
              },

          },
      })

      // Guestbook paging swiper nav buttons
      $('.guest_prev_btn').on('click', function() {
          guest_swiper.slidePrev()
      })
      $('.guest_next_btn').on('click', function() {
          guest_swiper.slideNext()
      })*/

    /*
          [수정하기]
                        */

    $('.msg_edit_button').live('click', function(e) {

        msg_area = $(this).parent().data('area')
        msg_idx = $(this).parent().data('idx')
        msg_root = $(this).parent().data('idx')
        //console.log('msg_area:'+msg_area+', msg_idx:'+msg_idx+', msg_root:'+msg_root)

        //메시지 편집폼
        $('#msg_form_title').text('댓글 수정')
        if (msg_area == 'guest' && msg_idx == msg_root) $('#msg_form_title').text('축하 메시지 수정')
        mask(0.5)
        $('#reply_form').css({
            'display': 'block',
            'left': wrapper_left_margin + 'px',
            'width': wrapper_width + 'px'
            //'top': window.innerHeight/5+'px'
        })

        //내용읽어서
        var memo = $('.msg_text[data-idx=' + msg_idx + ']').text()

        //메시지 편집폼 텍스트값 입력
        $('#reply_form_textarea').val(memo)

        //텍스트박스 크기조정
        var tmp = memo.split('\n')
        var row_count = tmp.length
        for (i = 0; i < tmp.length; i++) {
            if (tmp[i].length > 40) row_count++
        }
        $('#reply_form_textarea').attr('alt', row_count)
        textarea_resize($('#reply_form_textarea'))

        //알림체크 적용
        reply_form_notify($(this).data('notify'))


        //작성자만 수정 가능
        if ($(this).parent().data('mail') == $.cookie('mcard_guest_user_mail')) {
            $('#reply_form_textarea').prop('disabled', false)
            $('#reply_mail_notify_row').show()
            $('#reply_form_edit_writer_notice').hide()
            $('#msg_form_submit_button').show()
        } else {
            $('#reply_form_textarea').prop('disabled', true)
            $('#reply_mail_notify_row').hide()
            $('#reply_form_edit_writer_notice').show()
            $('#msg_form_submit_button').hide()
        }


    })



    /*
          [답글달기]
                        */
    $('.msg_reply_button').live('click', function(e) {

        msg_area = $(this).parent().data('area')
        msg_idx = $(this).parent().data('idx')
        msg_root = $(this).parent().data('idx')
        //console.log('msg_area:'+msg_area+', msg_idx:'+msg_idx+', msg_root:'+msg_root)

        var croot_name = $('.msg_name[data-idx=' + msg_idx + ']').text()
        var parent_idx = $(this).data('parent_idx')

        $('#msg_textarea').val('').attr('placeholder', '@' + croot_name)

        $('#msg_textarea').focus() //람다함수 사용금지

        if (!iOS) {
            //원글이 잘 보이게 자동스크롤
            $('html, body').animate({
                scrollTop: $('.msg[data-idx=' + msg_root + ']').offset().top - 45
            }, 0)
        }

    })


    // ** 수정폼의 [등록하기] 버튼 클릭시
    $('#msg_form_submit_button').live('click', function() {

        var user_name = $('input[name=guest_user_name]').val().trim()
        var user_mail = $('input[name=guest_user_mail]').val().trim()

        var post_data = {
            'uid': uid,
            'area': msg_area,
            'idx': msg_idx,
            'name': encodeURIComponent(user_name),
            'mail': user_mail,
            'memo': encodeURIComponent($('#reply_form_textarea').val().trim()),
            'notify': $('input[name=reply_notify]').val(),
            'area': msg_area,
            //'parent': photo_idx,
            'send_type': 'ajax'
        }


        $.ajax({

            type: 'POST',
            url: '_msg_proc.php',
            data: post_data,
            //contentType: 'application/x-www-form-urlencoded;charset=euc-kr',
            beforeSend: function(jqXHR) {
                jqXHR.overrideMimeType('application/x-www-form-urlencoded;charset=euc-kr')
            },
            success: function(data) {

                mask(0)
                $('.msg[data-idx=' + msg_idx + ']').replaceWith(data)
                $('.msg[data-idx=' + msg_idx + ']').css({
                    'background-color': '#eaeaea'
                })
                setTimeout(function() {
                    $('.msg[data-idx=' + msg_idx + ']').animate({
                        backgroundColor: '#ffffff'
                    }, 1000)
                }, 300)
                msg_root = 0

            },
            error: function(xhr, textStatus) {
                console.log(xhr.responseText)
            }

        })


    })


    // ** 수정폼의 [삭제] 버튼 클릭시
    $('#msg_delete_button').live('click', function() {

        var delete_confirm_text = '등록된 메시지가 삭제됩니다.'

        //댓글이 있는지 확인
        var this_reply_count = $('.msg[data-croot=' + msg_idx + ']').length - 1
        if (this_reply_count > 0) delete_confirm_text += '\n\n댓글이 등록되있습니다. 삭제시, 댓글도 모두 지워집니다.'

        //삭제여부 확인
        if (!confirm(delete_confirm_text)) {
            return false
        }

        //console.log('_msg_del_proc.php?idx='+msg_idx+'&area='+msg_area)

        $.get('_msg_del_proc.php?idx=' + msg_idx + '&area=' + msg_area, function(data) {

            console.log(data)

            mask(0)

            r = JSON.parse(data)
            //console.log(r)
            if (r.error_code == 0 && r.idx) {
                $('.msg[data-idx=' + r.idx + '], .msg[data-croot=' + r.idx + ']').css({
                    'background-color': '#eaeaea'
                })
                $('.msg[data-idx=' + r.idx + '], .msg[data-croot=' + r.idx + ']').animate({
                    opacity: 0
                }, 700, function() {
                    $(this).remove()
                    msg_root = 0
                    if (msg_area == 'photo') photo_reply_update(photo_idx)
                    //전체 메시지 갯수 업데이터 필요
                    if ($('input[name=guest_logout]').val() == 1) {
                        $.cookie('mcard_guest_user_name', null)
                        $.cookie('mcard_guest_user_mail', null)
                        location.reload()
                    }
                })
            }

        })



    })


    // Guest form close
    $('.form_close_button').on('click', function() {
        mask(0)
    })




    // 수정모드 입력상자
    $('#reply_form_textarea').on('keyup', function() {
        if ($(this).val().trim().length > 0) {
            $('#msg_form_submit_button').css({
                'color': '#333333',
                'border-color': '#333333'
            })
        } else {
            $('#msg_form_submit_button').css({
                'color': '#efefef',
                'border-color': '#efefef'
            })
        }
    })


    // 축하글 더 보기 버튼
    $('.guest_more_btn').on('click', function(){
        var clicked = Number($(this).data('clicked')) + 1
        clicked++
        $(this).data('clicked', clicked)
        i = 0
        $('.article_row').each(function(){
            i++
            console.log(i, clicked*10)
            if (i < clicked*10) $(this).show()
        })

        if (clicked*10 >= $('.article_row').length) {
            $('.guest_more_btn').fadeOut('slow')
        }

    })




    // 서브페이지 상단
    $('#mcard_top_back_button').bind('click', function() {
        history.back()
    })



}) // Document ready end




function checkbox_toggle(inm) { //input name

    if ($("input[name=" + inm + "]").prop("checked")) {
        $("img[alt=" + inm + "]").attr("src", $("img[alt=" + inm + "]").attr("src").replace("_on.png", "_off.png"))
        $("input[name=" + inm + "]").prop("checked", false)
    } else {
        $("img[alt=" + inm + "]").attr("src", $("img[alt=" + inm + "]").attr("src").replace("_off.png", "_on.png"))
        $("input[name=" + inm + "]").prop("checked", true)
    }

}

function fold_toggle(oid) { //object id

    if ($("#" + oid).css("display") == "none") {

        $("#" + oid).show()

        $("#" + oid + "_arrow").animate({
            "transform": "rotate(180deg)"
        })

    } else {

        $("#" + oid).hide()

        $("#" + oid + "_arrow").animate({
            "transform": "rotate(0deg)"
        })

    }

}

function photo_reply_update(idx) {
    var reply_count = $('.reply[data-parent_idx=' + idx + ']').length
    $('.photo_reply_counter[data-idx=' + idx + ']').text(reply_count)
}

function mask(opacity) {

    if (opacity == 0) {

        $('#mask').hide()
        $('.mask_over').hide()

    } else {

        //$('#mask').css({ 'width': $(window).width(), 'height': $(window).height() })
        $('#mask').stop().fadeTo('slow', opacity); //$('#mask').fadeIn(1000)
        $('#mask').show()

    }

}


function textarea_resize(obj) {

    // count
    var text = $(obj).val()
    var lines = text.split(/\r|\r\n|\n/)
    var count = lines.length


    // resize
    var default_count = Number($(obj).attr('alt'))
    if (!default_count) default_count = 1

    if (count > 1) $(obj).css('height', 'auto')
    if (count > default_count) $(obj).attr('rows', count)
    else $(obj).attr('rows', default_count)

}


function basename(path) {
    return path.split('/').reverse()[0];
}


function clipboard_copy(str) {
    var tmpTextarea = document.createElement('textarea')
    tmpTextarea.value = str
    document.body.appendChild(tmpTextarea)
    tmpTextarea.select()
    tmpTextarea.setSelectionRange(0, 9999)
    document.execCommand('copy')
    document.body.removeChild(tmpTextarea)
}


$(function () {
    //header
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        var $header = $('.header');
        var hedaerTop = $header.height();
        if (scrollTop >= hedaerTop) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
        }
    });

    //all menu
    $('.user_wrap .ico.menu').on('click', function () {

        if ($(this).hasClass('close')) {
            menuClose(wdSize);
        } else {
            menuOpen(wdSize);
        }
    });

    $('.all_menu .close_btn, .mobile_menu_bg').on('click', function () {
        menuClose(wdSize);
    });

    //user menu
    $('.user_wrap .user').on('click', function () {
        $('.user_menu').show();
    });
    $('html').on('click', function (e) {
        if (!$(e.target).hasClass('user')) {
            $('.user_menu').hide();
        }
        if (!$(e.target).hasClass('tip_btn')) {
            $('.tip_box').removeClass('open');
        }

    });


    var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우
    if (navigator.platform) {
        //mobile
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            resizeR();
            //ie 예외처리
            $('.not_ie').hide();
        } else {
            $(window).bind('load', function () { resizeR(); }); //pc
        }
    }


    function resizeR() {
        wdSize = $(window).outerWidth();

        resizeBr(wdSize);
        initSwiper(wdSize);
    }

    //모바일 2차메뉴 이벤트
    //$('.all_menu_nav .menu_list > li > a').on('click', function () {
    $(document).on("click", ".all_menu_nav .menu_depth01 > li > a", function () {
        if (wdSize <= mbSize && $(this).siblings(".menu_depth02").find("li").length > 0) {
            $(this).siblings('.menu_depth02').slideToggle(300);
            $('.menu_list > li > a').not(this).siblings('.menu_depth02').slideUp(300);
            return false;
        }
    });

    //family site event
    $('.family_wrap').hover(function () {
        $('.family_wrap > a').addClass('on');
    }, function () {
        $('.family_wrap > a').removeClass('on');
    });

    //탭메뉴 공통
    $('.tab_wrap').each(function () {

        $(this).find('.tab_ul li:eq(0)').addClass('active');
        $(this).find('.tab_ul li').on('click', function () {

            var tabIndex = $(this).index();
            var $tabCon = $(this).parents('.tab_wrap').find('.tab_con').eq(tabIndex);

            $(this).addClass('active').siblings('li').removeClass('active');
            $tabCon.fadeIn().siblings('div').hide();

        });
    });

    $('.pop_mask').on('click', function () {
        popClose();
    });

    /** 툴팁 이벤트 **/
    $('.tip_btn').on('click', function () {
        $(this).parents('.tip_box').addClass('open');
    });
    /*
    if (!$('#wrap').hasClass('mobile')) {
        $('.tip_box').on('click', function () {
            $(this).addClass('open');
        });
        $('.tip_box .ico.notice').on('click', function () {
            $(this).parents('.tip_box').addClass('open');
        });
    } else {
        $('.tip_btn').on('click', function () {
            $(this).parents('.tip_box').addClass('open');
        });
    }
    */

    //IE 예외처리 호출
    notUseIe();
});



var mbSize = 1024;
var wdSize;

var mySwiper = undefined;


function initSwiper(size) {
    try {
        if (size <= 900) {
            $('.menu_nav').addClass('m_nav');
            $('.m_nav').removeClass('menu_nav');

            var mySwiper = new Swiper(".m_nav", {
                slidesPerView: 'auto',
                initialSlide: 0,
                spaceBetween: 35,
                centeredSlides: false,
                slideToClickedSlide: false,
                loopAdditionalSlides: 0,
                grabCursor: false,
                observer: true,
                observeParents: true,
                resizeObserver: false,
                freeMode: true,
            });
        }
        else if (size > 901 && mySwiper != undefined) {
            $('.m_nav').addClass('menu_nav');
            $('.menu_nav').removeClass('m_nav');

            mySwiper.destroy();
            mySwiper = undefined;

        }
    }
    catch (e) { }


}

function resizeBr(size) {

    if (size > mbSize) {

        $('.header').removeClass('mobile fixed');
        $('.all_menu').css({ 'display': 'none', 'left': '0' });
        $('.mobile_menu_bg, .log_btn').hide();
        $('.ico.menu').removeClass('close');
        $('.menu_depth02').show();


    } else {

        $('.header').addClass('mobile fixed');
        $('.all_menu').css({ 'display': 'inline', 'left': '-100%' });
        $('.user_menu').hide();
    }
}
//메뉴 열기 이벤트
function menuOpen(size) {

    if (size > mbSize) {
        $('.all_menu').stop().slideDown();

    } else {
        $('.mobile_menu_bg').fadeIn();
        $('.all_menu').animate({ 'left': '0' });
        $('.log_btn').animate({ 'left': '34px' });
        $('.ico.menu').addClass('close');

        //스크롤 방지
        scrollDisable();
    }
}
//메뉴 닫기 이벤트
function menuClose(size) {

    if (size > mbSize) {
        $('.all_menu').stop().slideUp();
    } else {
        $('.mobile_menu_bg').fadeOut();
        $('.all_menu, .log_btn').animate({ 'left': '-100%' });
        $('.ico.menu').removeClass('close');

        //스크롤 방지 해제
        scrollAble();
    }

}

//레이어 팝업 열기 이벤트

function layerPopOpen(popName) {
    var $popWrap = $('.'+popName);
    $popWrap.show();
}

function popOpen(popNum) {
    var $popWrap = $('.pop_wrap').eq(popNum);
    $popWrap.show();
}

//레이어 팝업 닫기 이벤트
function popClose() {
    $('.pop_wrap').hide();
}

//인사말 샘플 팝업
function samplePop(spVal) {
    var spUrl = ['../popup/pop_GreetingSearch01.html', '../popup/pop_GreetingSearch02.html'];
    var spTitle = '인사말 샘플 팝업';
    var spOptions = 'width=602px,height=680px,top=100px,left=200px,scrollbars=yes';

    window.open(spUrl[spVal], spTitle, spOptions);
}

//확대보기
function detailFull() {
    window.open("../popup/pop_detail.html");
}

//축의금 설정 팝업
function cgMoneyPop(cgVal) {
    var cgUrl = ['../manage/manage_cg_money_setting.html', '../manage/m_manage_cg_money_setting.html'];
    var cgTitle = '축의금 설정 팝업';

    window.open(cgUrl[cgVal], cgTitle);
}

function windowPopClose() {
    window.close();
}

function fileUpload() {
    var fUrl = 'https://www.barunsoncard.com/order/common/pop_Fileupload.asp?input_name=upfile1&index=&up_dir=cs&order_seq=';
    var fTitle = '파일 업로드';
    var fOptions = 'width=602px,height=680px,top=100px,left=200px,scrollbars=yes';
    window.open(fUrl, fTitle, fOptions);
}

//스크롤 방지 이벤트
function scrollDisable() {
    $('body').addClass('scroll_off').on('scroll touchmove mousewheel', function (e) {
        e.preventDefault();
    });
}
//스크롤 방지해제 이벤트
function scrollAble() {
    $('body').removeClass('scroll_off').off('scroll touchmove mousewheel');
}

//토스트 알림 기능
function toast(select, msg, timer) {
    //alert(msg);
    var selId = $(select).attr('id');
    var $elem = $("<p>" + msg + "</p>");

    if ($('#' + selId).is(":checked")) {

        $(".toast").html($elem).show();

        $elem.slideToggle(100, function () {
            setTimeout(function () {
                $elem.fadeOut(function () {
                    $(this).remove();
                    $('.toast ').css('bottom', '');
                });
            }, timer);
            return false;
        });

        $('.toast').stop().animate({ 'bottom': '5%' });

    }
}

//IE 예외처리
function notUseIe() {
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
        // ie일 경우
        $('.not_ie').show();
    } else {
        // ie가 아닐 경우
        $('.not_ie').hide();
    }
}

function closeIe() {
    $('.not_ie').fadeOut();
}

$(function () {

    var UserAgent = navigator.userAgent;

    //family site event
    $('.family_wrap > a').on('mouseenter', function(){
        $(this).addClass('on');
    });
    $('.family_list').on('mouseleave', function(){
        $('.family_wrap > a').removeClass('on');
    });

    //접속 디바이스 구분
    var filter = "win16|win32|win64|mac";
    if( navigator.platform  ){
        if( filter.indexOf(navigator.platform.toLowerCase())<0 ){ //mobile 접속

            $('.follow_btn').hide();

        }else{ //PC 접속
        }
    }

    //마우스 커서 초기 값
    var mouseX = 0, mouseY = 0;

    //마우스 커서 위치 값 구하기
    $(document).on('mousemove', function(e){
        mouseX = e.clientX || e.pageX;
        mouseY = e.clientY || e.pageY;
        $(".circle").css({left: mouseX - 30 +'px', top: mouseY -30 +'px'});
    });

    //slide hover cursor event
    $('.follow_btn').hover(function(){
        $(".circle").addClass('over');
        if( $(this).hasClass("swiper-button-next") ){
            $('.circle').text('NEXT');
        } else {
            $('.circle').text('PREV');
        }
    }, function(){
        $(".circle").removeClass('over');
    });



    var PageNum = 1;
    var PageSize = 18;

    $.ajax({
        type: "POST",
        url: "/User/Menu/CTC02", //상단 메뉴
        dataType: "json",
        async: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

        success: function (result) {
            //var jsonStr = JSON.stringify(jsonObj);
            //console.log(result.category_menu_list);
            var Parent_Category_ID = "";
            var 중분류Array = [];
            $(result.category_menu_list).each(function (index, list) {

                //대분류
                var Parent_Id;
                var 대분류리스트 = "";
                var 중분류리스트 = "";
                var Compare_Id;
                var View;

                if (isEmpty(list.Parent_Category_Id)) {
                    Parent_Id = list.Category_ID
                }
                else Parent_Id = list.Parent_Id

                if (!(Parent_Id == list.Parent_Id)) { //대분류

                    //"Product/List/{Page?}/{PageSize?}/{Category_Id?}/{Sort_Gubun?}/{SearchCategoryList?}/{SearchBrandList?}/"

                    //var Depth1_Url = "/Product/List/1/0/" + list.Category_ID + "/0/0/0";

                    var Depth1_Url = "";
                    //"Product/List/{Page?}/{PageSize?}/{Category_Id?}/{Sort_Gubun?}/{SearchCategoryList?}/{SearchBrandList?}/"
                    if (list.Category_ID == "1") {
                        Depth1_Url = "/Product/List/1/18/1/0/10_/0";
                    }
                    else {
                        Depth1_Url = "/Product/List/1/0/" + list.Category_ID + "/0/0/0";
                    }

                    Parent_Category_ID = list.Category_ID;

                    if (isEmpty(list.Category_Name_PC_URL)) View = list.Category_Name;
                    else View = "<img src=\"" + list.Category_Name_PC_URL + "\" style=\"width:54px;height:18px;\">";
                    //alert(filter.indexOf(navigator.platform.toLowerCase()));
                    // 대분류 리스트
                    $(".header .area .menu_nav .menu_depth01:eq(0)").append("<li class=\"swiper-slide\"><a href=\"" + Depth1_Url + "\">" + View + "</a></li>");
                    $(".header .area .m_nav .menu_depth01:eq(0)").append("<li class=\"swiper-slide\"><a href=\"" + Depth1_Url + "\">" + View + "</a></li>");

                    대분류리스트 = "<li><a href=\"" + Depth1_Url + "\" class=\"mont\">" + View + "</a><ul class=\"menu_depth02\" id=\"" + Parent_Category_ID + "\" style=\"display:none;\"></ul></li>";
                    // $(".all_menu_nav .menu_depth01").append("<li><a href=\"javascript:; \" class=\"mont\">" + list.Category_Name + "</a>");
                    // $(".all_menu_nav .menu_depth01").append(대분류리스트);
                    //alert(filter.indexOf(navigator.platform.toLowerCase()));
                    //alert(대분류리스트);
                    $(".all_menu_nav .menu_depth01:eq(1)").append(대분류리스트);

                    if (navigator.platform) {
                        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                            //mobile
                            //  $(".all_menu_nav .menu_depth01:eq(1)").append(대분류리스트);

                        }
                        else {
                            //PC
                            //   $(".all_menu_nav .menu_depth01").append(대분류리스트);
                        }
                    }

                }
                else {
                    // alert(Parent_Category_ID);
                    var Depth2_Url = "/Product/List/" + PageNum + "/" + PageSize + "/" + Parent_Category_ID + "/1/" + list.Category_ID + "_/0";

                    if (list.Parent_Category_Id == Parent_Category_ID) {

                        if (isEmpty(list.Category_Name_PC_URL)) View = list.Category_Name;
                        else View = "<img src=\"" + list.Category_Name_PC_URL + "\"  style=\"width:54px;height:18px;\">";

                        중분류리스트 = "<li><a href=\"" + Depth2_Url + "\">" + View + "</a></li>";

                        $(".menu_depth02").each(function (index) {
                            if ($(this).attr("id") == list.Parent_Category_Id) {
                                if (isEmpty($(".menu_depth02").html())) {
                                    $(this).append("<li><a href=\"/Product/List/1/18/" + Parent_Category_ID + "/0/0/0\">전체</a></li>");
                                }
                                $(this).append(중분류리스트);
                            }
                        });
                    }
                }

            });

            $(result.menu_list).each(function (index, list) {
                var View;

                if (isEmpty(list.image_URL)) View = list.menu_Name;
                else View = "<img src=\"" + list.image_URL + "\" style=\"height: 22px;\">";

                if (list.menu_Type_Code == "MTC02") { // 풋터 메뉴
                    $(".footer .footer_menu").append("<li><a href=\"" + list.menu_URL + "\" target=\"_blank\">" + View + "</a></li>"); //메뉴
                }
                else {

                    var parent_Menu_ID;

                    if (isEmpty(list.parent_Menu_ID)) {
                        //if (index > 0) {

                        //}
                        parent_Menu_ID = list.menu_ID
                    }
                    else parent_Menu_ID = list.parent_Menu_ID

                    if (!(parent_Menu_ID == list.parent_Menu_ID)) { //대분류
                        //console.log(list.menu_ID);

                        if (isEmpty(list.image_URL)) View = list.menu_Name;
                        else View = "<img src=\"" + list.image_URL + "\" style=\"height: 22px;\">";

                        $(".header .area .menu_nav .menu_depth01").append("<li class=\"swiper-slide\"><a href=\"" + list.menu_URL + "\">" + View + "</a></li>");

                        $(".header .area .m_nav .menu_depth01").append("<li class=\"swiper-slide\"><a href=\"" + list.menu_URL + "\">" + View + "</a></li>");

                        대분류리스트 = "<li><a  href=\"" + list.menu_URL + "\" class=\"mont\">" + list.menu_Name + "</a><ul class=\"menu_depth02\" id=\"" + parent_Menu_ID + "\"></ul></li>";
                        //$(".all_menu_nav .menu_depth01").append(대분류리스트);

                        $(".all_menu_nav .menu_depth01:eq(1)").append(대분류리스트);
                        //alert(filter.indexOf(navigator.platform.toLowerCase()));
                        if (navigator.platform) {
                            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                                //mobile
                                //  $(".all_menu_nav .menu_depth01:eq(1)").append(대분류리스트);

                            }
                            else {
                                //PC
                                //  $(".all_menu_nav .menu_depth01:eq(1)").append(대분류리스트);
                            }
                        }

                    }
                    else {
                        if (parent_Menu_ID == list.parent_Menu_ID) {

                            if (isEmpty(list.image_URL)) View = list.menu_Name;
                            else View = "<img src=\"" + list.image_URL + "\" style=\"height: 22px;\">";

                            중분류리스트 = "<li><a href=\"\">" + View + "</a></li>";

                            $(".menu_depth02").each(function (index) {
                                if ($(this).attr("id") == list.parent_Menu_ID) {
                                    $(this).append(중분류리스트);
                                }
                            });

                        }

                    }

                    // $(".all_menu_nav .menu_depth01").append("<li><a href=\"" + list.menu_URL + "\" target=\"_blank\">" + list.menu_Name + "</a></li>");
                }
            });

        },
        error: function (error) {
            //console.log(error);
        }
    });



    /* 총 찜 리스트 개수 */
    $.ajax({
        type: "POST",
        url: "/Product/Wish_Cnt?" + Math.random(),
        async: false,
        success: function (result) {

            //var filter = "win16|win32|win64|macintel|mac|";

            if (parseInt(result) > 0) {
                //pc버전
                $(".like_count").html(result);

                //모바일버전
                $(".point01").html(result);

                if (parseInt(result) > 0) {

                    $("#wrap .user_wrap .menu").addClass("true");
                }
                else {
                    $("#wrap .user_wrap .menu").removeClass("true");
                }

            }
            else {

                $(".like_count").hide(); //상단 우측 위시리스트 카운트 영역 자체 비노출
                $("#wrap .user_wrap .menu").removeClass("true"); // 햄버거 메뉴 위시리스트 아이콘 비노출
            }

        },
        error: function (result) {
            // swal({ title: "오류가 발생했습니다. 다시 시도해 주세요", type: "error" });
        }
    });


    $(".search_input").keypress(function (event) {
        if (event.which == 13) {
            $(".search_btn").click();
            return false;
        }
    });


    $(".search_btn").click(function (e) {

        var SearchKeyword = $(".search_input").val();

        if (isEmpty(SearchKeyword)) {
            alert("검색어를 입력해주세요");
            $(".search_input").focus();
            return;
        }

        location.href = "/Product/Search/1/18/1/" + encodeURIComponent(SearchKeyword);

    });
});


var isEmpty = function (val) {
    if (val === "" || val === null || val === undefined
        || (val !== null && typeof val === "object" && !Object.keys(val).length)
    ) {
        return true
    } else {
        return false
    }

};


function PagingNavigator() {

    var obj = $(".pagination-container");
    $(obj).attr("class", "paging_wrap").find(".pagination").removeClass();

    $(obj).find("ul li").each(function () {
        var classobj = $(this).attr("class");

        if (classobj == "PagedList-skipToPrevious") $(this).find("a").addClass("paging_prev").html("이전페이지 보기");

        else if (classobj == "PagedList-skipToNext") $(this).find("a").addClass("paging_next").html("다음페이지 보기");

        else if (classobj == "active") {
            var actNum = $(this).find("span").text();

            $(this).find("span").replaceWith(function () {
                return $('<a>', { class: "on", text: actNum })
            });
        }
    });

}


function Wish_Save(Product_Id, Gubun) {


    $.ajax({
        type: "POST",
        url: "/Product/Wish_Save/" + Product_Id + "/" + Gubun, //상품ID
        async: false,
        success: function (result) {


            var TotalCnt = result.split('_')[0];
            var MemCnt = result.split('_')[1];

            if (parseInt(TotalCnt) > 0) {

                //pc버전
                $(".like_count").html(TotalCnt);

                //모바일버전
                $(".point01").html(TotalCnt);

                $(".product_detail_wrap .product_info_box .wish .wish_count").html(MemCnt);

                if (parseInt(result) > 0) {

                    $("#wrap .user_wrap .menu").addClass("true"); // 햄버거 메뉴 위시리스트 아이콘 노출
                }
                else {
                    $("#wrap .user_wrap .menu").removeClass("true"); // 햄버거 메뉴 위시리스트 아이콘 비노출
                }
                $(".like_count").show(); //상단 우측 위시리스트 카운트 영역 노출
            }
            else {

                $(".like_count").hide(); //상단 우측 위시리스트 카운트 영역 자체 비노출
                $("#wrap .user_wrap .menu").removeClass("true"); // 햄버거 메뉴 위시리스트 아이콘 비노출
            }

            //$(result.product_Info).each(function (index, list) {
            //    // console.log(list.Brand_Name);
            //    $(".sub_con_wrap .product_preview .product_location").html(list.Brand_Name);
            //    $(".sub .product_title strong").html(list.Product_Name);
            //    $(".sub_con_wrap .product_info .btn_wrap .btn").attr("href", "/Order/Step1/" + list.Product_Id);
            //    $(".preview_box .img_con img").attr("src", list.PreView_Url);
            //});
        },
        error: function (result) {
            // swal({ title: "오류가 발생했습니다. 다시 시도해 주세요", type: "error" });
        }
    });

}



function ClickSave(gubun, id) {

    // 배너 클릭수 업데이트
    $.ajax({
        type: "POST",
        url: "/Banner/Click_Update/" + id + "/" + gubun,
        dataType: "json",
        async: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

        success: function (result) {

        }
    });

}
//ClickSave("banner", 47);


function GoURL(obj) {

    if (!isEmpty($(obj).val())) {
        //  alert($(obj).val());
        location.href = $(obj).val();
        /* window.open($(obj).val(), '_blank');*/
    }
}

function replaceAll(str, s, t) {
    while (str.indexOf(s) >= 0) {
        str = str.replace(s, t);
    }

    return str;
}


function load_mainbanner() {
    var PCbanner = "";
    var PCbanner2 = "";
    var PCbanner3 = "";

    var pc_area = "";
    var pc_area2 = "";
    var pc_area3 = "";

    var Mo_area = "";
    var Mo_area2 = "";
    var Mo_area3 = "";

    //첫번째 메인배너
    $.ajax({
        type: "POST",
        url: "/User/MainBanner/1",
        dataType: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            var pc_sortnum = "";
            $(result.banner).each(function (index, list) {

                if (list.Status == "진행") {
                    if (list.Banner_Type_Code == "BTC01") {

                        pc_area = "           <div class=\"pc_area\">";
                        pc_area += "                   <div class=\"text_wrap\">";
                        pc_area += "                       <p class=\"main_text\">";
                        pc_area += list.Banner_Main_Description;
                        pc_area += "                       </p>";
                        pc_area += "                       <p class=\"sub_text\">";
                        pc_area += list.Banner_Add_Description;
                        pc_area += "                       </p>";
                        pc_area += "                   </div>";
                        pc_area += "                   <div class=\"mb_obj mb_obj01\">";
                        pc_area += "                       <a href=\"" + list.Link_URL + "\"  target=\"" + list.NewPage_YN + "\">";
                        pc_area += "                           <img src=\"" + list.Image_URL + "\" alt=\"메인 배너 오브젝트\">";
                        pc_area += "                       </a>";
                        pc_area += "                   </div>";
                        pc_area += "          </div>";
                        pc_sortnum = list.Sort;

                        $(result.banner).each(function (index1, list2) {
                            if (list2.Banner_Type_Code == "BTC02") {
                                if (list2.Status == "진행") {
                                    if (pc_sortnum == list2.Sort) {

                                        Mo_area = "           <div class=\"m_area\">";
                                        Mo_area += "                   <div class=\"mb_obj mb_obj01\">";
                                        Mo_area += "                       <a href=\"" + list2.Link_URL + "\"  target=\"" + list2.NewPage_YN + "\">";
                                        Mo_area += "                           <img src=\"" + list2.Image_URL + "\" alt=\"메인 배너 오브젝트\">";
                                        Mo_area += "                       </a>";
                                        Mo_area += "                   </div>";
                                        Mo_area += "                   <div class=\"text_wrap\">";
                                        Mo_area += "                       <p class=\"main_text\">";
                                        Mo_area += list2.Banner_Main_Description;
                                        Mo_area += "                       </p>";
                                        Mo_area += "                       <p class=\"sub_text\">";
                                        Mo_area += list2.Banner_Add_Description;
                                        Mo_area += "                       </p>";
                                        Mo_area += "                   </div>";

                                        Mo_area += "          </div>";

                                        var backimg = replaceAll(list.Image_URL2, "\\", "/");

                                        PCbanner += " <div class=\"swiper-slide mb_slide01\" style=\"background: url(" + backimg + ") no-repeat center; background-size: cover;\"><div class=\"mb_area\">" + pc_area + Mo_area + "</div></div>";

                                    }
                                }
                                else {
                                    if (pc_sortnum == list2.Sort) {
                                        Mo_area = "           <div class=\"m_area\">";
                                        Mo_area += "          </div>";

                                        var backimg = replaceAll(list.Image_URL2, "\\", "/");
                                        PCbanner += " <div class=\"swiper-slide mb_slide01\" style=\"background: url(" + backimg + ") no-repeat center; background-size: cover;\"><div class=\"mb_area\">" + pc_area + Mo_area + "</div></div>";
                                    }
                                }
                            }
                        });
                    }


                }
            });

            $(".main_banner .swiper-wrapper").html(PCbanner);

        }
    });

    //두번째 메인배너
    $.ajax({
        type: "POST",
        url: "/User/MainBanner/2",
        dataType: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            //alert("b");
            //console.log(result.banner);
            var pc_sortnum = "";

            $(result.banner).each(function (index, list) {

                if (list.Status == "진행") {

                    if (list.Banner_Type_Code == "BTC01") {

                        pc_area2 = "           <div class=\"pc_area\">";
                        pc_area2 += "             <div class=\"img_con\">";
                        pc_area2 += "                 <span class=\"banner_badge\">" + list.Banner_Main_Description.split("]")[0].replace("[", "") + "</span>"
                        pc_area2 += "                     <a href=\"" + list.Link_URL + "\" target=\"" + list.NewPage_YN + "\">";
                        pc_area2 += "                         <img src=\"" + list.Image_URL + "\" alt=\"무료제작 이미지\">";
                        pc_area2 += "                     </a>";
                        pc_area2 += "             </div>";
                        pc_area2 += "             <p><strong>" + list.Banner_Main_Description.split("]")[1].replace("", "") + "</strong></p>";
                        pc_area2 += "             <p>" + list.Banner_Add_Description + "</p>";
                        pc_area2 += "             </div>";
                        pc_sortnum = list.Sort
                        // console.log(pc_area2);
                        // console.log("두번째 PC배너 sort:" + pc_sortnum);

                        $(result.banner).each(function (index1, list2) {

                            if (list2.Banner_Type_Code == "BTC02") {

                                if (list2.Status == "진행") {

                                    if (pc_sortnum == list2.Sort) {
                                        // console.log("두번째 모바일배너 sort:" + list2.Sort);
                                        Mo_area2 = "   <a href=\"" + list2.Link_URL + "\" target=\"" + list2.NewPage_YN + "\">";
                                        Mo_area2 += "         <div class=\"m_area\">";
                                        Mo_area2 += "             <div class=\"img_con\">";

                                        Mo_area2 += "                         <img src=\"" + list2.Image_URL + "\" alt=\"무료제작 이미지\">";
                                        Mo_area2 += "             </div>";
                                        Mo_area2 += "             <dl>";
                                        Mo_area2 += "                 <dt>" + list2.Banner_Main_Description + "</dt>";
                                        Mo_area2 += "                 <dd>" + list2.Banner_Add_Description + "</dd>";
                                        Mo_area2 += "             </dl>";
                                        Mo_area2 += "         </div>";
                                        Mo_area2 += " </a>";
                                        // console.log(Mo_area2);
                                        PCbanner2 += "<li>" + pc_area2 + Mo_area2 + "</li>";
                                        //alert(PCbanner2)
                                    }
                                }
                                else {

                                    if (pc_sortnum == list2.Sort) {
                                        // console.log("두번째 모바일배너 sort:" + list2.Sort);

                                        Mo_area2 = "         <div class=\"m_area\">";

                                        Mo_area2 += "         </div>";

                                        // console.log(Mo_area2);
                                        PCbanner2 += "<li>" + pc_area2 + Mo_area2 + "</li>";
                                        //alert(PCbanner2)
                                    }
                                }
                            }

                            //if (!isEmpty(pc_area2) && !isEmpty(Mo_area2)) {
                            //    PCbanner += "<li>" + pc_area2 + Mo_area2 + "</li>";
                            //}
                        });

                    }


                }
            });

            $(".banner_list .area").html("<ul>" + PCbanner2 + "</ul>");
        }
    });


    //메인 띠배너
    $.ajax({
        type: "POST",
        url: "/User/MainBanner/5",
        dataType: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {

            //console.log(result.banner);
            var pc_sortnum = "";

            $(result.banner).each(function (index, list) {

                if (list.Status == "진행") {

                    if (list.Banner_Type_Code == "BTC01") {

                        pc_area3 = "        <div class=\"pc_area\">";
                        pc_area3 += "             <div class=\"area\">";
                        pc_area3 += "               <div class=\"service_text\">";
                        pc_area3 += "                   <h3>" + list.Banner_Main_Description + "</h3>";
                        pc_area3 += "                   <p>" + list.Banner_Add_Description + "</p>";
                        pc_area3 += "               </div>";
                        pc_area3 += "               <div class=\"img_con\">";
                        pc_area3 += "                   <a href=\"" + list.Link_URL + "\" target=\"" + list.NewPage_YN + "\" onclick=\"GoBanner(" + list.Banner_Item_ID + ");\">";
                        pc_area3 += "                       <img src=\"" + list.Image_URL + "\"  alt=\"축의금 송금 서비스 이미지\">"
                        pc_area3 += "                   </a>";
                        pc_area3 += "               </div>";
                        pc_area3 += "           </div>";
                        pc_area3 += "       </div>";
                        pc_sortnum = list.Sort;
                        PCbanner3 += pc_area3;
                        $(result.banner).each(function (index1, list2) {
                            // alert(list2.Status)
                            if (list2.Banner_Type_Code == "BTC02") {

                                if (list2.Status == "진행") {

                                    if (pc_sortnum == list2.Sort) {

                                        //console.log("두번째 모바일배너 sort:" + list2.Sort);
                                        Mo_area3 = "         <div class=\"m_area\">";
                                        Mo_area3 += "               <div class=\"area\">";
                                        Mo_area3 += "                   <div class=\"img_con\">";
                                        Mo_area3 += "                       <a href=\"" + list2.Link_URL + "\" target=\"" + list2.NewPage_YN + "\">";
                                        Mo_area3 += "                           <img src=\"" + list2.Image_URL + "\"  alt=\"카카오페이 이미지\">";
                                        Mo_area3 += "                       </a>";
                                        Mo_area3 += "                   </div>";
                                        Mo_area3 += "                   <div class=\"service_text\">";
                                        Mo_area3 += "                       <h3>" + list2.Banner_Main_Description + "</h3>";
                                        Mo_area3 += "                       <p>" + list2.Banner_Add_Description + "</p>";
                                        Mo_area3 += "                   </div>";
                                        Mo_area3 += "               </div>";
                                        Mo_area3 += "           </div>";

                                        // alert(Mo_area3)
                                        PCbanner3 += Mo_area3;
                                        //alert(PCbanner2)
                                        // alert(PCbanner3)
                                    }
                                }
                                else {
                                    if (pc_sortnum == list2.Sort) {

                                        //console.log("두번째 모바일배너 sort:" + list2.Sort);
                                        Mo_area3 = "         <div class=\"m_area\">";

                                        Mo_area3 += "           </div>";

                                        // alert(Mo_area3)
                                        PCbanner3 += Mo_area3;
                                        //alert(PCbanner2)
                                        // alert(PCbanner3)
                                    }

                                }
                            }

                            //if (!isEmpty(pc_area2) && !isEmpty(Mo_area2)) {
                            //    PCbanner += "<li>" + pc_area2 + Mo_area2 + "</li>";
                            //}
                        });

                    }


                }
            });
            // alert(PCbanner3)
            $(".service").append(PCbanner3);
        }
    });

}


function GoBanner(id) {
    // 배너 클릭수 업데이트

    $.ajax({
        type: "POST",
        url: "/User/Banner/Click_Update/" + id,
        dataType: "json",
        async: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {

        }
    });

}


function addComma(value) {
    alert(value);
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
}



function Update_Coupon_Use(Order_Id, Coupon_Publish_ID, Discount) {
    //alert("Update_Coupon_Use");
    $.ajax({
        type: "POST",
        url: "/Member/Update_Coupon_Use/" + Order_Id + "/" + Coupon_Publish_ID + "/" + Discount,
        async: false,
        success: function (result) {


        }
    });
}



function Update_Coupon_Use_Mo(Order_Code, Coupon_Publish_ID, Discount) {
    //alert("Update_Coupon_Use");
    // alert("/Member/Update_Coupon_Use_Mo/" + Order_Code + "/" + Coupon_Publish_ID + "/" + Discount);
    $.ajax({
        type: "POST",
        url: "/Member/Update_Coupon_Use_Mo/" + Order_Code + "/" + Coupon_Publish_ID + "/" + Discount,
        async: false,
        success: function (result) {
            //  alert("쿠폰저장:" + Order_Code);

        }
    });
}

function isMobile() {

    var UserAgent = navigator.userAgent;

    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {

        return true;

    } else {

        return false;

    }

}



var url = location.href.toLocaleUpperCase();

if (url.indexOf("MCARDSTEP") > 0 || url.indexOf("MTHANKSSTEP") > 0 || url.indexOf("MDOLLSTEP") > 0 || url.indexOf("ORDER_DETAIL") > 0) {

    url = url.split('/');

    User_Order_Chk(url.slice(-1)[0]);

}



function User_Order_Chk(ID) {

    $.ajax({
        type: "POST",
        url: "/Member/User_Order_Chk/1/" + ID,
        async: false,
        success: function (result) {

            if (parseInt(result) == 0) {
                alert("잘못된 경로입니다.");
                location.replace("/");
            }
        }
    });



}
