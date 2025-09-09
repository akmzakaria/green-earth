const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('invisible');
        document.getElementById('spinner').classList.add('flex');
        document.getElementById('tree-container').classList.add('invisible');


        // document.getElementById('spinner').style.display = 'flex'
        // document.getElementById('word-container').style.display = 'none'

    } else {
        document.getElementById('spinner').classList.add('invisible');
        document.getElementById('tree-container').classList.remove('invisible');


        // document.getElementById('spinner').style.display = 'none'
        // document.getElementById('word-container').style.display = 'grid'
    }
}


const removeActive = () => {
    const lessonBtns = document.querySelectorAll('.catagory-btn');
    lessonBtns.forEach(btn => btn.classList.remove('active'));
}


const loadCataTree1 = () => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/plants`

    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();

            const clickBtn = document.getElementById(`catagory-btn`);
            clickBtn.classList.add('active');


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

                    <button onclick="addHistory('${plant.name}',${plant.price})" class="btn text-white w-full bg-[#15803d] rounded-full">Add to Cart</button>

                </div>
        
        `
        treeContainer1.append(card);
    })
    manageSpinner(false);

}


// ----------------------------------------------------------------------------




const loadCataTree = (id) => {
    manageSpinner(true);
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

                    <button onclick="addHistory('${plant.name}', ${plant.price})" class="btn text-white w-full bg-[#15803d] rounded-full">Add to Cart</button>

                </div>
        
        `
        treeContainer.append(card);
    })
    manageSpinner(false);

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


function displayPlants(plants) {
    const container = document.getElementById("cart-container");
    container.innerHTML = "";

    plants.forEach(plant => {
        
        const item = document.createElement("div");

        item.innerHTML = `
      
                <div class=" flex justify-between gap-10 items-center bg-[#f0fdf4] px-5 py-1">


                    <div class="">
                        <h4 class="font-medium">${plant.name}</h4>
                        <p>${plant.price} ⅹ 1</p>
                    </div>
                    <p id="clear-history" class="cursor-pointer">ⅹ</p>


                </div>

                <div class="flex justify-between items-center">
                    <p class="font-medium">Total</p>
                    <p class="font-medium">500</p>
                </div>
      
      
      
      
      
      `;

        container.appendChild(item);
    });
}


let total = 0;

const loadTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayTree(data.plants))
}

loadTrees();

const displayTree = (plants) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    plants.forEach(plant => {
        const card = document.createElement('div');

        card.innerHTML = `
                    <h1>${plant.name}</h1>
                    <p>${plant.price}</p>
                    <button onclick="addHistory('${plant.name}', ${plant.price})">Add To Cart</button>
                `;

        cardContainer.append(card);
    })

    manageSpinner(false);
}



function addHistory(name, price) {
    const historyList = document.getElementById("history-list");

    const div = document.createElement("div");
    div.className = "flex justify-between gap-10 items-center bg-[#f0fdf4] px-5 py-1 mb-3";

    div.innerHTML = `
                

                    <div>
                        <h4 class="font-medium">${name}</h4>
                        <p>${price} <i class="fa-solid fa-xmark text-sm text-gray-700"></i> 1</p>
                    </div>
                    <p onclick="removeHistory(this, ${price})" class="cursor-pointer"><i class="fa-solid fa-xmark text-lg text-red-400"></i></p>
                
            `;

    historyList.appendChild(div);


    total += price;
    updateTotal();
}

function removeHistory(button, price) {
    button.parentElement.remove();


    total -= price;
    updateTotal();
}

function updateTotal() {
    document.getElementById("total-price").textContent = total;
}
