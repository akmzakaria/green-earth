const removeActive = () => {
    const lessonBtns = document.querySelectorAll('.catagory-btn');
    lessonBtns.forEach(btn => btn.classList.remove('active'));
}


const loadCataTree1 = () => {

    const url = `https://openapi.programming-hero.com/api/plants`

    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();

            const clickBtn = document.getElementById(`catagory-btn`);
            clickBtn.classList.add('active');

            displayCataTree(data.plants)


            displayCataTree1(data.plants)
        })

}

const displayCataTree1 = (plants) => {
    const treeContainer1 = document.getElementById('tree-container');
    treeContainer1.innerHTML = '';

    plants.forEach(plant => {
        const card = document.createElement('div');
        card.innerHTML = `
        
                <div class="bg-white p-5 flex flex-col gap-2 rounded-xl m-5 justify-between w-[280px] ">

                    <img class="h-50 w-full mx-auto rounded-xl" src="${plant.image}" alt="">

                    <h3 onclick ="loadTreeDetails(${plant.id})" class="font-bold cursor-pointer">${plant.name}</h3>

                    <p class="text-[#525b65]">${plant.description}</p>

                    <div class="flex flex-row justify-between items-center">

                        <button class="bg-[#dcfce7] rounded-full px-3 py-1 w-fit text-[#15803d]">${plant.category}</button>

                        <p class="font-bold">${plant.price}</p>
                    </div>

                    <button class="btn text-white w-full bg-[#15803d] rounded-full">Add to Cart</button>

                </div>
        
        `
        treeContainer1.append(card);
    })

}


// --------------------------------------------------------------




const loadCataTree = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();

            const clickBtn = document.getElementById(`catagory-btn-${id}`);
            clickBtn.classList.add('active');

            displayCataTree(data.plants)
        })
}


const displayCataTree = (plants) => {
    // console.log(plants)
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';



    //     {
    //     "id": 1,
    //     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
    //     "name": "Mango Tree",
    //     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
    //     "category": "Fruit Tree",
    //     "price": 500
    // }


    plants.forEach(plant => {
        // console.log(plant)
        const card = document.createElement('div');
        card.innerHTML = `
        
                <div class="bg-white p-5 flex flex-col gap-2 rounded-xl m-5 justify-between w-[280px] ">

                    <img class="h-50 w-full mx-auto rounded-xl" src="${plant.image}" alt="">

                    <h3 onclick ="loadTreeDetails(${plant.id})" class="font-bold cursor-pointer">${plant.name}</h3>

                    <p class="text-[#525b65]">${plant.description}</p>

                    <div class="flex flex-row justify-between items-center">

                        <button class="bg-[#dcfce7] rounded-full px-3 py-1 w-fit text-[#15803d]">${plant.category}</button>

                        <p class="font-bold">${plant.price}</p>
                    </div>

                    <button class="btn text-white w-full bg-[#15803d] rounded-full">Add to Cart</button>

                </div>
        
        `
        treeContainer.append(card);
    })

}


const loadCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(json => displayCatagories(json.categories));
}

const displayCatagories = (catagories) => {

    // 1. get the container & empty
    const cataContainer = document.getElementById('cata-container');
    cataContainer.innerHTML = '';

    // 2. get into each catagories

    for (let catagory of catagories) {

        // 3. create element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `

        <button id="catagory-btn-${catagory.id}" onclick = "loadCataTree(${catagory.id})" class="btn catagory-btn hover:bg-[#15803d] w-50 bg-[#f0fdf4] hover:text-white">

        ${catagory.category_name}

        </button>
        `

        // 4. append into container
        cataContainer.append(btnDiv);
    }

}


loadCatagories();


const loadTreeDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    console.log(url)
    const res = await fetch(url)
    const details = await res.json()
    displayTreeDetails(details.plants)

};

const displayTreeDetails = (plants) => {
    console.log(plants)

    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `

        <h2 class="text-xl text-[#1F2937]">${plants.description}</h2>

    `
    

    document.getElementById("word_modal").showModal();

}



