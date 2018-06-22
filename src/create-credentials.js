export default function () {
    
    clearNotifications()
    let container = document.getElementById("password-container")
    container.classList = "form-group"
    let email = document.getElementById("email").value
    localStorage.setItem("email", email)
    let password = document.getElementById("password").value
    let passwordStrength = zxcvbn(password)

    //validate new password
    if (passwordStrength.score > 1) {
        // console.log(email, password)

        // client-side password hashing from scripts/hash.js
        let SHA256 = new Hashes.SHA256
        let clientKey = SHA256.hex(password)
        // console.log(clientKey)

        let headers = new Headers({
            "Content-Type": "application/json",
        })

        let init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "email": email, "clientKey": clientKey }),
            mode: 'cors',
            cache: 'default'
        }

        fetch(`${apiDomain}/api/auth/create/`, init).then((response) => {
            // console.log(response)
            return response.json()
        }).then((response) => {
            // console.log(response)
            localStorage.setItem("standByToken", response.token)
            Auth.receiveCode()
        })
    } else {
        // console.log("Weak password.")
        let span = document.createElement("span")
        let textNode = document.createTextNode(string.auth.weakPassword)

        span.appendChild(textNode)
        span.classList = "help-block notification"
        container.appendChild(span)
        container.classList = "form-group has-error"
        notify(string.auth.weakPassword, "warning", true)
    }
}