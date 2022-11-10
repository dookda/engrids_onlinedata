var val1 = localStorage.getItem('value1');
var val2 = localStorage.getItem('value2');

// const urlapi = `https://engrids.soc.cmu.ac.th/api/ds-api`
const urlapi = `http://localhost:3000/ds-api`

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// let params = new URLSearchParams(url.search);
const Search = urlParams.get('search')
if (Search) { $('#txt_search').val(Search) }

const Page = urlParams.get('page')
const Categories = urlParams.get('category')
const Keyword = urlParams.get('keyword')
const Fileform = urlParams.get('fileform')


/////////

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
        '&state=infordata'
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

let isDisabled;

////////

$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
});

const url = new URL(window.location.href);
let search_data = () => {
    var value = $('#txt_search').val();
    url.searchParams.set('page', 1);
    url.searchParams.set('search', value);
    window.location.href = url
}
let search_page = (value) => {
    url.searchParams.set('page', value);
    window.location.href = url
    // console.log(url.search.toString())
}
let search_category = (value) => {
    // console.log($(this))
    url.searchParams.set('page', 1);
    url.searchParams.set('category', value);
    window.location.href = url
    // console.log(url.search.toString())
}
let reset_Categories = () => {
    url.searchParams.delete('category')
    window.location.href = url
}
let search_key = (key) => {
    url.searchParams.set('page', 1);
    url.searchParams.set('keyword', key);
    window.location.href = url
    // console.log(url.search.toString())
}
let reset_key = () => {
    url.searchParams.delete('keyword')
    window.location.href = url
}
let search_fileform = (value) => {
    url.searchParams.set('page', 1);
    url.searchParams.set('fileform', value);
    window.location.href = url
    // console.log(url.search.toString())
}
let reset_Fileform = () => {
    url.searchParams.delete('fileform')
    window.location.href = url
}

