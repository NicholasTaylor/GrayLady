const helperSnap = (query, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(document.querySelector(query).innerHTML);
    },delay)
  })
}

const helperLoad = (query, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (document.querySelector(query)){
        resolve(document.querySelector(query));
      }
    },delay)
  })
}

const atlas = () => {
  const paywallLoaded = helperLoad('#paywall',500);
  const rmPaywall = (paywall) => {
    paywall.remove();
    document.querySelector('body').style.overflow = 'initial';
  }
  Promise.all([paywallLoaded]).then((allValues) => rmPaywall(allValues[0]));
}

const district = () => {
  const takeSnapshot = helperSnap('article',200);
  const paywallLoaded = helperLoad('[id^="paywall"]',2500);

  const rmPaywall = (snapshot, paywall) => {
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    paywall.remove();
    body.style.position = 'initial';
    body.style.overflow = 'initial';
    html.style.overflow = 'initial';
    document.querySelector('article').innerHTML = snapshot;
  }
  
  Promise.all([takeSnapshot,paywallLoaded]).then((allValues) => rmPaywall(allValues[0],allValues[1]));
}

const gotham = () => {
  const paywallLoaded = helperLoad('#gateway-content',3000);

  const rmPaywall = (paywall) => {
    paywall.remove();
    const content = document.querySelector('[class^="css-"]');
    content.style.position = 'initial';
    content.style.overflow = 'initial';
    const rmGrad = (ele) => {
      if (ele.className.startsWith('css-') && ele.style){
        ele.style.display = 'none';
      }
    }
    content.childNodes.forEach(ele => rmGrad(ele));
  }

  Promise.all([paywallLoaded]).then((allValues) => rmPaywall(allValues[0]));
}

const theHost = window.location.hostname;
if (theHost === 'www.washingtonpost.com'){
  district();
} else if (theHost === 'www.nytimes.com'){
  gotham();
} else if (theHost === 'www.theatlantic.com'){
  atlas();
}