export default (method, body, route, callback) => {

    let headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
    })

    let init = {
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default'
    }

    if (body){
        init.body = JSON.stringify(body)
    }

    fetch(`${apiDomain}/api/${route}`, init).then((response) => {
        if (response.status === 200) {
            response.json().then(callback)
        } else {
            console.log(response)
            notify(response.statusText, "warning", true)
        }
    })
}