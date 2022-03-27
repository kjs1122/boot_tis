
//orderPage 가격 합계
$(document).ready(function(){
    let item = document.querySelectorAll('.payPage_item_list_price');
    let payBtn = document.querySelector('.payPage_paymant_btn');
    let itemPrice = document.querySelector('.payPage_orderitem_total_price');
    let itemPrice2 = document.querySelector('.payPage_orderitem_itemprice');
    let deliveryPrice = document.querySelector('.payPage_orderitem_delivery_price').innerHTML;
    let orderTotalPrice = document.querySelector('.payPage_orderitem_add_total');
    let point = document.querySelector('.payPage_orderitem_point_num').innerHTML;
    point = Number(point.replace(',','').replace('원',''));
    let totalPriceInput = document.querySelector('.paypage_totalprice_input');

    
    let price = 0;
    let totalPrice = 0;

    for (let i = 0; i < item.length; i++) {
        let num = parseInt(item[i].innerHTML.replace(',','').replace('원',''));
        price += parseInt(num);
    }
    
    itemPrice.innerText = price.toLocaleString();
    itemPrice2.innerHTML = price.toLocaleString();
    totalPrice = Number(deliveryPrice.replace(',','')) + price - point;
    orderTotalPrice.innerHTML = totalPrice.toLocaleString();
    payBtn.value = totalPrice.toLocaleString() + "원 결제하기";
    totalPriceInput.value = totalPrice;
});

//payPage 선택별 결제창 보이기
function cardCheck(value){
    let cardView = document.getElementById('payPage_card_view');
    let simpleView = document.getElementById('payPage_simple_view');
    let kakaopayView = document.getElementById('kakaopayment');

    const payMethoInput = document.querySelector("input[name='payMethod']");
    payMethoInput.value = value;
    console.log(payMethoInput.value);
    
    if (value == "kakaopay") {
        cardView.style.display = "none";
        simpleView.style.display = "none";
        kakaopayView.classList.add('payPage_kakaopay_on');
    } else if(value == "c"){
        cardView.style.display = "block";
        simpleView.style.display = "none";
        kakaopayView.classList.remove('payPage_kakaopay_on');
    } else if(value == "phone"){
        cardView.style.display = "none";
        simpleView.style.display = "none";
        kakaopayView.classList.remove('payPage_kakaopay_on');
    } else if (value == "card"){
        cardView.style.display = "none";
        simpleView.style.display = "none";
        kakaopayView.classList.remove('payPage_kakaopay_on');
    }
    
    ;    
};

//payPage simple 클릭이벤트
function menuClick(){
    let cardView = document.getElementById('payPage_card_view');
    let simpleView = document.getElementById('payPage_simple_view');
    let simple = document.getElementById('payPage_simple_click');
    simple.onclick = function(){
        simpleView.style.display = "block";
        cardView.style.display = "none";
    };
}

//payPage 신용카드 목록 이벤트
function cardSelect(){
    let cardList = document.getElementById('payPage_card_select_card');
    let monthList = document.getElementById('payPage_card_select_month')
    let cardListView = document.getElementById('card_select_list_card');
    let monthListView = document.getElementById('card_select_list_month');
    cardList.onclick = function(){
        cardListView.classList.toggle('card_select_list_on')
        monthListView.classList.remove('card_select_list_on')
    };
    monthList.onclick = function(){
        monthListView.classList.toggle('card_select_list_on')
        cardListView.classList.remove('card_select_list_on')
    };
};

//payPage 카드 목록 클릭
function cardSelectClick(v){
    let cardListView = document.getElementById('card_select_list_card');    
    let viewBox = document.getElementById('payPage_card_select_card');

    
    viewBox.innerText = v.innerText;
    cardListView.classList.remove('card_select_list_on');
};

//payPage 카드 할부 목록 클릭
function monthSelectClick(v){
    let viewBox = document.getElementById('payPage_card_select_month');
    let monthListView = document.getElementById('card_select_list_month');
    
    viewBox.innerText = v.innerText;
    monthListView.classList.remove('card_select_list_on');
};

