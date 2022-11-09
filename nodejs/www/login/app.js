const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code')
const state = urlParams.get('state')

let setCookie = (code, firstname_TH, lastname_TH, student_id, organization_name_TH, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    // d.setTime(d.getTime() + (60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "open_code=" + code + ";" + expires + ";path=/";
    document.cookie = "open_firstname_TH=" + firstname_TH + ";" + expires + ";path=/";
    document.cookie = "open_lastname_TH=" + lastname_TH + ";" + expires + ";path=/";
    document.cookie = "open_student_id=" + student_id + ";" + expires + ";path=/";
    document.cookie = "open_organization_name_TH=" + organization_name_TH + ";" + expires + ";path=/";
}

if (code) {
    axios.post('/ds_chekauth/gettoken', { code }).then(r => {
        setCookie(code, r.data.data.firstname_TH, r.data.data.lastname_TH, r.data.data.student_id, r.data.data.organization_name_TH, 1)
        window.location.replace("./../" + state);
    })
}



// POST /v1/GetToken.aspx HTTP/1.1
// Host: oauth.cmu.ac.th
// content-type: application/x-www-form-urlencoded

// code=63153448415548317175
// &redirect_uri=https://yourclientapp.com/callback
// &client_id=7J5H7qzHYC7UA3GhYzywyuwcY9wjxgA77yu9bPBb
// &client_secret=JvgfjEACUvh2hrnXujZsEAPbkBxnKYV3a2J4u28j
// &grant_type=authorization_code

