// Header 메뉴바 고정
$(document).ready(function() {
	
    var wind = $(window),
    header = $('#gnbMenu'),
    headerOffsetTop = header.offset().top;


    wind.scroll(function() {
    	
       if(wind.scrollTop()>= headerOffsetTop) {
        header.addClass('sticky');
        
       } else {
        header.removeClass('sticky');
      }
       
    });
    
    const login_user = document.querySelector('#login_user');  
    const login_user_menu = document.querySelector('.login_user_menu');  
    
    login_user.addEventListener('mouseover', function() {
    	
    	login_user_menu.style.display = 'block';
    });
    login_user_menu.addEventListener('mouseout', function() {
    	
    	login_user_menu.style.display = 'none';
	});
   
});


// 전체 검색
function search_form(){
	const searchForm = document.querySelector('#search_frm');
	const searchInput = document.querySelector("input[name='keyword']");
	searchForm.submit();
}


// 인덱스 Java Script
$(document).ready(function(){

    
    let totalNum = $(".main_img_box img").length;
    let imgWidth = $(".slider li").width();
    let imgTotalWidth = imgWidth * totalNum;

    let roll = setInterval(next, 10000);
    
    init()
    
    $(".nextBtn").click(function(){
        clearInterval(roll);
        next();
    });

    $(".prevBtn").click(function(){
        clearInterval(roll);
        prev();
    });

    function init() {
    $(".page span:first").text(1);
    $(".page span:last").text(totalNum); 
    $(".slider").width( imgTotalWidth );
    }

    $(".main_img_box > button").mouseleave(function(){
        let roll = setInterval(next, 1000);
    });

    function next() {
        $(".slider").stop().animate({marginLeft: -imgWidth}, 500, "swing", function(){
            $(".slider>li:first").appendTo(".slider");
            $(".slider").css({marginLeft: 0});
            let num = $(".slider>li:first").children("img").attr("alt");
            $(".page span:first").text(num);
        });
    }
    function prev() {
        $(".slider").css({marginLeft: -imgWidth}); 
        $(".slider>li:last").prependTo(".slider");
        $(".slider").animate({marginLeft: 0}, 500, "swing", function(){
            let num = $(".slider>li:first").children("img").attr("alt");
            $(".page span:first").text(num);
        });
    }


    $('.main_content_list').bxSlider({  

        minSlides: 4,

        maxSlides: 4,
      
        slideWidth: 300,

        pager : false,

        HideControlOnEnd : true
      
    });

});

// 콤마 숫자형 문자열을 정수로 변환
function stringNumberToInt(stringNumber){
    return parseInt(stringNumber.replace(/,/g , ''));
}

// 숫자 문자열을 콤마 숫자형으로 
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}























// notice form
function notice_search_frm(){
	if(document.getElementById("notice_input_box").value == ''){
		alert("검색어를 입력해주세요.")
		return false;
	}
	document.getElementById('notice_frm').submit();
}
//notice page click addClass
function notice_page_addClass(v){
    let num = document.querySelectorAll('.notice_page_num');
    for (let i = 0; i < num.length; i++) {
        if(v == num[i]){
            num[i].classList.add('notice_page_on');
        }else if(v != num[i]){
            num[i].classList.remove('notice_page_on');
        }
        
    }
}

//noticewriter 등록 버튼
function noticeWriter_form(){
    document.getElementById('noticewriter_frm').submit();
}

//noticeView textarea 공백제거
$(document).ready(function(){
    document.querySelector('.noticeView_inp_content').value.trim();
    document.querySelector('.noticeWrite_inp_content').value.trim();
});

