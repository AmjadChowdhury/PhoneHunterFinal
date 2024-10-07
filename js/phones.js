const phonesLoad = async(searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()

    const phones = data.data
    displayData(phones,isShowAll)
    
}

const displayData = (phones,isShowAll) => {
    // console.log(phones)
    // 1. Ceate parent div
    const phonesContainer = document.getElementById('phonesContainer')
    // remove previous child...
    phonesContainer.textContent = ''

    const showContainer = document.getElementById('showContainer')
    if(phones.length > 12 && !isShowAll){
        showContainer.classList.remove('hidden')
    }
    else{
        showContainer.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0,12)
    }
    phones.forEach(phone => {
        console.log(phone)

        // 2. create div..
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-[#FFFFFF99] shadow-xl'
        // 3. Set innerHTML..
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Deatils</button>
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneCard)
    })
    loaderSpinner(false)
}


function handleSearch(isShowAll){
    loaderSpinner(true)
    const inputField = document.getElementById('inputField')
    const inputText = inputField.value

    // console.log(inputText)
    phonesLoad(inputText,isShowAll)

}

const loaderSpinner = (isLoading) => {
    const loader = document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('hidden')
    }
    else{
        loader.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true)
}

const handleShowDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data.data)
    phoneDetails(data.data)
}

const phoneDetails = (phone) => {
    const detailsContent = document.getElementById('detailsContent')
    detailsContent.innerHTML = `
        <div class="flex justify-center">
            <img src=${phone.image} class="">
        </div>
        <p class="text-4xl font-extrabold text-center my-2">${phone.name}</p>
        <p class="text-2xl font-bold"><span class="text-blue-600">Brand : </span>${phone.brand}</p>
        <p class="text-2xl font-bold"><span class="text-blue-600">Memory : </span>${phone.mainFeatures.memory}</p>
        <p class="text-2xl font-bold"><span class="text-blue-600">Storage : </span>${phone.mainFeatures.storage}</p>
        <p class="text-2xl font-bold"><span class="text-blue-600">Display Size :</span> ${phone.mainFeatures.displaySize}</p>
    `

    showDeatilsModal.showModal()
}


phonesLoad()
