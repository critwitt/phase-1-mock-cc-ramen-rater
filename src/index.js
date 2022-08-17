// write your code here
const ramenMenu = document.querySelector("#ramen-menu");
const mainCard = document.querySelector("#ramen-detail")
const form = document.querySelector("#new-ramen");
const editForm = document.querySelector("#edit-ramen");

function renderMenu (data) {

    const img = document.createElement("img");
    img.src = data.image;
    img.className = "detail-image";
    ramenMenu.append(img);

    img.addEventListener("click", () => {

        const name = document.createElement("h2");
        const restaurant = document.createElement("h3");
        const img = document.createElement("img");
        const rating = document.createElement("h3");
        const comment = document.createElement("p");

        name.textContent = data.name;
        name.className = "name";
        restaurant.textContent = data.restaurant;
        restaurant.className = "restaurant";
        img.src = data.image;
        img.className = "detail-image";
        rating.textContent = data.rating;
        comment.textContent = data.comment;

        mainCard.querySelector(".detail-image").src = img.src;
        mainCard.querySelector(".name").textContent = name.textContent;
        mainCard.querySelector(".restaurant").textContent = restaurant.textContent;
        document.querySelector("#rating-display").textContent = rating.textContent;
        document.querySelector("#comment-display").textContent = comment.textContent;
    })
}

function handleEdit (e) {
    e.preventDefault();

    const edit = {
        rating: e.target["new-rating"].value,
        comment: e.target["new-comment"].value
    }

    // document.querySelector("#rating-display").textContent = edit.rating;
    // document.querySelector("#comment-display").textContent = edit.comment;
    // console.log()
    // fetch(`http://localhost:3000/ramens${mainCard.id}`, {
    //     method: "PATCH",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(edit)
    // })

}

function handleForm (e) {
    e.preventDefault();
    
    const data = {
        name: e.target["new-name"].value,
        restaurant: e.target["new-restaurant"].value,
        image: e.target["new-image"].value,
        rating: e.target["new-rating"].value,
        comment: e.target["new-comment"].value
    }

    renderMenu(data)

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

}

form.addEventListener("submit", handleForm)
editForm.addEventListener("submit", handleEdit)

fetch("http://localhost:3000/ramens")
.then(res => res.json())
.then(data => data.forEach(ramen => renderMenu(ramen)))
.catch(err => console.log(err))