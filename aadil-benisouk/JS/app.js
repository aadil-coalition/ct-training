  // getting appropriate elements.
  const ThreeDotsIcon = document.querySelector('.threeDotsIcon');
  const ThreeDotsHoverMenu = document.querySelector('.threeDotsHoverMenu');
  const verticalNavBar = document.querySelector('.varticleNavBar');
  const mainBanner = document.querySelector('.mainBanner');
  const subNavBar = document.querySelector('.subNavBar');
  const rightCheckBookBtn = document.querySelector('.rightCheckBookBtn');
  const leftCheckBookBtn = document.querySelector('.leftCheckBookBtn');
  const checkOutLookBookNav = document.querySelector('.checkOutLookBookNav');
  const PlusButtonArr = document.querySelectorAll('.plusButton');
  const colapsListArr = document.querySelectorAll('.colapsList');
  const searchIcon = document.querySelector('img[alt="searchIcon"]');
  const superHeader = document.querySelector('.superHeader');
  const hamburgerMenu = document.querySelector('.hamburgerMenu');
  const varticleNavBarContainer = document.querySelector('.varticleNavBarContainer');


  // when hovered over threeDotsIcon.
  ThreeDotsIcon.addEventListener("mouseover", () => {
    console.log('it\'s hovering');
    ThreeDotsHoverMenu.style.display = "block";
    ThreeDotsHoverMenu.style.zIndex = 2;
    ThreeDotsIcon.addEventListener("mouseout", () => {
      ThreeDotsHoverMenu.style.display = "none";
      ThreeDotsHoverMenu.style.zIndex = -1;
      console.log('it\'s going out');
    });
  });

  // when hovered over ThreeDotsHoverMenu.
  ThreeDotsHoverMenu.addEventListener("mouseover", () => {
      ThreeDotsHoverMenu.style.display = "block";
      ThreeDotsHoverMenu.style.zIndex = 2;
      ThreeDotsHoverMenu.addEventListener("mouseout", () => {
       ThreeDotsHoverMenu.style.display = "none";
       ThreeDotsHoverMenu.style.zIndex = -1;

     });
  });

  // when verticle navBar is clicked we'll show the subMenu. And hide it when the background image is clicked
  verticalNavBar.addEventListener('click', () => {
    subNavBar.style.display = "flex";
    subNavBar.style.zIndex = 1;
  })

  mainBanner.addEventListener('click', () => {
    subNavBar.style.display = "none";
    subNavBar.style.zIndex = -1;
  });


  // removing submenu when scrolling
  document.addEventListener('scroll', () => {
    subNavBar.style.display = "none";
    subNavBar.style.zIndex = -1;
  });


  // scrolling checkout section on button click
  rightCheckBookBtn.addEventListener('click', () => {
    console.log('scrolling right');
    const scrollBy = 0;
    checkOutLookBookNav.scrollTo({
      left: scrollBy+200,
      behavior: "smooth"
    });
  });

  leftCheckBookBtn.addEventListener('click', () => {
    console.log('scrolling left');
    const scrollBy = 0;
    checkOutLookBookNav.scrollTo({
      left: scrollBy-200,
      behavior: "smooth"
    });
  });

// toggling colapsing ul on click
PlusButtonArr.forEach((element, index) => {
  element.addEventListener('click', () => {
    const toBeDisplayed = colapsListArr[parseInt(element.classList[1].substring(1))];
    if(toBeDisplayed.style.height !== "100%") {
      toBeDisplayed.style.height = "100%";
      element.setAttribute('src', './assets/Homepage/Left.svg');
    } else {
      toBeDisplayed.style.height = "0px";
      element.setAttribute('src', './assets/Homepage/Right.svg');
    }
  });
});
  
  // click event on search icon 
  let counter = 0; // this make sures the funciton is called only at the initial click on the searchbar.
  searchIcon.addEventListener('click',() => {
    
    if(counter === 0) {
      counter = 1;
      if(document.body.clientWidth <= 414) {
      superHeader.style.display = 'flex';
      superHeader.children[0].style.display = "none";
      superHeader.children[1].style.display = "none";
      superHeader.children[3].style.display = "none";

      superHeader.children[2].children[1].classList.add('displaySearchBar');
      superHeader.children[2].children[1].classList.remove('searchBar');
      superHeader.children[2].children[0].classList.add('displaySearchIcon');
      superHeader.children[2].children[0].classList.remove('searchIcon');

      const backButton = document.createElement('img');
      backButton.setAttribute('src', './assets/Homepage/Left.svg');
      backButton.style.display = "inline-block";
      backButton.style.width = "30px";
      backButton.style.height = "30px";
      backButton.style.position = "absolute";
      backButton.style.left = "7%";
      backButton.style.zIndex = "1";
      superHeader.children[2].insertBefore(backButton, superHeader.children[2].children[0]);

      backButton.addEventListener('click', () => {
        counter = 0;
      superHeader.children[0].style.display = "inline-block";
      superHeader.children[1].style.display = "inline-block";
      superHeader.children[3].style.display = "inline-block";


      superHeader.children[2].children[2].classList.remove('displaySearchBar');
      superHeader.children[2].children[2].classList.add('searchBar');
      superHeader.children[2].children[2].display = "none";

        console.log(superHeader.children[2].children[2]);
      superHeader.children[2].children[1].classList.add('searchIcon');
      superHeader.children[2].children[1].classList.remove('displaySearchIcon');
      superHeader.children[2].children[0].remove();
      })
    }
    }
  });

  // adding click event on hamburger menu
  hamburgerMenu.addEventListener('click', () => {
    // console.log(varticleNavBarContainer.style.display);
    if(varticleNavBarContainer.style.display === '' || varticleNavBarContainer.style.display === 'none') {
      console.log(varticleNavBarContainer);

      varticleNavBarContainer.style.width = '70%';
      varticleNavBarContainer.style.display = "block";
      varticleNavBarContainer.style.position = "absolute";
      varticleNavBarContainer.style.left = 0;
      varticleNavBarContainer.style.zIndex = 1;
      varticleNavBarContainer.style.background = 'white';

      // getting rid of the horizontal line.
      const horizontalLine = varticleNavBarContainer.children[0].getElementsByTagName('hr')[0];
      horizontalLine.style.display = 'none';

      const totalLi = varticleNavBarContainer.children[0].children.length;
      for(let i = 0; i < totalLi; i++) {
        varticleNavBarContainer.children[0].children[i].classList.add('varticleNavBarLiMobileDisplay');
        // I don't know why the width is not working when I add it in varticleNavBarMobileDisplay? so I'm adding it below.  
        varticleNavBarContainer.children[0].children[i].style.width = "100%";        
      }
    } else {
      varticleNavBarContainer.style.display = "none";
      varticleNavBarContainer.style.position = "static";
    }
  });
