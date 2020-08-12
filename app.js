document.addEventListener('DOMContentLoaded', ()=>{

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

            const long = position.coords.longitude
            const lat= position.coords.latitude
   
            getWeather(lat, long)
            .then(data => {
                const {temp} = data.main
                const {description, icon} = data.weather[0]
                const {name} = data

                currentLocationWeather(temp,description,name)
                createIcon(icon)
                eventForConvert(temp)
                
            })
        })

    }else{
        h1.textContent="This doesnt work fam. You messed up"
    }


   
    
});
//Document query Selectors
const degreeSection = document.querySelector('.degree-section')
const temperatureDegree = document.querySelector('.temperature-degree')
const temperatureDescription = document.querySelector('.temperature-description')
const locationName = document.querySelector('.location-name')
const degreeSectionSpan = degreeSection.querySelector("span")

//variables
// const key= "ee22a7e87fa9ebff263a1cf970c98f37"



function createIcon(id) {
    const icon = document.querySelector('.icon')
    const image = document.createElement('img');
    image.src=`http://openweathermap.org/img/wn/${id}@2x.png`
    icon.appendChild(image)
}

function convertFtoC(f){
   const c = ((f-32) * 5)/9
   return c.toFixed(2)
}

function eventForConvert(temp){
    degreeSection.addEventListener("click", () =>{
        if(degreeSectionSpan.textContent === "F"){
            // console.log("the temp is", temp)
            temperatureDegree.textContent = convertFtoC(temp)
            degreeSectionSpan.textContent = "C"
        } else {
            temperatureDegree.textContent = temp
            degreeSectionSpan.textContent = "F"
        }
    })
}

function getWeather(lat, long){
    const urlApi=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`
   

    return(
        fetch(urlApi)
        .then(response =>{
            return response.json()
        })
    )
}

function currentLocationWeather(temp, description, name){
    temperatureDescription.textContent = description.toUpperCase()
    temperatureDegree.innerText = temp
    degreeSectionSpan.textContent = "F"
    locationName.innerText = name
}