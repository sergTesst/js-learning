'use strict';

export const createElement=({ name, classNamesString, attributes = {} })=> {
  const element = document.createElement(name);
  if (classNamesString) {
    const classNames = classNamesString.split(" ");
    element.classList.add(...classNames);
  }
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
}

const roughScale = (x, base)=> {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) { return 0; }
  return parsed;
}
export const getPositiveNumber = (num)=>{
  const resultNum = roughScale(num,10);
  if(resultNum && resultNum<=0){
    return 0;
  }
  return resultNum; 
}

