import db from './database'

export default function () {
    clearNotifications()

    let password = document.getElementById("password").value
    let SHA256 = new Hashes.SHA256
    let clientKey = SHA256.hex(password)

    let headers = new Headers({
        "Content-Type": "application/json",
    })

    db("POST", { "id": Auth.userId, "clientKey": clientKey }, "auth/login/", response => {
        
        /// #if DEBUG
            console.log(response)
        /// #endif

        localStorage.setItem("token", response.token)
        Auth.requestLoggedExperience()
    })
}