//payPage 카드 선택 이벤트
function cardaddClass(v){
    let liTag = document.querySelectorAll('.payPage_pay_select_menu_list>li');    
    v.onclick = function(){

        for (let i = 0; i < liTag.length; i++) {
            if (v == liTag[i]) {
                liTag[i].classList.add('payPage_pay_menu_on');
            }else{
                liTag[i].classList.remove('payPage_pay_menu_on');
            };            
        };
        
    };
};

//payPage 간편결제 체크박스 이벤트
function simpleRadioEvent(v){
    let simpleRadio = document.querySelectorAll('.payPage_simple_radio');

    v.onclick = function(){
        for (let i = 0; i < simpleRadio.length; i++) {
            if(v == simpleRadio[i]){
                simpleRadio[i].classList.add('payPage_simple_radio_on');
            }else{
                simpleRadio[i].classList.remove('payPage_simple_radio_on');
            };
            
        };
    };
};



// 결제 페이지 유효성 검사
function payInfoCheck(){
	
	const orderName = document.querySelector("#orderName");
	const orderPhone = document.querySelector("#orderPhone");
	const orderEmail = document.querySelector("#orderEmail");
	const deliveryInfo = document.querySelector(".payPage_receiving_txt");
	const agreeCheck = document.querySelector(".agreeCheck");
	
	if(orderName.value == "") {
		alert("보내는 분 이름을 입력해주세요");
		orderName.focus();
		return false;
	} else if (orderPhone.value == "") {
		alert("보내는 분 핸드폰번호를 입력해주세요");
		orderPhone.focus();
		return false;
	} else if (orderEmail.value == "") {
		alert("보내는 분 이메일을 입력해주세요");
		orderEmail.focus();
		return false;
	} else if (deliveryInfo.innerText == "") {
		alert("받으실 분 정보를 입력해주세요");
		deliveryInfo.focus();
		return false;
	}	else if (agreeCheck.checked == false) {
		alert("개인정보 제공에 동의해주세요");
		agreeCheck.focus();
		return false;
	}
	
	return true;
	
}

//배송지 설정 팝업
function showPopUpDelivery() { 
	//창 크기 지정 
	const width = 500; 
	const height = 500; 
	//pc화면기준 가운데 정렬
	const left = (window.screen.width / 2) - (width/2); 
	const top = (window.screen.height / 4); 
	//윈도우 속성 지정
	const windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=yes, resizable=yes, titlebar=yes'; 
	//연결하고싶은url
	const url = '/shop/order/delivery?orderName=' + orderName +"&orderPhone=" + orderPhone;
	//등록된 url 및 window 속성 기준으로 팝업창을 연다. 
	window.open(url, "hello popup", windowStatus); 
}

// 결제페이지 배송지 설정
function locationAddClass(v){
    let locationRadio = document.querySelectorAll('.delivery_info_locaion_radio');   

    v.onclick = function(){
    
        for (let i = 0; i < locationRadio.length; i++) {
            if (v == locationRadio[i]) {
            	locationRadio[i].classList.add('delivery_info_locaion_radio_on');
            }else{
            	locationRadio[i].classList.remove('delivery_info_locaion_radio_on');
            };            
        };
        
    };
};

// 결제페이지 배송지 설정
function messageAddClass(v){
    let messageRadio = document.querySelectorAll('.message_simple_radio');   

    v.onclick = function(){
    
        for (let i = 0; i < messageRadio.length; i++) {
            if (v == messageRadio[i]) {
            	messageRadio[i].classList.add('message_simple_radio_on');
            }else{
            	messageRadio[i].classList.remove('message_simple_radio_on');
            };            
        };
        
    };
};

