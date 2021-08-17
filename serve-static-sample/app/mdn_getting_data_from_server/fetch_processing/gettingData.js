"use strict";


import {createElement,getPositiveNumber} from './helpers.js';


const recipesFetcher = function () {

  const inputSearchElement = document.querySelector(
    'input[placeholder="Search word..."]'
  );
  const recipesContainerElement = document.querySelector(".recipes-container");

  let from = 0;
  let to = 10;
  let loading = false;
  const app_id = 'fd7bbaf4';
  const app_key = '8161145b3630175a050a61d0dc027c34';

  let searchValue = '';
  let selectedLabels = [];

  let previousAndCurrentValues = [];

this.dietLabels = ['Balanced','High-Fiber','High-Protein','Low-Carb','Low-Fat','Low-Sodium'];

this.webHealthLabels = [
  'Alcohol-free','Immune-Supportive','Celery-free','Crustcean-free','Dairy-free','Egg-free','Fish-free',
  'Foodmap-free','Gluten-free','Keto-friendly','Kidney-friendly','Kosher','Low-potassium','Lupine-free',
  'Mustard-free','low-fat-abs','No-oil-added','low-sugar','paleo','peanut-free','pecatarian','pork-free',
  'red-meat-free','sesame-free','shellfish-free','soy-free','sugar-conscious','tree-nut-free','vegan',
  'vegetarian','wheat-free'];

  let url = `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}`;


  const searchValueRegex = /&q=\w*/g;

  const regExFromTo = /&from=[0-9]+&to=[0-9]+/g;
  const fromToCaloriesRegex = /&calories=[0-9]+-[0-9]+/g;





  this.setTestValueForInputAndFetch = ()=> {
    let timeOutId = setTimeout(async () => {
      inputSearchElement.value = "pizza";
      searchValue = inputSearchElement.value;
      this.setSearchValue();

      clearTimeout(timeOutId);
    }, 1000);
  }

  

  this.setListenerForInput = ()=> {
    inputSearchElement.addEventListener("change", async (event) => {
      console.log("pressing enter search word", event.target.value);
      searchValue = event.target.value;

      if (searchValue.split("").length < 3) {
        console.log("need more data");
        searchValue = '';
        inputSearchElement.value = '';
      }
      this.setSearchValue();
    
    });
  }



  this.setSearchValue = ()=> {
  
    let searchResultArr = url.match(searchValueRegex);
    if(searchValue==''|| searchValue.split('').length<3){
      url = url.replace(searchValueRegex,``);
    }else if(searchResultArr && searchResultArr?.length>0){
      url = url.replace(searchValueRegex,`&q=${searchValue}`);
    }else if(searchValue.split('').length>2){
      url = url.concat(`&q=${searchValue}`);
    }
    console.log('setSearchValue', url);

  }

  this.prepareApiParameters=()=>{
    if(searchValue==''){
      url = url.replace(searchValueRegex,``);
    }

    if(!url.match(regExFromTo)){
      url = url.concat(`&from=${from}&to=${to}`);
    }else{
      url = url.replace(regExFromTo,`&from=${from}&to=${to}`);
    }
  }

  this.fetchDataFromApi = async ()=>{
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    this.prepareApiParameters();

    console.log('fetchDataFromApi', url);

    const spinner = document.getElementById("spinner");
    spinner.removeAttribute("hidden");
    loading = true;
    
    fetch(
      new Request(url, {
        method: "POST",
      })
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error("cannot get data from your search data", searchValue);
        }
      })
      .then(async (response) => {
        spinner.setAttribute("hidden", "");
        loading = false;
        console.log('fetched response', response);

        if(response){
          await this.updateRecipes(response);
        }
      })
      .catch((error) => {
        spinner.setAttribute("hidden", "");
        loading = false;
        console.error(error);
      });
  }

  this.updateRecipes = async (response) => {

    const resultCountElement = document.querySelector(".result-count");
    resultCountElement.innerText = `Number of recipes ${response?.count}`;

    if (response.hits) {
      let recipeElementsArr = [];
      response.hits.forEach(async (recipeEl) => {
        let recipe = recipeEl.recipe;
        const recipeElement = this.createRecipeCardElement(recipe);
        recipeElementsArr.push(recipeElement);
      });
      recipeElementsArr.forEach(el=>{
        recipesContainerElement.append(el);
      })
      
    }
  };

  this.createRecipeCardElement = (recipe)=>{

    if (!recipe.image) {
      return;
    }

    const recipeElement = createElement({
      name: "div",
      classNamesString: "col-sm-6 justify-content-center",
    });
    if (recipe.label) {
      const labelElement = createElement({
        name: "div",
        classNamesString: "m-2 fs-3 bold",
      });
      const label = recipe.label.substring(0, 150);
      labelElement.innerText = `${label}`;
      recipeElement.append(labelElement);
    }

    if (
      recipe.image
      //&& await checkImage(recipe.image)
    ) {
      const imgElement = createElement({
        name: "img",
        classNamesString: "img-fluid rounded cursor-pointer",
        attributes: {
          src: `${recipe?.image}`,
        },
      });
      recipeElement.append(imgElement);
    }
    if (recipe.calories) {
      const caloriesElement = createElement({
        name: "div",
        classNamesString: "m-2",
      });
      const calories = Math.floor(parseFloat(recipe.calories));
      caloriesElement.innerText = `Calories: ${calories}`;
      recipeElement.append(caloriesElement);
    }

    return recipeElement;

  }


  this.keyUpInputListener = () => {
    inputSearchElement.addEventListener("keyup", (event) => {
      
      let eventValue = event.target.value;
      searchValue = eventValue;
      this.setSearchValue();

      previousAndCurrentValues.push(eventValue);
      //console.log('before reverse ', previousAndCurrentValues);

      if (previousAndCurrentValues && previousAndCurrentValues.length > 2) {
        previousAndCurrentValues = previousAndCurrentValues.reverse();
        previousAndCurrentValues.pop();
        previousAndCurrentValues = previousAndCurrentValues.reverse();
      }
      //console.log('after reverse', previousAndCurrentValues);
    });
  }



  this.setListerForWindowScroll = () => {
    window.addEventListener("scroll", async () => {
      
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        if (loading) {
          console.log("processing current request");
          return;
        }
        console.log("At the bottom!");

        if (searchValue) {
          await this.fetchDataFromApi();
          from += 10;
          to += 10;
        }
      }
    });
  }

  this.appendCheckBoxes = 
    (divCheckBoxContainerClassSelector,checkBoxLabelsArray,apiParameter)=> {

    const CheckBoxContainer = document.querySelector(divCheckBoxContainerClassSelector);

    checkBoxLabelsArray.forEach(label=>{

      let lowerCaseLabel = label.toLowerCase();

      let idLabel = lowerCaseLabel.replace('-','');
      const divCheckBox = createElement({name:'div',classNamesString:'form-check form-check-inline'});
      const labelForCheckBox = createElement(
        {
          name:'label',
          classNamesString:'form-check-label',
          attributes:{
            for:`flexCheck${idLabel}`
          }
        }
      );
      labelForCheckBox.innerText = label;
  
      const checkBox = createElement(
        {
          name:'input',
          classNamesString:'form-check-input',
          attributes:{
            type:'checkbox',
            value:lowerCaseLabel,
            id:`flexCheck${idLabel}`
          }
        }
      );
      this.addEventListenerForCheckBox(checkBox,apiParameter);
      divCheckBox.append(labelForCheckBox);
      divCheckBox.append(checkBox);
      CheckBoxContainer.append(divCheckBox);

    })

  }

  this.resetToInitialValuesWithCheckBoxClick = ()=>{

    recipesContainerElement.innerHTML = '';
    from = 0;
    to = 10;
  }


  this.addEventListenerForCheckBox =  (checkbox,apiParameter)=>{

    checkbox.addEventListener('click', async (event)=>{

      
      const ValueParam = event.target.value;

      const Parameter = `&${apiParameter}=${ValueParam}`;

      if(!url.includes(Parameter)){
        url = url.concat(Parameter);
      }else if(url.includes(Parameter)){
        url = url.replace(Parameter,'');
      }
      console.log(`checkbox ${ValueParam} selected`,url);
      

    })

  }

  this.addListenerForFilterButton = ()=>{
    
    document.querySelector('#btn-filter-data').addEventListener('click', async (event)=>{
      this.resetToInitialValuesWithCheckBoxClick();
      await this.fetchDataFromApi();
    })
  }

  let fromKCal = 0;
  let toKCal = 0;

  this.addListenersForFromAndToKCalInputs = ()=>{

    document.querySelector('#fromKCalInput').addEventListener('keyup', async (event)=>{
      const txtValue = event.target.value;
      const numValue = getPositiveNumber(txtValue);
      console.log('fromKCalInput', numValue);
      fromKCal = numValue;
      this.setCaloriesToUrl();
    })
    document.querySelector('#toKCalInput').addEventListener('keyup', async (event)=>{
      const txtValue = event.target.value;
      const numValue = getPositiveNumber(txtValue);
      console.log('toKCalInput', numValue);
      toKCal = numValue;
      this.setCaloriesToUrl();
    })

    
  }

  this.setCaloriesToUrl = ()=>{
    const Parameter = `&calories=${fromKCal}-${toKCal}`;
    if (fromKCal==0&&toKCal==0 || fromKCal>toKCal){
      url = url.replace(fromToCaloriesRegex,'');

    }else if(fromKCal<=toKCal ){

      if(!url.includes(Parameter)){
        url = url.concat(Parameter);
      }else if(url.includes(Parameter)){
        url = url.replace(Parameter,'');
      }else if(url.match(fromToCaloriesRegex)){
        url = url.replace(fromToCaloriesRegex,Parameter);
      }
      
    }
    console.log(`setCaloriesToUrl ${fromKCal}-${toKCal} `,url);
  }





  this.startFetching =  ()=> {
    // console.log(inputSearchElement);

    this.setTestValueForInputAndFetch();

    this.setListenerForInput();

    this.keyUpInputListener();

    this.setListerForWindowScroll();

    this.appendCheckBoxes('.healthCheckBoxes',this.webHealthLabels,'health');
    this.appendCheckBoxes('.dietCheckBoxes',this.dietLabels,'diet');

    this.addListenerForFilterButton();
    this.addListenersForFromAndToKCalInputs();
    

  };

};

const fetcher = new recipesFetcher();
fetcher.startFetching();



