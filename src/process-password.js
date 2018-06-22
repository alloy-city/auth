export default function (password) {
    let SHA256 = new Hashes.SHA256

    let clientKey = SHA256.hex(password)
    let email = document.getElementById("email").value
    let code = document.getElementById("code").value

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.standByToken}`
    })

    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "email": email,
            "resetPasswordCode": code,
            "clientKey": clientKey
        }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/auth/reset-create/`, init).then((response) => {
        
        /// #if DEBUG
            console.log(response)
        /// #endif
        
        return response.json()
    }).then((response) => {

        /// #if DEBUG
            console.log(response)
        /// #endif
        
        localStorage.removeItem("standBytoken")
        localStorage.setItem("token", response.token)
        Auth.requestLoggedExperience()
    }, (err) => {

        /// #if DEBUG
            console.log(err)
        /// #endif

        notify(err, "warning", true)
    })
}