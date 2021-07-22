// Query url parameter schema: %7B%22itemId%22%3A${object_id}%2C%22version%22%3A%22222%22%7D%2C

// TODO: Convert string copied from Maplestory Cash Shop Update into a usable search object.
const hairComponents = [
    "Choppy Bangs Long Hair",
    "Foggy Graceful Hair"
]

// Each component is instanced by an item identifier
const characterComponents = {
    "head_id": 2012,
    "skin_id": 12012,
    "face_id": 27038,
    "overall_id": 1053650,
    "face_accessory_id": 1012672,
    "hair_id": 47547,
    "hat_id": 1005668,
}

// TODO: Restructure URL to contain action components
const buildCharacterURL = (components) => {
    // Base URL
    let url = "https://maplestory.io/api/character/";
    Object.keys(components).forEach(function(key) {
        url += `%7B%22itemId%22%3A${components[key]}%2C%22version%22%3A%22222%22%7D%2C`;
    })
    url += `/stand1/2?showears=false&showLefEars=false&showHighLefEars=undefined&resize=3&name=&flipX=false&bgColor=0,0,0,0`;

    // let url = "https://maplestory.io/api/character/%7B%22itemId%22%3A2000%2C%22version%22%3A%22220%22%7D%2C%7B%22itemId%22%3A12000%2C%22version%22%3A%22220%22%7D%2C%7B%22itemId%22%3A60000%2C%22version%22%3A%22223%22%7D%2C%7B%22itemId%22%3A50047%2C%22version%22%3A%22223%22%7D%2C%7B%22itemId%22%3A1042129%2C%22version%22%3A%22223%22%7D%2C%7B%22itemId%22%3A1062112%2C%22version%22%3A%22223%22%7D%2C%7B%22itemId%22%3A1012636%2C%22animationName%22%3A%22default%22%2C%22version%22%3A%22223%22%7D/stand1/0?showears=false&showLefEars=false&showHighLefEars=undefined&resize=1&name=&flipX=true&bgColor=0,0,0,0"
    return url;
}

const convertComponentsToItemNames = (components) => {
    const componentNames = [];
    Object.keys(components).forEach(function(key) {
        fetch(`https://maplestory.io/api/GMS/222/item/${components[key]}`)
        .then(response => response.json())
        .then(data => {
            if (data) componentNames.push(data.description.name);
        });
    })
    return componentNames;
}

// TODO: Create function to generate component based on string item name
const convertItemNameToComponent = () => {
    
}

// Fetch character data

fetch(buildCharacterURL(characterComponents))
.then(response => response.blob())
.then(data => {

    var url = URL.createObjectURL(data);
    const image = new Image();
    image.src = url;

    document.body.appendChild(image);

});

console.log(convertComponentsToItemNames(characterComponents));