// 결제페이지 배송지 설정 NOTICE
function noticeDisplay(value) {	
	const entrance = document.querySelector(".delivery_entrance");
	const door = document.querySelector(".delivery_notice_door");
	const security = document.querySelector(".delivery_notice_security");
	const post = document.querySelector(".delivery_notice_post");
	const etc = document.querySelector(".delivery_notice_etc");
	const etcLocation = document.querySelector(".delivery_location_etc");
	
	if(value == "security") {
		door.style.display = "none";
		entrance.style.display = "none";
		security.style.display = "block";
		post.style.display = "none";
		etc.style.display = "none";
		etcLocation.style.display = "none";
	} else if (value == "post") {
		door.style.display = "none";
		entrance.style.display = "none";
		security.style.display = "none";
		post.style.display = "block";
		etc.style.display = "none";
		etcLocation.style.display = "none";
	} else if (value == "etc") {
		door.style.display = "none";
		entrance.style.display = "none";
		security.style.display = "none";
		post.style.display = "none";
		etc.style.display = "block";
		etcLocation.style.display = "block";
	} else if (value == "door") {
		door.style.display = "block";
		entrance.style.display = "block";
		security.style.display = "none";
		post.style.display = "none";
		etc.style.display = "none";
		etcLocation.style.display = "none";
	}
}

// 주문자 정보와 동일
function sameOrder(value) {
	const sameBtn = document.querySelector(".delivery_sameBtn");
	const nameInput = document.querySelector(".orderName");
	const phoneInput = document.querySelector(".orderPhone");
	
	
	if (value == "x") {
		nameInput.setAttribute("value", orderName);
		phoneInput.setAttribute("value", orderPhone);
		sameBtn.value = "y";
	} else if (value == "y"){
		nameInput.setAttribute("value", "");
		phoneInput.setAttribute("value", "");
		sameBtn.value = "x";
	}
}

// 배송지 정보 페이지 입력
function deliveryInsertInfo() {
	
	const deliveryLocationTag = opener.document.querySelector(".payPage_receiving_txt");
	const deliveryMessageTag = opener.document.querySelector(".payPage_receiving_message_time");
	const deliveryNameTag = opener.document.querySelector(".payPage_receiving_name");
	const deliveryPhoneTag = opener.document.querySelector(".payPage_receiving_phone");
	
	const entrancePwInput = opener.document.querySelector("input[name='entrancePw']");
	const etcLocationInput = opener.document.querySelector("input[name='etcLocation']");
	const deliveryLocationInput = opener.document.querySelector("input[name='deliveryLocation']");
	const deliveryMessageInput = opener.document.querySelector("input[name='deliveryMessage']");
	const deliveryNameInput = opener.document.querySelector("input[name='deliveryName']");
	const deliveryPhoneInput = opener.document.querySelector("input[name='deliveryPhone']");
	
	
	const deliveryName = document.querySelector("input[name='deliveryName']");
	const deliveryPhone = document.querySelector("input[name='deliveryPhone']");	
	const entrancePw = document.querySelector("input[name='entrancePw']").value;
	const etcLocation = document.querySelector("input[name='etcLocation']").value;
	
	if(deliveryName.value == "") {
		alert("받으실 분 이름을 입력하세요");
		deliveryName.focus();
		return false;
	} else if (deliveryPhone.value == "") {
		alert("받으실 분 핸드폰번호를 입력하세요");
		deliveryPhone.focus();
		return false;
	}
	
	let deliveryMessage = document.querySelector("input[name='deliveryMessage']:checked").dataset.name;	
	let deliveryLocation = document.querySelector("input[name='deliveryLocation']:checked").dataset.name;
	
	
	
	deliveryMessageTag.innerText = deliveryMessage;
	
	if (deliveryLocation == '기타 장소'){
		deliveryLocationTag.innerText = etcLocation;
		
	} else {
		deliveryLocationTag.innerText = deliveryLocation;
	}
	
	deliveryNameTag.innerText = deliveryName.value;
	deliveryPhoneTag.innerText = deliveryPhone.value;
	
	
	
	// input에 데이터 넣기
	entrancePwInput.value = entrancePw;
	etcLocationInput.value = etcLocation;
	deliveryLocationInput.value = deliveryLocation
	deliveryMessageInput.value = deliveryMessage
	deliveryNameInput.value = deliveryName.value;
	deliveryPhoneInput.value = deliveryPhone.value;
	
	window.close();
}

// 배송지 정보 입력창 닫기
function closePopUp() {
	window.close();
}
