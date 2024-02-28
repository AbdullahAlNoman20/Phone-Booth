// console.log("Connected");


const loadPhone = async (searchText = '13', isShowAll) =>{

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);

}


const displayPhones = (phones,isShowAll)=>{
    // console.log(phones);


    const phoneContainer = document.getElementById('phone-container');

    // Clear Container
    phoneContainer.textContent = '';


    // Show All Button
    const ShowAllContainer = document.getElementById('showAll-Container');

    if(phones.length > 12 && !isShowAll){

        ShowAllContainer.classList.remove('hidden');
    }

    else{
        ShowAllContainer.classList.add('hidden');
    }





    // console.log('Show All ',isShowAll);
    // Display Only 10 Phone if not show all

    if(!isShowAll){
        phones = phones.slice(0,12);
    }






    phones.forEach(phone => {
        // console.log(phone)


        // Create A Div

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl p-5` ;
        phoneCard.innerHTML = `
        
        <figure><img src="${phone.image}" alt="" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-end ">
            <button onclick="handelShowDetail('${phone.slug}')" class="btn btn-outline btn-accent w-full ">Show Details</button>
            </div>
        </div>
        
        `;

// Append child
        phoneContainer.appendChild(phoneCard);

    });


    // Hide loading Icon
    toggleLoadingIcon(false);
    


}



// Details Page Button

    const handelShowDetail = async(id)=>{
        // console.log(id);


        // Load existing ID's Data 
        const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);

        const data = await res.json();

        const phone = data.data;

        showPhoneDetails(phone);
    }


    // Show Phone Details
    const showPhoneDetails = (phone)=>{

        console.log(phone);

        const phoneName = document.getElementById('showPhoneName');
        phoneName.innerText = phone.name;


        const showDetailContainer = document.getElementById('detailContainer');

        showDetailContainer.innerHTML = `
        
        <img src="${phone.image}" alt="" />
        <p> <span>Brand:</span> ${phone.brand} </p>
        <p> <span>Storage:</span> ${phone.mainFeatures.storage} </p>
        <p> <span>Release:</span> ${phone.releaseDate} </p>
        <p> <span>Memory:</span> ${phone.mainFeatures.memory} </p>
        <p> <span>Display Size:</span> ${phone.mainFeatures.displaySize} </p>
        <p> <span>GPS:</span> ${phone.others.GPS} </p>
        <p> <span>USB:</span> ${phone.others.USB} </p>
        `;



        showDetailsModal.showModal();
    }



    // Search Button

    const handleSearch = (isShowAll)=>{

    // console.log("search");

    toggleLoadingIcon(true);

        const searchField =document.getElementById('search-Field');
        const searchText = searchField.value;

        console.log(searchText);

        loadPhone(searchText, isShowAll);


    }


    const toggleLoadingIcon = (isloading) => {

        const loadingIcon = document.getElementById('loading-icon');
        if(isloading){
            loadingIcon.classList.remove('hidden');
        }

        else{

            loadingIcon.classList.add('hidden');
        }
        


    }

    // Handel Show All Button
    const handelShowAll = ()=>{

        handleSearch(true);

    }


loadPhone();