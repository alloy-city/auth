export default function () {
    $(".alert").remove()

    let password = document.getElementById("password").value
    let passwordStrength = zxcvbn(password)
    let passwordConfirmation = document.getElementById("password-confirmation").value

    if (passwordStrength.score > 1) {
        if (password === passwordConfirmation) {
            Auth.processPassword(password)
        } else {
            notify(string.alerts.password.different, "warning", true)
        }
    } else {
        notify(string.alerts.password.weak, "warning", true)
    }
}