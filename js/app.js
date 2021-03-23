/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

//Get all setion on the page 
const sectionsList = document.querySelectorAll('section');
let navHeight;
let liSection;


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function clearActiveClass() {
    document.querySelectorAll('.active-class').forEach(element => {
        element.classList.remove('active-class');
    });

};
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */


// Build menu 
function buildNav() {

    //create fragment to use on appending list of sections 
    var fragment = document.createDocumentFragment();

    //Those variables used on the appending process
    var listNode, nodeLink;

    //Loop on all sections we got 
    sectionsList.forEach(function(element) {

        //Remove active-class from all sections 
        element.classList.remove('active-class');


        listNode = document.createElement('li');
        listNode.className = 'menu__link';
        listNode.id = 'li' + element.id;

        nodeLink = document.createElement('a');

        nodeLink.textContent = element.dataset.nav;

        listNode.appendChild(nodeLink);
        fragment.appendChild(listNode);
    });

    document.querySelector('#navbar__list').appendChild(fragment);
}
buildNav();

//This method is to create scroll event 
window.addEventListener('scroll', (e) => {
    navHeight = document.querySelector('.page__header').offsetHeight;
    sectionsList.forEach(element => {

        //This to check which element is in the view screen 
        if (window.pageYOffset + window.innerHeight >= (element.offsetTop + 100) && window.pageYOffset + navHeight < (element.offsetTop + element.offsetHeight)) {

            //First clear active-class from all element while scrolling 
            clearActiveClass(element);
            clearActiveClass(document.querySelector('#li' + element.id));

            //Add active-class to the element which is viewed currently
            element.classList.add('active-class');
            document.querySelector('#li' + element.id).classList.add('active-class');
        }
    });
});


// Scroll to anchor ID using scrollTO event
const menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach(li => {

    li.addEventListener('click', (e) => {

        navHeight = document.querySelector('.page__header').offsetHeight;

        clearActiveClass(li);

        li.classList.add('active-class');

        liSection = document.querySelector('#' + li.id.slice(2));

        window.scrollTo({
            top: liSection.offsetTop - navHeight,
            behavior: 'smooth'
        });

        liSection.classList.add('active-class');

    });

});



/**
 * End Main Functions
 */