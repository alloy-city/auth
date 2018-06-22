export default function () {
    // console.log("confirmCode")
    let code = document.getElementById("code").value
    let token = localStorage.getItem("standByToken")
    token = `Bearer ${token}`
    // console.log(code, token)

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": token
    })

    let init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "email": localStorage.email, "code": code }),
        mode: 'cors',
        cache: 'default'
    }

    fetch(`${apiDomain}/api/auth/code/`, init).then((response) => {
        // console.log(response)
        return response.json()
    }).then((response) => {
        // console.log(response)

        if (response){
            localStorage.removeItem("standByToken")
            localStorage.setItem("token", response.token)
            Auth.requestLoggedExperience()
        } else {
            console.log("Wrong code.")
            notify(string.auth.wrongCode, "danger", true)
        }
    })
}