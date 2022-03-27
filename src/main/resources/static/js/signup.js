
//회원가입 유효성
function signupform_check(){
    var id = document.getElementById("userid");
    var pw1 = document.getElementById("userpw1");
    var pw2 = document.getElementById("userpw2");
    var name = document.getElementById("username");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var male = document.getElementById("male");
    var female = document.getElementById("female");
    var none = document.getElementById("none");
    var year = document.getElementById("year");
    var month = document.getElementById("month");
    var day = document.getElementById("day");
    var reg = /^[0-9]+/g;

    if(id.value == ""){
        alert("아이디를 입력하세요.");
        id.focus();
        return false;
    };

    if (pw1.value !== pw2.value) {
        alert("비밀번호가 일치하지 않습니다..");
        pd2.focus();
        return false;
    };

    if (name.value == "") {
        alert("이름을 입력하세요.");
        name.focus();
        return false;
    };

    if (email.value == "") {
        alert("이메일 주소를 입력하세요.");
        email.focus();
        return false;
    };

    if (!reg.test(phone.value)) {
        alert("전화번호는 숫자만 입력할 수 있습니다.");
        phone.focus();
        return false;
    };

    if (!reg.test(year.value)) {
        alert("생년월일은 숫자만 입력할 수 있습니다.");
        year.focus();
        return false;
    };

    if (!reg.test(month.value)) {
        alert("생년월일은 숫자만 입력할 수 있습니다.");
        month.focus();
        return false;
    };

    if (!reg.test(day.value)) {
        alert("생년월일은 숫자만 입력할 수 있습니다.");
        day.focus();
        return false;
    };

    if (!female.checked && !male.checked && !none.checked) {
        alert("성별을 선택해 주세요.");
        none.focus();
        return false;
    };

    document.signup_form.submit();
};
// 회원가입 성별 RADIO버튼
function genderRadioBtn(v){
	const radioLabel = document.querySelectorAll('.signup_select_input_label');
	
	v.onclick = function() {
		for(let i = 0; i < radioLabel.length; i++){
			if(v == radioLabel[i]) {
				radioLabel[i].classList.add('signup_select_input_label_on');
			} else
				radioLabel[i].classList.remove('signup_select_input_label_on');
		}
	}
	
}


// 아이디 중복 체크
function checkId() {
	
	
	const memberIdInput = document.querySelector('input[name="memberId"]');
	const overLapId = document.querySelector('input[name="overLapId"]');
	const memberId = memberIdInput.value;
	const overlapSuccess = document.querySelector('.checK_id_overlap_success');
	const overlapError = document.querySelector('.checK_id_overlap_error');
	
	if(memberId == ""){
		alert("아이디를 입력해주세요");
		memberIdInput.focus();
		return;
	}
	
	$.ajax({
		url : '/member/signup/check_id/' + memberId,
		type : 'get',
		contentType : 'application/text; charset=UTF-8',
		success : function(res) {
			overLapId.value = 'y';
			overlapSuccess.style.display = 'block';
			overlapError.style.display = 'none';
			alert(res);
			
		},
		error : function (error) {
			overLapId.value = 'n';
			alert('이미 존재하는 아이디 입니다');
			alert(error.responseText);
		}
	});
}


// 이메일 중복 체크
function checkEmail() {
	
	const emailInput = document.querySelector('input[name="email"]');
	const emailOverlapInput = document.querySelector('input[name="emailOverlap"]');
	let email = emailInput.value;
	let emailOverlap = emailOverlapInput.value;
	
	if (email == "") {
		alert("이메일을 입력하세요");
		emailInput.focus();
		return;
	} else if (email.indexOf('@') == -1){
		alert("잘못된 이메일 형식입니다");
		emailInput.focus();
		return;
	} 
	
	const com = email.indexOf('.co');
	
	if (com > 0) {
		if (email.substr(com) == '.com') {
			email = email.substr(0,(email.length - 1));
		} else {
			alert("잘못된 이메일 형식입니다");
			emailInput.focus();
			return;
		}	
	}
	
	$.ajax({
		url : '/member/signup/check_email/' + email,
		type : 'get',
		contentType : 'application/text; chartset=UTF-8',
		success : function(result) {		
			emailOverlapInput.value = 'y';
			emailInput.setAttribute('readonly', 'readonly');
			alert(result);
		},
		error : function(error) {
			emailOverlapInput.value = 'n';
			alert(error.responseText);
		}		
	})	
}

// 핸드폰 인증번호
let auth = "";
let running = false;

