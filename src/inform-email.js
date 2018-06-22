import * as changeDOM from './change-DOM'

export default function () {
    clearNotifications()
    let container = document.getElementById("email-container")
    container.classList = "form-group"
    let email = document.getElementById("email").value.toLowerCase()
    let valid = validator.isEmail(email)

    /// #if DEBUG
        console.log(valid)
    /// #endif

    if (valid) {
        
        /// #if DEBUG
            console.log("Email is valid.")
        /// #endif

        let headers = new Headers({
            "Content-Type": "application/json",
        })

        let init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "email": email }),
            mode: 'cors',
            cache: 'default'
        }

        fetch(`${apiDomain}/api/auth/find/`, init).then((response) => {
            
            /// #if DEBUG
                console.log(response)
            /// #endif
            
            if (response.status == 204) return 0
            else return response.json()
        }).then((response) => {
            
            /// #if DEBUG
                console.log(response)
            /// #endif

            if (response && response.confirmedEmail) {
                
                /// #if DEBUG
                    console.log("Account found; confirmed email; has server key")
                    console.log(response)
                /// #endif

                changeDOM.goodAccount()
                Auth.userId = response.id
            } else if (response) {
                /// #if DEBUG
                    console.log("Account found; no confirmed email; no server key")
                    console.log(response)
                /// #endif
                changeDOM.unconfirmedEmail()
            } else {
                /// #if DEBUG
                    console.log(response)
                    console.log("No account found with this email.")
                /// #endif
                changeDOM.noAccount()
            }
        })
    } else {
        /// #if DEBUG
            console.log("Bad email")
        /// #endif

        let span = document.createElement("span")
        let textNode = document.createTextNode(string.auth.badEmail)

        span.appendChild(textNode)
        span.classList = "help-block notification"
        container.appendChild(span)
        container.classList = "form-group has-error"
        notify(string.auth.badEmail, "warning", true)
    }
}