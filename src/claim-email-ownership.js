export default function () {

    let headers = new Headers({
        "Content-Type": "application/json",
    })

    let email = document.getElementById("email").value
    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "email": email }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/auth/reset-claim/`, init).then(response => {
        if (response.status == 200) {
            response.json().then(response => {
                
                /// #if DEBUG
                    console.log(response)
                /// #endif

                localStorage.setItem("standByToken", response.token)
                Auth.prepareToReceiveResetPasswordCode()
            })
        } else {
            response.json().then(err => {
                notify(err, "danger", true)
            })
        }
    })
}