function phoneAuthh() {
	
	const phoneInput = document.querySelector('input[name="phone"]');
	const phoneAuthDiv = document.querySelector('.phone_auth');
	const timer = document.querySelector('.phone_auth_timer');
	const phone = phoneInput.value;
	
	console.log(phone);
	
	if (phone == ''){
		alert('핸드폰 번호를 입력해주세요');
		phoneInput.focus();
		return;
	}
	
	$.ajax({
		url : '/member/signup/sms/' + phone,
		type : 'get',
		contentType : 'application/text; charset=UTF-8',
		success : function(res) {
			auth = res;
			console.log(auth);
			alert('인증번호를 전송했습니다');
			phoneInput.setAttribute('readonly', 'readonly');
			phoneAuthDiv.style.display = 'block';
			timer.style.display = 'block';
			
			let time = 180000;
			let min = 3;
			let sec = 60;
			
			
			timer.innerText = min + ' : ' + '00';
			
			function timerTime() {
				
				AUTHTIME = setInterval(function() {
			
			        time = time - 1000;
			        
			        min = time / (60*1000); 

			       if(sec > 0){ 
			            sec = sec - 1;
			            timer.innerText = Math.floor(min) + ' : ' + sec;		           
			        }
			        if(sec===0){
			            sec = 60;
			            timer.innerText = Math.floor(min) + ' : ' + '00'
			        } 
			        
			    },1000); 
					
				running = true;
			}
			
			if(running) {
				console.log("클리어");
				clearInterval(AUTHTIME);
				timer.innerText = '';
				timerTime();
			} else {		
				timerTime();
				console.log(running);
			}
						
			setTimeout(function() {
				clearInterval(AUTHTIME);
				timer.innerText = '인증시간이 만료되었습니다';
				auth = Math.floor(Math.random() * 100000)
				console.log(auth);
				
			}, 180000);
			
		},
		error : function(er) {
			alert("인증번호 전송에 실패했습니다");
		}
	});	
}

// 핸드폰 인증번호 검증
function authCheck() {
	const phoneAuthInput = document.querySelector('input[name="phoneAuth"]');
	const phoneAuthCheck = document.querySelector('input[name="phoneAuthCheck"]');
	const phoneAuth = phoneAuthInput.value;
	const authSuccess = document.querySelector('.phone_auth_success');
	const authError = document.querySelector('.phone_auth_error');
	const timer = document.querySelector('.phone_auth_timer');
	
	if (phoneAuth == "") {
		alert('인증번호를 입력해주세요');
		phoneAuthInput.focus();
		return;
	} 
	
	if (phoneAuth == auth) { 			
		phoneAuthInput.setAttribute('disabled', true);
		authSuccess.style.display = 'block';
		authError.style.display = 'none';
		timer.style.display = 'none';
		phoneAuthCheck.value = 'y';
	} else {
		authSuccess.style.display = 'none';
		authError.style.display = 'block';
		phoneAuthCheck.value = 'n';
	}
}

// 주소 검색 카카오 API
function SignUpPost() {
	
	new daum.Postcode({
	    oncomplete: function(data) {
        document.querySelector('.address').value = data.address;
        document.querySelector('.zipcode').value = data.zonecode;       
    }
	
}).open();
	
}

// 주소 저장
function signupAddress() {
		
	const addressModal = document.querySelector('input[name="addressModal"]').value;
	const addressSubModal = document.querySelector('input[name="addressSubModal"]').value;
	const zipcodeModal = document.querySelector('input[name="zipcodeModal"]').value;

	const jusoInput = document.querySelector('.signup_jusosearch_input');
	const jusoDiv = document.querySelector('.signup_jusosearch_div');
	
	if (addressModal == "") {
		alert("주소를 검색해주세요");
		return;
	} else if (addressSubModal == "") {
		alert("상세주소를 입력해주세요");
		return;
	} 
	
	const addressInput = document.querySelector('input[name="address"]');
	const addressSubInput =  document.querySelector('input[name="addressSub"]');
	const zipcodeInput = document.querySelector('input[name="zipcode"]');
	
	addressInput.value = addressModal;
	addressSubInput.value = addressSubModal;
	zipcodeInput.value = zipcodeModal;
	
	jusoInput.style.display = 'block';
	document.querySelector(".juso_background").className = "juso_background";
}



