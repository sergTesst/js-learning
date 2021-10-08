const imgContainer = document.querySelector(".img-gallery");

//version 1 

function preloadImages(sources, callback) {
  const arrOfPromiseImgs = Array.from(sources).map((source) => {
    const img = document.createElement("img");
    img.src = source;
    return new Promise((resolve , reject ) => {
      img.onload = () => {
        resolve(img);
      };
			img.onerror = () =>{
				reject(img);
			}
    });
  });
  Promise.allSettled(arrOfPromiseImgs)
    .then((results) => {
      const everyFulfilled = results.every((result) => {
        return result.status === "fulfilled";
      });
      console.log("everyFulfilled", everyFulfilled);
      return results;
    })
		.then(results=>results.filter(result => result.status === 'fulfilled'))
    .then((results) => results.map((res) => res.value))
    .then((imgs) => {
      imgs.forEach((img) => imgContainer.append(img));
      return imgContainer.children;
    })
    .then((imgs) => {
      callback.call(null, imgs);
    });
}

//version 2

// function preloadImages(sources, callback){
// 	let counter = 0;
// 	function loadHandler(){
// 		counter++;
// 		if(sources.length === counter){
// 			imgs.forEach(img=> imgContainer.append(img));
// 			callback(imgs);
// 		}
// 	}
// 	const imgs = [];
// 	for(let source of sources){
// 		const img = document.createElement("img");
// 		img.onload = img.onerror = loadHandler;
// 		imgs.push(img);
// 		img.src = source;
// 	}
// }

let sources = [
  "https://en.js.cx/images-load/1.jpg",
  "https://en.js.cx/images-load/2.jpg",
  "https://en.js.cx/images-load/3.jpg",
  "https://example.com/bad-image.jpg",
];

function preventCaching() {
  for (let i = 0; i < sources.length; i++) {
    sources[i] += "?" + Math.random();
  }
}

preventCaching();

function testLoaded(loadedImgs) {
  let widthSum = 0;
  for (let i = 0; i < sources.length; i++) {
    let img = document.createElement("img");
    img.src = sources[i];
    widthSum += img.width;
  }

  const reducedSum = Array.from(loadedImgs).reduce((sum, currentImg) => {
    return (sum += currentImg.width);
  }, 0);
  console.log("reducedSum", reducedSum);
  console.log("widthSum", widthSum);
  let widthSumEqual300 = widthSum === reducedSum;
  console.log(`widthSumEqual300 `, widthSumEqual300);
}

preloadImages(sources, testLoaded);
