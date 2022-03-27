
//장바구니 전체선택
function selectAll(selectAll){
    const checkBoxs = document.getElementsByName('cartPage_checkbox_item_list');
    checkBoxs.forEach((checkBox) => {
        checkBox.checked = selectAll.checked;
    });
};

//장바구니 선택 갯수 카운트 및 상품 가격 합계
function getCheckedCnt(){
    const query = 'input[class="cartPage_item_count_check"]:checked';
    const selectedElements = document.querySelectorAll(query);
    const selectedElementsCnt = selectedElements.length;
    document.getElementById('cartPage_item_select_num1').innerText = selectedElementsCnt;
    document.getElementById('cartPage_item_select_num2').innerText = selectedElementsCnt;
 
};

function cntCheck(){
    const query = 'input[class="cartPage_item_count_check"]:checked';
    const selectedElements = document.querySelectorAll(query);
    const selectedElementsCnt = selectedElements.length;
   
};

//장바구니 목록 갯수 카운트
function getAllListCnt(){
    const query = 'input[class="cartPage_item_count_check"]';
    const selectedElements = document.querySelectorAll(query);
    const selectedElementsCnt = selectedElements.length;
    document.getElementById('cartPage_item_all_num1').innerText = selectedElementsCnt;
    document.getElementById('cartPage_item_all_num2').innerText = selectedElementsCnt;
};

//장바구니 선택 삭제
function selectRemove(){
	const checkBoxs = document.querySelectorAll('.cartPage_item_count_check'); 
	checkBoxs.forEach((checkBox) => {	  	
		const checked = checkBox.getAttribute("checked");
		const cartNoTag = checkBox.parentNode.parentNode.lastChild.previousSibling;
		const cartNo = cartNoTag.getAttribute("href");
		
		if(checked == 'checked') {
			removeCart(cartNo);
			checkBox.parentNode.parentNode.parentNode.remove();
		}
	})
}

//장바구니에서 삭제
function removeCart(cartNo, callback, error) {
	$.ajax({
		url : '/shop/cart/' + cartNo,
		type : 'DELETE',
		success : function (result) {
			if(callback){
				callback(result);
			}
		},
		error : function(er) {
			if(error){
				error(er)
			}
		}
	});	
}

// 장바구니 결제 금액
function cartPrice() {
	let totalPrice = 0;
	const goodsPrices = document.querySelectorAll(".goodsPriceCount");

	goodsPrices.forEach((goodsPrice) => {
		const checkBox = goodsPrice.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling;
		let checked = checkBox.getAttribute("checked")
		if(checked == 'checked') {
			totalPrice = totalPrice + stringNumberToInt(goodsPrice.innerText);
		}
		
	})
	
	return priceToString(totalPrice);
}

// 장바구니 배송비
function deleivery(deliveryFee) {
	
	const deleveryFeeTag = document.querySelector(".cartPage_amount_delivery_num");
	const deleveryMessageTag = document.querySelector(".cartPage_deliveryMessage");
	const totalPriceTag = document.querySelector(".totalPrice");
	const originalDeliveryFee = deliveryFee;

	if (stringNumberToInt(totalPriceTag.innerText) >= 20000 || stringNumberToInt(totalPriceTag.innerText) <= 0){
		deliveryFee = 0;
		deleveryFeeTag.innerText = deliveryFee;
		deleveryMessageTag.innerText = "";	
	} else {	
		const lackPrice = 20000 - stringNumberToInt(totalPriceTag.innerText);
		deliveryFee = originalDeliveryFee;
		deleveryFeeTag.innerText = (priceToString(deliveryFee));
		deleveryMessageTag.innerText = (priceToString(lackPrice)+"원 추가 주문 시, 무료배송");
	}
}

// 장바구니 총 결제 금액
function amountPrice() {
	
	const amountPriceTag = document.querySelector(".amountPrice");
	const deleveryFeeTag = document.querySelector(".cartPage_amount_delivery_num");
	const totalPriceTag = document.querySelector(".totalPrice");
	const totalPrice = stringNumberToInt(totalPriceTag.innerText);
	const deleveryFee = stringNumberToInt(deleveryFeeTag.innerText);
	const amountPrice = totalPrice + deleveryFee;
	amountPriceTag.innerText = priceToString(amountPrice);
	
	const addressInput = document.querySelector(".address_input");
	
}

