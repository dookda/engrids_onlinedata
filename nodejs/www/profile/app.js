
let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const code = getCookie("open_code");
const firstname_TH = getCookie("open_firstname_TH");
const lastname_TH = getCookie("open_lastname_TH");
const student_id = getCookie("open_student_id");
const organization_name_TH = getCookie("open_organization_name_TH");

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost:3000/login/' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=profile'
    window.location.href = url;
}

let gotoLogout = () => {
    document.cookie = "open_code=; max-age=0; path=/;";
    document.cookie = "open_firstname_TH=; max-age=0; path=/;";
    document.cookie = "open_lastname_TH=; max-age=0; path=/;";
    document.cookie = "open_student_id=; max-age=0; path=/;";
    document.cookie = "open_organization_name_TH=; max-age=0; path=/;";
    gotoIndex()
}

let gotoIndex = () => {
    location.href = "./../dashboard/index.html";
}

let gotoProfile = () => {
    location.href = "./../profile/index.html";
}

let loadData = () => {
    document.getElementById("std_name").value = `${firstname_TH} ${lastname_TH}`
    document.getElementById("std_id").value = `${student_id}`
    document.getElementById("std_org").value = `${organization_name_TH}`
}

if (code) {
    $('#profile').html(`<a href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i><span class="ff-noto">${firstname_TH}</span></a>`)
    $('#login').html(`<a href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>`)
    loadData()
} else {
    $('#login').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    gotoLogin();
}



