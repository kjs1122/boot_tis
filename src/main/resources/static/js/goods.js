// 모달창에서 장바구니 담기
function put(cart) {
	$.ajax({
		url : '/shop/cart/put',
		type : 'POST',
		data : JSON.stringify(cart),
		contentType : "application/json; charset=utf-8",
		dataType : 'text',
		success : function(result) {
			alert(result);
		},
		error : function(error) {
			alert(error.responseText);
		}
	});
}

//itemView 상세페이지 탭메뉴
$(document).ready(function(){
    document.getElementsByClassName('itemView_tab_menu_tit')[0].onclick = function(){click1()};
    function click1(){
        document.getElementsByClassName('itemView_tab_menu_tit')[0].classList.add('tab_menu_tit_on');
        document.getElementsByClassName('itemView_tab_menu_tit')[1].classList.remove('tab_menu_tit_on');
        document.getElementsByClassName('itemView_tab_menu_tit')[2].classList.remove('tab_menu_tit_on');
    };
    document.getElementsByClassName('itemView_tab_menu_tit')[1].onclick = function(){click2()};
    function click2(){
        document.getElementsByClassName('itemView_tab_menu_tit')[1].classList.add('tab_menu_tit_on');
        document.getElementsByClassName('itemView_tab_menu_tit')[0].classList.remove('tab_menu_tit_on');
        document.getElementsByClassName('itemView_tab_menu_tit')[2].classList.remove('tab_menu_tit_on');
    };
    document.getElementsByClassName('itemView_tab_menu_tit')[2].onclick = function(){click3()};
    function click3(){
        document.getElementsByClassName('itemView_tab_menu_tit')[2].classList.add('tab_menu_tit_on');
        document.getElementsByClassName('itemView_tab_menu_tit')[0].classList.remove('tab_menu_tit_on');
        document.getElementsByClassName('itemView_tab_menu_tit')[1].classList.remove('tab_menu_tit_on');
    };
});

// itemView Count Button
function countBtn(btn) {

	const countInput = document.querySelector('.itemView_count_input');
	const priceTag = document.querySelector('.itemView_total_price');
	const goodsPrice = document.querySelector('.itemView_price').innerText;
	
	if (btn.getAttribute('class') == 'itemView_btn itemViewDown') {
		
		let count = countInput.value;		
		if (count == 1) return;	
		countInput.value = count - 1;
		const price =   stringNumberToInt(goodsPrice);
		priceTag.innerText = priceToString(price * countInput.value);
		
	} else if (btn.getAttribute('class') == 'itemView_btn itemViewUp'){
		
		let count = countInput.value;		
		countInput.value = parseInt(count) + 1;
		const price =   stringNumberToInt(goodsPrice);
		priceTag.innerText = priceToString(price * countInput.value);
	}
}

// itemView 장바구니 담기
function itemViewCart(){
	
	const count = document.querySelector('.itemView_count_input').value;
	const cart = {
			goodsNo : goodsNo,
			memberId : memberId,
			cartCount : count
	}
	console.log(cart);

	// 장바구니 담기 ajax
	put(cart);

}

//상품번호로 상품정보 조회
function get(goodsNo, callback, error) {
	$.get("/shop/cart/" + goodsNo, function(result) {
		if(callback){
			callback(result);
		}
	}).fail(function(xhr, status, err) {
		if(error){
			error(err);
		}
	})
}