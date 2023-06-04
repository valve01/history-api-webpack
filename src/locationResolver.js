const app = document.querySelector("#app")

const usersEl = document.querySelector("[data-href='#/users/']")

usersEl.addEventListener("click",locationResolver(e))
 function locationResolver(e){
	let location= e.target.dataset.href
    switch (location) {
        case "#/users/":
            app.innerHTML = `
                <h1>${location}</h1>
                <p>Страница с пользователями</p>
            `
            break
        case "#/login/":
            app.innerHTML = `
                <h1>${location}</h1>

                <p>Страница логина</p>
            `
            break
        case "#/":
            app.innerHTML = `
                <h1>${location}</h1>

                <p>Главная страница</p>
            `
            break



    }
		// usersEl.addEventListener("click",locRel)
		// function locRel (){window.location.reload()}
}

window.addEventListener('load', () => {
    const location = window.location.hash

    if (location) {
        locationResolver(location)

    }
})