// 카카오 API 장바구니 배송지
function kakaoPost() {
	
	new daum.Postcode({
	    oncomplete: function(data) {
        document.querySelector(".address").value = data.address;
        document.querySelector(".zipcode").value = data.zonecode;       
    }
	
}).open();
	
}
	
// 주소 유효성 검사 AND 주소 정보 전송후 팝업 창 닫기
function closePop() {
	
	let addressInput = document.querySelector(".address");  		
	
	if(addressInput.value == ""){
		alert("주소를 입력하세요.");
		addressInput.focus();
		return true;
	}	
	
	const address = addressInput.value;
	const addressSub = document.querySelector(".addressSub").value;
	const zipcode = document.querySelector(".zipcode").value;
	const memberId = document.querySelector(".memberId").value;
	
	const addressJson = {
			address : address,
			addressSub : addressSub,
			zipcode : zipcode,
			memberId : memberId
		};		
	
	// 배송지 변경
	if (form == 'update') {
		$.ajax({
			url : '/address/cart',
			type : 'put',
			data : JSON.stringify(addressJson),
			contentType : "application/json; charset=utf-8",
			success : function() {
				opener.location.href = '/shop/cart/move/';
				window.close(); 
			},
			error : function (error) {
				alert("에러발생");
			}
		});
	// 배송지 입력
	} else {		
		$.ajax({
			url : '/address/cart',
			type : 'post',
			data : JSON.stringify(addressJson),
			contentType : "application/json; charset=utf-8",
			success : function() {
				window.close(); 
				opener.location.href = '/shop/cart/move/'
			},
			error : function () {
				alert("에러발생");
			}
		});
	};
	

}

//배송지 입력
function showPopUp() { 
	//창 크기 지정 
	const width = 500; 
	const height = 500; 
	//pc화면기준 가운데 정렬
	const left = (window.screen.width / 2) - (width/2); 
	const top = (window.screen.height / 4); 
	//윈도우 속성 지정
	const windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=yes, resizable=yes, titlebar=yes'; 
	//연결하고싶은url
	const url = '/address/cart?memberId=' + memberId;

	//등록된 url 및 window 속성 기준으로 팝업창을 연다. 
	window.open(url, "hello popup", windowStatus); 
}

//배송지 입력 (배송지 변경)
function showPopUpdate() { 
	//창 크기 지정 
	const width = 500; 
	const height = 500; 
	//pc화면기준 가운데 정렬
	const left = (window.screen.width / 2) - (width/2); 
	const top = (window.screen.height / 4); 
	//윈도우 속성 지정
	const windowStatus = 'width='+width+', height='+height+', left='+left+', top='+top+', scrollbars=yes, status=yes, resizable=yes, titlebar=yes'; 
	//연결하고싶은url
	const url = '/address/cart?memberId=' + memberId +'&form=update';

	//등록된 url 및 window 속성 기준으로 팝업창을 연다. 
	window.open(url, "hello popup", windowStatus); 
}


// 장바구니 주문전 주문 삭제(초기화)
function deleteOrder(memberId){
	
	$.ajax({
		url : "/shop/order/" + memberId,
		type : 'delete'
	});
}



//장바구니에서 주문하기
function insertOrder() {
	
	const addressInput = document.querySelector(".cartPage_address");
	
	if (addressInput.innerText == ""){
		alert("배송지를 입력하세요");
		return;
	}
	
	// 중복방지 기존 주문데이터 삭제
	deleteOrder(memberId);
	
	const query = 'input[class="cartPage_item_count_check"]:checked';
    const selectedElements = document.querySelectorAll(query);
    let deliveryFee = document.querySelector(".cartPage_amount_delivery_num").innerText;
    
    selectedElements.forEach((checkGoods) => {
    	const checkGood = checkGoods.dataset;
    	
    	const order = {
    		memberId : memberId,
    		goodsNo : checkGood.goodsno,
    		goodsCount : checkGood.goodscount,   
    		deliveryFee : parseInt(deliveryFee)
    	}
    	
    	$.ajax({
    		url : "/shop/order/insert",
    		type : "post",
    		data : JSON.stringify(order),
    		dateType : "json",
    		contentType : "application/json; charset=UTF-8"
    	});   	
    });
    
    const orderForm = document.querySelector(".order_moveForm")
    const deliveryForm = document.querySelector("input[name='deliveryFee']");
    deliveryForm.value = stringNumberToInt(deliveryFee);
       
    orderForm.submit();
}