let valCategorys = []
let loadData = (disbtn) => {
    axios.get(urlapi + '/getdata').then(r => {
        console.log(r);
        var data = r.data.data;

        var arr = [];
        var category = [];
        var arrKeyword = [];
        var arrfileform = [];
        var New_post = data.slice(0, 4)

        data.map(i => {
            if (Search || Categories || Keyword || Fileform) {
                if (Search && Categories && Keyword && Fileform) {
                    var filsearch = i.d_name.search(Search);
                    var filgroup = i.d_groups.search(Categories);
                    var filkey = i.d_keywords.search(Keyword);
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)

                    if (filsearch >= 0 && filgroup >= 0 && filkey >= 0 && filfile >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search && Categories && Keyword) {
                    var filsearch = i.d_name.search(Search);
                    var filgroup = i.d_groups.search(Categories);
                    var filkey = i.d_keywords.search(Keyword);
                    if (filsearch >= 0 && filgroup >= 0 && filkey >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search && Categories && Fileform) {
                    var filsearch = i.d_name.search(Search);
                    var filgroup = i.d_groups.search(Categories);
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)
                    if (filsearch >= 0 && filgroup >= 0 && filfile >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search && Keyword && Fileform) {
                    var filsearch = i.d_name.search(Search);
                    var filkey = i.d_keywords.search(Keyword);
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)
                    if (filsearch >= 0 && filfile >= 0 && filkey >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Categories && Keyword && Fileform) {
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)
                    var filgroup = i.d_groups.search(Categories);
                    var filkey = i.d_keywords.search(Keyword);
                    if (filfile >= 0 && filgroup >= 0 && filkey >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search && Categories) {
                    // console.log('search', 'category')
                    var filsearch = i.d_name.search(Search)
                    var filgroup = i.d_groups.search(Categories)
                    if (filgroup >= 0 && filsearch >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search && Keyword) {
                    // console.log('search', 'category')
                    var filsearch = i.d_name.search(Search)
                    var filkey = i.d_keywords.search(Keyword)
                    if (filkey >= 0 && filsearch >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search && Fileform) {
                    // console.log('search', 'Fileform')
                    var filsearch = i.d_name.search(Search)
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)

                    if (filkey >= 0 && filfile >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Categories && Keyword) {
                    // console.log('category', 'key')
                    var filgroup = i.d_groups.search(Categories)
                    var filkey = i.d_keywords.search(Keyword)
                    if (filgroup >= 0 && filkey >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Categories && Fileform) {
                    // console.log('category', 'Fileform')
                    var filgroup = i.d_groups.search(Categories)
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)
                    if (filgroup >= 0 && filfile >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Keyword && Fileform) {
                    // console.log('key', 'Fileform')
                    var fil = i.d_keywords.search(Keyword)
                    var txt = `"type":"${Fileform}"`
                    var filfile = i.d_datafiles.search(txt)
                    if (fil >= 0 && filfile >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Search) {
                    // console.log('search')
                    var search = i.d_name.search(Search)
                    if (search >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Categories) {
                    // console.log('category')
                    var fil = i.d_groups.search(Categories)
                    if (fil >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Keyword) {
                    // console.log('key')
                    var fil = i.d_keywords.search(Keyword)
                    if (fil >= 0) {
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))
                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                } else if (Fileform) {
                    // console.log('fileform')
                    var txt = `"type":"${Fileform}"`
                    var fil = i.d_datafiles.search(txt)
                    if (fil >= 0) {
                        // console.log(i)
                        arr.push(i)
                        var group = JSON.parse(i.d_groups)
                        group.map(e => category.push(e))
                        var keyword = JSON.parse(i.d_keywords)
                        keyword.map(e => arrKeyword.push(e))

                        var a = JSON.parse(i.d_datafiles)
                        var dta = a[0]
                        arrfileform.push(dta)
                    }
                }
                // else if (Fileform) {
                //     var arr = JSON.parse(i.d_datafiles)
                //     var dta = arr[0]
                //     console.log(dta)
                // }
            } else {
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
            }
        })

        genCategory(category)
        genKeyword(arrKeyword)
        genFileformat(arrfileform)

        New_post.map(i => {
            var t = new Date(i.d_tnow).toISOString().split('T')
            var date = new Date(t).toLocaleDateString('th-TH')
            var content = $(`
            <div class="post-item">
            <h4><a class="ff-noto pointer" onclick="gotodownload('${i.d_id}')">${i.d_name}</a></h4>
            <time datetime="${t}">${date}</time>
            </div>`)
            $(`#newpost`).append(content)
        })

        if (Page) {
            var a, b;
            a = (Page - 1) * 6
            b = (Page * 6) - 1
            var select;
            if (Page == 1) { select = arr.slice(a, b) }
            else {
                select = arr.slice(Number(a - 1), b)
            }
            select.map(i => {
                var t = new Date(i.d_tnow).toISOString().split('T')
                var date = new Date(t).toLocaleDateString('th-TH')
                var group = JSON.parse(i.d_groups)
                // console.log(i.d_tnow)
                var content = $(`
            <article class="entry">
            <h2 class="entry-title">
                <a class="pointer" onclick="gotodownload('${i.d_id}')">${i.d_name}</a>
            </h2>

            <div class="entry-meta">
                <ul>
                    <li class="d-flex align-items-center"><i class="bi bi-person"></i>${i.d_username}</li>
                    <li class="d-flex align-items-center"><i class="bi bi-clock"></i><span>${date}</span>
                    </li>
                    <li class="d-flex align-items-center"><i class="bi bi-download"></i> <a
                            href="blog-single.html">${i.d_sd} download</a></li>
                </ul>
            </div>

            <div class="entry-content">
                <p>
                    ${i.d_detail}
                </p>
                <span class="ff-noto">กลุ่มชุดข้อมูล: ${group}</span>
                <div class="read-more">
                    <button class="btn btn-success" id="downloadBtn" onclick="gotodownload('${i.d_id}')" ${code == '' ? 'disabled' : ''} >Download</button>
                </div>
            </div>`)
                $(`#content-data`).append(content)
            })
        } else {
            var select = arr.slice(0, 4)
            select.map(i => {
                var t = new Date(i.d_tnow).toISOString().split('T')
                var date = new Date(t).toLocaleDateString('th-TH')
                var group = JSON.parse(i.d_groups)
                // console.log(i.d_tnow)
                var content = $(`
            <article class="entry">
            <h2 class="entry-title">
                <a class="pointer" onclick="gotodownload('${i.d_id}')">${i.d_name}</a>
            </h2>

            <div class="entry-meta">
                <ul>
                    <li class="d-flex align-items-center"><i class="bi bi-person"></i>${i.d_username}</li>
                    <li class="d-flex align-items-center"><i class="bi bi-clock"></i><span>${date}</span>
                    </li>
                    <li class="d-flex align-items-center"><i class="bi bi-download" ></i> <a
                            href="blog-single.html">${i.d_sd} download</a></li>
                </ul>
            </div>

            <div class="entry-content">
                <p>
                    ${i.d_detail}
                </p>
                <span class="ff-noto">กลุ่มชุดข้อมูล: ${group}</span>
                <div class="read-more">
                    <button class="btn btn-success" id="downloadBtn" onclick="gotodownload('${i.d_id}')" ${code == '' ? 'disabled' : ''}>Download</button>
                </div>
            </div>`)
                $(`#content-data`).append(content)
                console.log(code);
            })
        }
        if (arr.length == 0) {
            var content = $(`
            <div class="section-title">
            <h3><span class="ff-noto">ไม่พบข้อมูล</span></h3>
            </div>`)
            $(`#content-data`).append(content)
        }

        $('#data_val').text(arr.length)
        pageLength(arr.length)

    })
}


let genCategory = (data) => {
    let category = [
        'การท่องเที่ยว', 'สาธาณสุขและสุขภาพ', 'การศึกษา', 'เศรษฐกิจการเงินและอุตสาหกรรม',
        'เมืองและภูมิภาค', 'สังคมและสวัสดิการ', 'การคมนาคมและโลจิตจิกส์', 'ศาสนาศิลปและวัฒนธรรม', 'วิทยาศาสตร์เทคโนโลยีดิจิทัลและนวัตกรรม',
        'โครงสร้างพื้นฐานระบบและพลังงาน', 'ทรัพยากรธรรมชาติและสิ่งแวดล้อม', 'การเมืองและการปกครอง', 'เกษตกรรมและการเกษตร', 'สถิติทางการ'
    ]
    let arr = []
    // console.log(data)
    category.map(e => {
        var filter = data.filter(i => i == e)
        arr.push({ category: e, value: filter.length })
        // console.log(filter)
    })
    // category.reduce((map, item, index) => {
    // let a = data.filter(e => e == item)
    // map[item] = a.length;
    // arr.push({ category: item, value: a.length })
    // map[index] = { category: item, value: a.length }
    // return map;
    // }, {})
    // console.log(groupByCategory)
    arr.sort((a, b) => {
        const valA = a.value
        const valB = b.value
        if (valA < valB) {
            return -1;
        }
        if (valA > valB) {
            return 1;
        }
        return 0;
    });
    arr.reverse()
    // <span>(${i.value})</span>
    arr.map(i => {
        // console.log(i)
        var content = $(`<li value="${i.category}"><a class="ff-noto pointer" onclick="search_category('${i.category}')"><p>${i.category} </p></a></li>`)
        $('#listcategory').append(content)
    })

    if (Categories) {
        // console.log(Categories)
        Categories
        var content = $(`<button type="button" class="btn-close btn-close-tag2"
        aria-label="Close" onclick="reset_Categories()"></button>`)
        $(`#listcategory li[value=${Categories}] a`).addClass("has-ff")
        $(`#listcategory li[value=${Categories}]`).append(content)
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

let genKeyword = (data) => {
    var unique = data.filter(onlyUnique);
    var arr = [];
    unique.map(e => {
        var filter = data.filter(i => i == e)
        arr.push({ tag: e, value: filter.length })
    })
    arr.sort((a, b) => {
        const valA = a.value
        const valB = b.value
        if (valA < valB) {
            return -1;
        }
        if (valA > valB) {
            return 1;
        }
        return 0;
    });
    arr.reverse()
    var showTop10 = arr.slice(0, 9)
    showTop10.map(i => {
        var content = $(`<li value="${i.tag}"><a class="ff-noto pointer" onclick="search_key('${i.tag}')">${i.tag}</a></li>`)
        $('#listtag').append(content)
    })

    if (Keyword) {
        var content = $(`<button type="button" class="btn-close btn-close-tag"
        aria-label="Close" onclick="reset_key()"></button>`)
        $(`#listtag li[value=${Keyword}]`).addClass("bg01").append(content)
    }

}

let genFileformat = (data) => {
    // console.log(data)
    let Files = ['docx', 'doc', 'xlsx', 'xls', 'csv', 'pdf', 'rar', 'zip']
    let Links = ['URL', 'API', 'GD']

    var arr = []
    var arr0 = []

    var arrFiles = [];
    var arr1 = [];

    var arrLinks = [];
    var arr2 = [];

    data.map(i => {
        if (i.Files) {
            var f = i.Files
            f.map(e => {
                var type = e.type
                Files.map(res => {
                    var match = type.match(res)
                    if (match) {
                        arr.push(match[0])
                        arrFiles.push(match[0])
                    }
                })
            })
        } else if (i.Links) {
            var l = i.Links
            l.map(e => {
                var type = e.type
                Links.map(res => {
                    var match = type.match(res)
                    if (match) {
                        arr.push(match[0])
                        arrLinks.push(match[0])
                    }
                })
            })
        }
    })
    if (arr.length > 0) {
        Files.map(e => {
            var filter = arr.filter(i => i == e)
            arr0.push({ category: e, value: filter.length })
        })
        Links.map(e => {
            var filter = arr.filter(i => i == e)
            arr0.push({ category: e, value: filter.length })
        })
    }

    arr0.sort((a, b) => {
        const valA = a.value
        const valB = b.value
        if (valA < valB) {
            return -1;
        }
        if (valA > valB) {
            return 1;
        }
        return 0;
    });
    arr0.reverse()
    arr0.map(i => {
        // if (i.value !== 0) {
        var content = $(`<li value="${i.category}"><a class="ff-noto pointer text-capitalize" onclick="search_fileform('${i.category}')"><p>${i.category !== 'GD' ? i.category : 'Google Drive'} <span>(${i.value})</span></p></a></li>`)
        $('#listfileformat').append(content)
        // }
    })

    if (Fileform) {
        var score = $(`#listfileformat`).children("li").length;
        // console.log(score)
        var content = $(`<button type="button" class="btn-close btn-close-tag2"
        aria-label="Close" onclick="reset_Fileform()"></button>`)
        $(`#listfileformat li[value=${Fileform}] a`).addClass("has-ff")
        $(`#listfileformat li[value=${Fileform}]`).append(content)

        if (score == 0 && Fileform) {
            var content = $(`<li value="${Fileform}"><a class="ff-noto pointer text-capitalize has-ff" onclick="search_fileform('${Fileform}')"><p>${Fileform !== 'GD' ? Fileform : 'Google Drive'} <span>(${score})</span></p></a>
            <button type="button" class="btn-close btn-close-tag2" aria-label="Close" onclick="reset_Fileform()"></button></li>`)
            $('#listfileformat').append(content)
        }
    }
}

let pageLength = (number) => {
    var page = Math.ceil((number / 5))
    for (var i = 0; i < page; i++) {
        var content = $(`<li value="p${i + 1}"><a onclick="search_page('${i + 1}')">${i + 1}</a></li>`)
        $('#listpage').append(content)
    }
    if (Page) {
        $(`#listpage li[value=p${Page}]`).addClass('active')
    } else {
        $(`#listpage li:first-child`).addClass('active')
    }
}

let gotodownload = (id_data) => {
    localStorage.setItem('id_data', id_data);
    // var name = datauser.username
    // var id = datauser.userid
    // localStorage.setItem('value1', name ? name : val1);
    // localStorage.setItem('value2', id ? id : val2);
    window.location.href = './../detail/index.html';
}


let logout = () => {
    localStorage.clear();
    window.location.href = './../dashboard/index.html'
}


$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    if (val1 == 'administrator' && val2 == 'admin') {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a class="btn-memu" href="./../input/index.html"><i class="bi bi-file-earmark-arrow-up"></i> <span>นำเข้าข้อมูล</span> </a>
        <a class="btn-memu" href="./../manage/index.html"><i class="bi bi-tools"></i> <span>จัดการข้อมูล</span> </a>
        <a type="button" class="btn-memu" onclick="logout()"><i class="bi bi-door-closed"></i> <span>ออกจากระบบ</span> </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    } else if (val1 !== null && val2 !== null) {
        content = `
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a type="button" class="btn-memu" onclick="logout()"><i class="bi bi-door-closed"></i> <span>ออกจากระบบ</span> </a>
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    } else {
        content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <a class="btn-memu" href="./../dashboard/index.html"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span></a>
        <a class="btn-memu" href="./../infordata/index.html"><i class="bi bi-box"></i> <span>ฐานข้อมูลสารสนเทศ</span></a>
        <a type="button" class="btn-memu" onclick="loginPopup()"><i class="bi bi-door-open"></i><span>เข้าสู่ระบบ</span></a>
       
        <a class="btn-memu" href="https://engrids.soc.cmu.ac.th/" disabled><i class="bi bi-phone"></i><span>ติดต่อเรา</span></a>
      </div>`
    }
    Swal.fire({
        title: '<h3><span class="ff-noto"><b>เมนู</b></span></h3><hr>',
        // icon: 'info',
        html: content + '<hr>',
        confirmButtonText: 'ปิด',
        customClass: {
            container: 'ff-noto',
            title: 'ff-noto',
        },
        // showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,
    })
})

if (code) {
    $('#profile').html(`<a href="#" onclick="gotoProfile()"><i class="bx bxs-user-detail"></i><span class="ff-noto">${firstname_TH}</span></a>`)
    $('#login').html(`<a href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>`)
    loadData(false)
} else {
    $('#login').html(`<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`);
    // gotoLogin();
    loadData(true)
}

