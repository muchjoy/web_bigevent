function getDel(id, time) {
    let timer = setInterval(function () {
        let index = 0
        let del = document.querySelectorAll(id)

        for (let i = 0; i < del.length; i++) {
            index++
            del[i].click()
        }
        if (index === 2) {
            clearInterval(timer)
        }
    }, time)
}