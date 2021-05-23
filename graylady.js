const gotham = () => {
  let caughtWall = false;
  const gateway = document.querySelector('#gateway-content');
  if (gateway)
    {
      gateway.remove();
      caughtWall = true;
    }
  const content = document.querySelector('[class^="css-"]');
  content.style.position = 'initial';
  content.style.overflow = 'initial';
  const rmGrad = (ele) => {
    if (ele.className.startsWith('css-') && ele.style){
      ele.style.display = 'none';
    }
  }
  content.childNodes.forEach(ele => rmGrad(ele))
  if (caughtWall){
    console.log('Got it!')
    document.removeEventListener('scroll',gotham);
  }
}

document.addEventListener('scroll',gotham);
