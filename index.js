// const loadAllPlants = () => {
//     fetch('https://openapi.programming-hero.com/api/plants')
//         .then(res => res.json())
//         .then(json => console.log(json))
// }





const loadCataTree1 = () => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/plants`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCataTree1(data.plants))

}

const displayCataTree1 = (plants) => {
    // console.log(plants)
    const treeContainer1 = document.getElementById('tree-container');
    treeContainer1.innerHTML = '';



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

                    <h3 class="font-bold">${plant.name}</h3>

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
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCataTree(data.plants))

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

                    <h3 class="font-bold">${plant.name}</h3>

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
    // console.log(catagories)

    const cataContainer = document.getElementById('cata-container');
    cataContainer.innerHTML = '';

    // 2. get into each catagories

    for (let catagory of catagories) {
        // 3. create element
        // console.log(catagories)
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `

        <button id="" onclick = "loadCataTree(${catagory.id})" class="btn catagory-btn hover:bg-[#15803d] w-50 bg-[#f0fdf4]">

        ${catagory.category_name}

        </button>
        `

        // 4. append into container

        cataContainer.append(btnDiv);
    }

}


loadCatagories();


displayAllPlants = (plants) => {
    const allPlants = document.getElementById('cata-btn');
    allPlants.innerHTML = '';

}




