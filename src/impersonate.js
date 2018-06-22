import db from './database'

export default () => {
    db("GET", null, "auth/impersonate", (response) => {
        // student
        // console.log("/me response:", response)

        // eliminate teachers+ elements
        let teacherElements = document.getElementsByClassName("teacher")
        for (let el of teacherElements){
            el.remove()
        }

        string = response.strings
        Auth.chapters = response.chapters
        localStorage.setItem("modules", JSON.stringify(Auth.modules))
        document.getElementsByClassName("content")[0].innerHTML = response.page

        let studentModule = document.createElement("script")
        studentModule.setAttribute("src", "/modules/student-bundle.js")
        document.head.appendChild(studentModule)

        let paymentModule = document.createElement("script")
        paymentModule.setAttribute("src", "/modules/payment-bundle.js")
        // paymentModule.setAttribute("defer", true)
        document.head.appendChild(paymentModule)
    })
}