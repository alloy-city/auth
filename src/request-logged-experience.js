export default function () {

    let headers = new Headers({
        "Content-Type": "application/json",
        "Language": language,
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: 'get',
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    fetch("/me", init).then((response) => {
        if (response.ok) {
            response.json().then(response => {

                // console.log(response)

                // remove social login buttons
                let g = document.getElementById("googleSignIn")
                let f = document.getElementsByClassName("fb-login-button")[0]
                if (f) f.classList.add("hidden")
                if (g) g.classList.add("hidden")

                Auth.userData = response.userData
                apiDomain = response.environmentVariables.apiDomain
                socketDomain = response.environmentVariables.socketDomain
                localStorage.setItem("userData", JSON.stringify(Auth.userData))

                if (response.userData.accessLevel > 0) {
                    if (response.userData.accessLevel >= 3){
                        Auth.teachers = response.teachers
                    }

                    string = response.strings

                    // add control-panel exclusive styles
                    let styles = document.createElement("link")
                    styles.setAttribute("rel", "stylesheet")
                    styles.setAttribute("href", "styles/control-panel.css")
                    styles.classList = "teacher"
                    document.head.appendChild(styles)

                    // set basic markup
                    document.getElementsByClassName("content")[0].innerHTML = response.page.base
                    $(".tab-content").prepend(response.page.classRoomTab)
                    $(".tab-content").append(response.page.studentsTab)

                    // teacher scripts
                    let scripts = ["modules/teacher-bundle.js"]

                    if (response.userData.accessLevel > 1) {
                        scripts.push("modules/creator-bundle.js")

                        for (let i = 0; i < response.page.creationTabs.length; i++){
                            $(".tab-content").append(response.page.creationTabs[i])
                        }
                    }

                    if (response.userData.accessLevel > 2) {
                        scripts.push("modules/coordinator-bundle.js")
                        
                        for (let i = 0; i < response.page.coordinationTabs.length; i++) {
                            $(".tab-content").append(response.page.coordinationTabs[i])
                        }
                    }
                    
                    if (response.userData.accessLevel > 3) {
                        // add admin scripts
                    }
                    
                    for (let i = 0; i < scripts.length; i++) {
                        let script = document.createElement("script")
                        script.setAttribute("src", scripts[i])
                        script.setAttribute("defer", true)
                        script.classList = "teacher"
                        document.body.appendChild(script)
                    }

                } else {
                    // student
                    // console.log("/me response:", response)

                    string = response.strings
                    Auth.chapters = response.chapters
                    localStorage.setItem("modules", JSON.stringify(Auth.modules))
                    document.getElementsByClassName("content")[0].innerHTML = response.page

                    let studentModule = document.createElement("script")
                    studentModule.setAttribute("src", "/modules/student-bundle.js")
                    document.head.appendChild(studentModule)
                    
                    let paymentModule = document.createElement("script")
                    paymentModule.setAttribute("src", "/modules/payment-bundle.js")
                    document.head.appendChild(paymentModule)

                }
            })
        } else {
            response.json().then(err => {
                console.log(err)
                localStorage.clear()
                location.reload()
            })
        }
    })
}