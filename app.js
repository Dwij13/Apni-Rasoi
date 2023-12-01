let randomImg = document.getElementById("special")
let randomName =document.getElementById("specialName")
let randomCat = document.getElementById("specialCategory")
let gridBox = document.getElementById("gridBox")
let btn = document.getElementById("tap")
let modal = document.getElementById("modal")
let order = document.getElementById("order")
let more = document.getElementById("more")
more.addEventListener("click",()=>{
    getRandom()
})
let input = document.getElementById("category");
let categoryBox = document.getElementById("categoryBox")

randomImg.addEventListener("click",()=>{
    modal.style.display="flex"
})
modal.addEventListener("click",()=>{
    modal.style.display="none"
})
btn.addEventListener("click",()=>{
    setTimeout(()=>{
        window.scrollTo(0,1700);
    },750)
    
    gridBox.innerHTML="";
    let category = document.getElementById("category").value;
    getCategory(category);
})
input.addEventListener("keypress",()=>{ // enter button event
    if(event.key=="Enter"|| event.KeyCode ==13){
        setTimeout(()=>{
            window.scrollTo(0,1700);
        },750)
        
        gridBox.innerHTML="";
        let category = document.getElementById("category").value;
        getCategory(category);
    }
})

async function getRandom(){
    try{
        let randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
        let response = await fetch(randomUrl);
        let data = await response.json();
         let allItems = data.meals[0]
         console.log(allItems)
         console.log()
         order.innerHTML=""
        for(let i=1;i<=20;i++){
            if(allItems[`strIngredient${i}`]!=""){
            let list = document.createElement("li")
            list.innerHTML= allItems[`strIngredient${i}`]
            order.append(list);
            }
        }    
        console.log(order)  
        let imageLink = data.meals[0].strMealThumb;
        let imageName = data.meals[0].strMeal
        let imageCategory = data.meals[0].strCategory
        randomImg.style.backgroundImage=`url(${imageLink})`
        randomName.textContent=imageName;
        randomCat.textContent=imageCategory;
    }catch(err){
        console.log(err)
    }
}
getRandom()


async function getCategory(category){
    try{
        let object =[];
        let catUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        let generate = await fetch(catUrl)
        let food = await generate.json();
        categoryBox.innerHTML=""
        object=food.meals;
        console.log(object)
        let cat = document.createElement("p")
        cat.className="categoryName"
        categoryBox.append(cat)
        cat.textContent= category.toUpperCase()
        for(let i=0;i<object.length;i++){
            let item = document.createElement("div")
            item.className="item"
            let div1 = document.createElement("div")
            let img = document.createElement("img")
            img.className="image"
            div1.append(img)
            let div2 = document.createElement("div")
            let para = document.createElement("p")
            div2.append(para)
            item.append(div1,div2)
            gridBox.append(item)
            let catImage = object[i].strMealThumb
            img.src=catImage
            console.log(catImage)
            let catName = object[i].strMeal
            console.log(catName)
            para.innerHTML=catName

        }
        

    }catch{

    }
}
getCategory()