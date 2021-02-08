//Error Handling:
const message = document.getElementById("Error-Message");
const searchFoodMeal = () => {
  const searchFoodText = document.getElementById("food-input").value;
  if (searchFoodText === "") {
    message.style.display = "block";
  } else {
    message.style.display = "none";
    dataLoadByAPI(searchFoodText);
  }
};

//Search-Button Function:
const dataLoadByAPI = (searchText) => {
  const mealURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(mealURL)
    .then((response) => response.json())
    .then((mealData) => foodShowcase(mealData.meals))
    .catch((error) => {
      message.style.display = "block";
    });
};

//Display Foods Function:
const foodShowcase = (foods) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  foods.map((food) => {
    const singleFood = document.createElement("div");
    singleFood.className = "single-food";
    singleFood.innerHTML = `
    <div onclick="displayIngredients('${food.idMeal}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <img src="${food.strMealThumb}" alt="Food">
      <h4>${food.strMeal}</h4>
    </div>
    `;
    foodContainer.appendChild(singleFood);
  });
};

//Get FoodMeal Information
const displayIngredients = (mealData) => {
  const mealInfoURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealData}`;
  fetch(mealInfoURL)
    .then((response) => response.json())
    .then((mealInfoData) => showIngredients(mealInfoData.meals));
};

//Show Food Ingredients:
const showIngredients = (mealDetails) => {
  const mealIngredients = document.getElementById("meal-ingredients");
  mealDetails.map((mealInfo) => {
    mealIngredients.innerHTML = `
    <img src="${mealInfo.strMealThumb}" alt="meal-info">
    <h3><i class="fas fa-utensils"></i> ${mealInfo.strMeal}</h3>
    <h4><i class="fas fa-fire-alt"></i> ${mealInfo.strArea}, ${mealInfo.strCategory}</h4>
    <h4><i class="fas fa-seedling"></i> ingredients</h4>
    <div class="modal-food-list">
      <ul>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure1} ${mealInfo.strIngredient1}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure2} ${mealInfo.strIngredient2}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure3} ${mealInfo.strIngredient3}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure4} ${mealInfo.strIngredient4}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure5} ${mealInfo.strIngredient5}</li>
      </ul>
      <ul>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure6} ${mealInfo.strIngredient6}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure7} ${mealInfo.strIngredient7}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure8} ${mealInfo.strIngredient8}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure9} ${mealInfo.strIngredient9}</li>
        <li><i class="fas fa-stop-circle"></i> ${mealInfo.strMeasure10} ${mealInfo.strIngredient10}</li>
      </ul
    </div>
  `;
  });
};
