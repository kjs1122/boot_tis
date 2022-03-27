
//로그인 유효성
function login_ok(){
    const id = document.getElementById("id");
    const pw = document.getElementById("password");
    const login_form = document.querySelector('.login_form');
    const login_error = document.querySelector('.login_error_span');
    
    if(id.value == ""){
        alert("아이디를 입력하세요.");
        id.focus();
        return false;
    };

    if(pw.value == ""){
        alert("비밀번호를 입력하세요.");
        pw.focus();
        return false;
    };

    login_form.submit();

};


