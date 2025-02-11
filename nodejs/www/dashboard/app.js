let val1
let val2
// console.log(val1, val2)

// const urlapi = `https://engrids.soc.cmu.ac.th/api/ds-api`
const urlapi = `http://localhost:3000/ds-api`

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
        '&state=dashboard'
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

const loginPopup = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=JDxvGSrJv9RbXrxGQAsj0x4wKtm3hedf2qw3Cr2s' +
        '&redirect_uri=http://localhost:3000/login/' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=dashboard'
    window.location.href = url;
};

let gotoIndex = () => {
    location.href = "./index.html";
}

if (code) {
    $('#profile').html(`
    <li class=" dropdown" > <a class="active" href="#" onclick="gotoProfile()"> <i class="bx bxs-user-detail"></i> <span class="ff-noto">${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
    <ul>
    <li><a href="#"><span class="ff-noto">โปรไฟล์</span> </a></li>
    <li><a href="./../manage/index.html"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
    </ul>
    </li>`)
    $('#login').html(`<a href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>`)

} else {
    $('#login').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    // gotoLogin();
}

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
});


$(document).ready(function () {
    load_data()
})

let gotodata = (txt) => {
    location.href = './../infordata/index.html?page=1&category=' + txt;
}

let numcategory = async (d) => {
    // console.log(d)
    let politics = 0;
    let nature = 0;
    let agri = 0;
    let stat = 0;
    let energy = 0;
    let science = 0;
    let religion = 0;
    let logistics = 0;
    let society = 0;
    let urban = 0;
    let economy = 0;
    let study = 0;
    let health = 0;
    let travel = 0;

    await d.map(i => {
        // console.log(i)
        i == "การเมืองและการปกครอง" ? politics += 1 : null;
        i == "ทรัพยากรธรรมชาติและสิ่งแวดล้อม" ? nature += 1 : null;
        i == "เกษตกรรมและการเกษตร" ? agri += 1 : null;
        i == "สถิติทางการ" ? stat += 1 : null;
        i == "โครงสร้างพื้นฐานระบบและพลังงาน" ? energy += 1 : null;
        i == "วิทยาศาสตร์เทคโนโลยีดิจิทัลและนวัตกรรม" ? science += 1 : null;
        i == "ศาสนาศิลปและวัฒนธรรม" ? religion += 1 : null;
        i == "การคมนาคมและโลจิตจิกส์" ? logistics += 1 : null;
        i == "สังคมและสวัสดิการ" ? society += 1 : null;
        i == "เมืองและภูมิภาค" ? urban += 1 : null;
        i == "เศรษฐกิจการเงินและอุตสาหกรรม" ? economy += 1 : null;
        i == "การศึกษา" ? study += 1 : null;
        i == "สาธาณสุขและสุขภาพ" ? health += 1 : null;
        i == "การท่องเที่ยว" ? travel += 1 : null;
        i == "" ? length += 1 : null;
    })

    // console.log(nature)
    $('#all').text(d.length)
    $('#politics').text(politics)
    $('#nature').text(nature)
    $('#agri').text(agri)
    $('#stat').text(stat)
    $('#energy').text(energy)
    $('#science').text(science)
    $('#religion').text(religion)
    $('#logistics').text(logistics)
    $('#society').text(society)
    $('#urban').text(urban)
    $('#economy').text(economy)
    $('#study').text(study)
    $('#health').text(health)
    $('#travel').text(travel)

}

let valCategorys = []
let load_data = () => {
    axios.get(urlapi + '/getdata').then(r => {
        var data = r.data.data;

        var arr = [];
        var category = [];
        var arrKeyword = [];
        var arrfileform = [];
        var New_post = data.slice(0, 4)

        data.map(i => {

            arr.push(i)
            var group = JSON.parse(i.d_groups)
            group.map(e => category.push(e))

            var keyword = JSON.parse(i.d_keywords)
            keyword.map(e => arrKeyword.push(e))

            var fileform = JSON.parse(i.d_datafiles)
            var dta = fileform[0]
            arrfileform.push(dta)
            // dta.map(e => {
            // })

            numcategory(category)
        })
    })
}


let gotodownload = (id_data) => {
    localStorage.setItem('id_data', id_data);
    window.location.href = './../detail/index.html';

}
// $('#login').click(function () { loginPopup() })

const datauser = {}



let gotomanage = (id_data) => {
    if (Object.values(datauser).length !== 0 || val1 || val2) {
        var name = datauser.username
        var id = datauser.userid
        localStorage.setItem('value1', name ? name : val1);
        localStorage.setItem('value2', id ? id : val2);
        // window.open('./manage/index.html', '_blank');
        window.location.href = './../manage/index.html';
    } else {
        loginPopup()
    }

}
let gotoinput = (id_data) => {
    if (Object.values(datauser).length !== 0 || val1 || val2) {
        var name = datauser.username
        var id = datauser.userid
        localStorage.setItem('value1', name ? name : val1);
        localStorage.setItem('value2', id ? id : val2);
        window.location.href = './../input/index.html';
    } else {
        loginPopup()
    }

}

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (val1 == 'administrator' && val2 == 'admin') {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a class="btn-memu" href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i><span class="ff-noto">${firstname_TH}</span></a>
        <a class="btn-memu" href="./../input/index.html"><i class="bi bi-file-earmark-arrow-up"></i> <span>นำเข้าข้อมูล</span> </a>
        <a class="btn-memu" href="./../manage/index.html"><i class="bi bi-tools"></i> <span>จัดการข้อมูล</span> </a>
        <a class="btn-memu" href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    } else if (code) {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ </a>
        <a class="btn-memu" href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i> ${firstname_TH} </a>
        <a class="btn-memu" href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i> ออกจากระบบ </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i> ติดต่อเรา </a>
      </div>`
    } else {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> หน้าหลัก </a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> ฐานข้อมูลสารสนเทศ</a>
        <a class="btn-memu" href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i> เข้าสู่ระบบ </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i>ติดต่อเรา</a>
      </div>`
    }
    Swal.fire({
        title: '<h3><span class="ff-noto"><b>เมนู</b></span></h3>',
        // icon: 'info',
        html: content + '',
        confirmButtonText: 'ปิด',
        confirmButtonColor: '#000000',
        // background: '#50d49f',
        customClass: {
            container: 'ff-noto',
            title: 'ff-noto',
        },
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
    })
})


AOS.init();