//회원가입 유효성
function signUpBtn(){
   
	const memberId = document.querySelector('input[name="memberId"]');
	const overLapId = document.querySelector('input[name="overLapId"]');
	const memberPw = document.querySelector('input[name="memberPw"]');
	const memberPw2 = document.querySelector('input[name="memberPw2"]');  
	const memberName = document.querySelector('input[name="memberName"]');
	const email = document.querySelector('input[name="email"]');
	const emailOverlap = document.querySelector('input[name="emailOverlap"]'); 
	const phone = document.querySelector('input[name="phone"]');
	const phoneAuth = document.querySelector('input[name="phoneAuth"]'); 
	const phoneAuthCheck = document.querySelector('input[name="phoneAuthCheck"]'); 
	const address = document.querySelector('input[name="address"]');
	const addressSub = document.querySelector('input[name="addressSub"]');
	const zipcode = document.querySelector('input[name="zipcode"]');
	const gender = document.querySelector('input[name="gender"]:checked'); 
	const year = document.querySelector('input[name="birth_year"]'); 
	const month = document.querySelector('input[name="birth_month"]'); 
	const day = document.querySelector('input[name="birth_day"]'); 
	const birth = document.querySelector('input[name="birth"]');
	const addressModal = document.querySelector('input[name="addressModal"]');
	const addressSubModal = document.querySelector('input[name="addressSubModal"]');
	const zipcodeModal = document.querySelector('input[name="zipcodeModal"]');
	const reg = /^[0-9]+$/;

    if(memberId.value == ""){
        alert("아이디를 입력하세요.");
        memberId.focus();
        return false;
    };
    
    if(overLapId.value == "n"){
    	alert("중복체크를 해주세요");
    	memberId.focus();
    	return false;
    };
    
    if(memberPw.value == ""){
    	alert("비밀번호를 입력하세요.");
    	memberPw.focus();
    	return false;
    };

    if (memberPw.value != memberPw2.value) {
        alert("비밀번호가 일치하지 않습니다..");
        memberPw2.focus();
        return false;
    };

    if (memberName.value == "") {
        alert("이름을 입력하세요.");
        memberName.focus();
        return false;
    };

    if (email.value == "") {
        alert("이메일 주소를 입력하세요.");
        email.focus();
        return false;
    };
    if (emailOverlap.value == "n") {
    	alert("이메일 중복체크를 해주세요");
    	email.focus();
    	return false;
    };

    if (phone.value == "") {
        alert("핸드폰번호를 입력해주세요");
        phone.focus();
        return false;
    };
    if (phoneAuthCheck.value == "n") {
    	alert("핸드폰 인증을 해주세요");
    	phone.focus();
    	return false;
    };
    if (address.value == "") {
    	alert("주소를 입력해주세요");
    	return false;
    };
    if (!female.checked && !male.checked && !none.checked) {
        alert("성별을 선택해 주세요.");
        none.focus();
        return false;
    };

    if (!reg.test(year.value)) {
        alert("생년월일은 숫자만 입력할 수 있습니다.");
        year.focus();
        return false;
    };

    if (!reg.test(month.value)) {
        alert("생년월일은 숫자만 입력할 수 있습니다.");
        month.focus();
        return false;
    };

    if (!reg.test(day.value)) {
        alert("생년월일은 숫자만 입력할 수 있습니다.");
        day.focus();
        return false;
    };
    
    const checkboxes = document.querySelectorAll('input[name="ordAgree"]');
    
    checkboxes.forEach((checkbox) => {
    	checkbox.checked
    	if (checkbox.checked == false) {
    		alert("이용약관에 동의해주세요");
    		checkbox.focus();
    		return false;
    	}
    })

    memberPw2.setAttribute('disabled', true);
    phoneAuth.setAttribute('disabled', true);
    year.setAttribute('disabled', true);
    month.setAttribute('disabled', true);
    day.setAttribute('disabled', true);
    addressModal.setAttribute('disabled', true);
    addressSubModal.setAttribute('disabled', true);
    zipcodeModal.setAttribute('disabled', true);
    
    const birthValue = year.value + '-' + month.value + '-' + day.value;
    console.log(birthValue);
    birth.value = birthValue;
    
    const form = document.querySelector('.signup_form').submit();
   
};

// 전체 선택
function selectAll(selectAll) {
	
	const checkboxes = document.querySelectorAll('input[name="ordAgree"]');
	
	checkboxes.forEach((checkbox) => {
		checkbox.checked = selectAll.checked;	
	})
	
}

// 개별 선택 숫자에 따라 전체 선택
function checkSelectAll(checkSelectAll){
	
	const checkboxes = document.querySelectorAll('input[name="ordAgree"]');
	const checked = document.querySelectorAll('input[name="ordAgree"]:checked');
	const selectAll = document.querySelector('#selectAllBox');
	
	if(checkSelectAll.checked) {
		checkSelectAll.value = 'y';
	} else {
		checkSelectAll.value = 'n';
	}
	
	if (checkboxes.length ==  checked.length) {
		selectAll.checked = true;
	} else {
		selectAll.checked = false;
	}
	
}
 
// 약관 팝업창 열기
function noticePopup() {
	
	const popup = document.querySelector('.agreed_notice_back');
	
	popup.style.display = 'block';
}

// 약관 팝업창 닫기
function noticeClose(){
	
	const popup = document.querySelector('.agreed_notice_back');
	
	popup.style.display = 'none';
}

