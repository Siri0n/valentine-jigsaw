const IMAGE_URL = `image.png`;
const IMAGE_WIDTH = 700;
const IMAGE_HEIGHT = 700;
const TILE_WIDTH = 100;
const TILE_HEIGHT = 100;
const TILES_X = IMAGE_WIDTH / TILE_WIDTH;
const TILES_Y = IMAGE_HEIGHT / TILE_HEIGHT;
const TILES_COUNT = TILES_X * TILES_Y; 
const mainElement = document.querySelector(`main`);

const createTileMarkup = (i, x, y) => `<div data-index="${i}" class="tile" style="background-position: ${-x * TILE_WIDTH}px ${-y * TILE_HEIGHT}px;"></div>`

const init = () => {
  const markup = [...Array(TILES_COUNT)]
    .map((_, i) => createTileMarkup(i, i % TILES_X, Math.floor(i / TILES_X)))
    .sort(() => Math.random() > 0.5 ? 1 : -1)
    .join(``);
  mainElement.innerHTML = markup;
  mainElement.onclick = clickHandler;
}

const clickHandler = e => {
  const selected = mainElement.querySelector(`.selected`);
  if(!selected){
    e.target.classList.add(`selected`);
  }else{
    selected.classList.remove(`selected`);
    if(selected == e.target){
      return;
    }
    [selected.style.backgroundPosition, e.target.style.backgroundPosition] = 
      [e.target.style.backgroundPosition, selected.style.backgroundPosition];
    [selected.dataset.index, e.target.dataset.index] = 
      [e.target.dataset.index, selected.dataset.index];
    checkSolved();
    e.stopPropagation();
  }
}

const checkSolved = () => {
  const ids = [...mainElement.children].map(el => +el.dataset.index);
  const solved = ids.every((el, index) => index == ids.length - 1 || el < ids[index + 1]);
  if(solved){
    mainElement.onclick = () => alert(`чмак`);
    mainElement.classList.add(`solved`);
  }
}

init();