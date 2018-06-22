export default function () {
    console.log("verifyResetPasswordCode()")

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.standByToken}`
    })

    let email = document.getElementById("email").value
    let code = document.getElementById("code").value
    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "email": email, "resetPasswordCode": code }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/auth/reset-proof/`, init).then((response) => {
        if (response.status === 200) {
            response.json().then(response => {
                // console.log(response)
                Auth.prepareToCreateNewPassword()
            })
        } else {
            response.json().then(err => {
                console.log(err)
                notify(string.auth.wrongCode, "warning", true)
            })
        }
    })
}