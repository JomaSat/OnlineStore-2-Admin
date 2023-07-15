const cartModal = document.querySelector('.cartModal');
const addLaptopModalCloseBtn = document.querySelector('.cartCloseBtn');
const addBtn  = document.querySelector('.addLaptopBtn');
const cardsRoot = document.querySelector('.cards');
const formItems = document.getElementsByClassName('formItem');
const modalAddBtn = document.querySelector('.modalAddBtn');
const closes = document.querySelector('.close')

const MAIN_URL = 'http://localhost:8080';

const openAddLaptopModal = () => cartModal.classList.remove('cartModalHidden');

addBtn.onclick = openAddLaptopModal;

const closeAddLaptopModal = () => cartModal.classList.add('cartModalHidden');

addLaptopModalCloseBtn.onclick = closeAddLaptopModal;



const getLaptops = async () => {
    try {
        const { data } = await axios.get(`${MAIN_URL}/laptops`);
        renderLaptops(data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

   


const renderLaptops = (data) => {
    cardsRoot.innerHTML = "";

    data.forEach(laptop => {
        const div = document.createElement('div');
        div.classList.add('card');

        const { id, name, image, price } = laptop;

        div.innerHTML = `
        <h2>${name}</h2>
        <img src="${image}" alt="${name}">
        <p>${price}</p>
        <button class="deleteBtn">Delete</button>
        `;


        
        const deleteBtn = div.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => deleteLaptop(id)); 

        cardsRoot.append(div);
    });
};



const deleteLaptop = async (laptopId) => {
    try {
        await axios.delete(`${MAIN_URL}/laptops/${laptopId}`);
        getLaptops(); 
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};



const getLaptopById = async (id) => {
    try {
        const {data} = await axios.get(`${MAIN_URL}/laptops/${id}`);
        return data;
    } catch {
        console.error(error);
        alert(error.message);
    }
}



const aditlaptop = async (id) => {
    const data = await getLaptopById(id);

    Object.keys(data).forEach((item) => {
        const formElement = document.querySelector(`*[name=${item}]`)
        if (formElement) {
            formElement.value = data[item];
        }
    })

    openAddLaptopModal();
}




const addNewLaptop = async (event) => {
    event.preventDefault();
    const data = [...formItems].reduce((acc, formItem) => {
        acc[formItem.name] = formItem.value;
        return acc;
    }, {});

    try {
        const response = await axios.post(`${MAIN_URL}/laptops`, {
            ...data,
            "win-code": 1.2312312312487237e+24
        });
        const newLaptop = response.data;
        getLaptops(); 

        const div = document.createElement('div');
        div.classList.add('card');

        const { id, name, image, price } = newLaptop;

        div.innerHTML = `
        <img src="${image}" alt="${name}">
            <h2>${name}</h2>
            <p>${price}</p>
            <button class="deleteBtn">Delete</button>

        `;

        const deleteBtn = div.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => deleteLaptop(id)); 

        
        aditBtn.addEventListener('click', () => deleteLaptop(id)); 


        cardsRoot.prepend(div); 
        closeAddLaptopModal();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};  

modalAddBtn.onclick = addNewLaptop;



getLaptops();



