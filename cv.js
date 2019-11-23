// fetch API
const createContent = (importedContent) => {
    console.log(importedContent);
    const content = importedContent.items[0].fields;
    const cvTitle = document.getElementById('cvTitle');
    const cvTxt1 = document.getElementById('cvTxt1');
    const cvTxt2 = document.getElementById('cvTxt2');
    cvTitle.innerHTML = content.cvtitle;
    cvTxt1.innerHTML = content.cvtext1;
    cvTxt2.innerHTML = content.cvtext2;
}

const getData = () => {
    fetch('https://cdn.contentful.com/spaces/f9xo8mopdqv5/entries?access_token=qhRzmjNkUqjGoxsy5kJxQwl1k6xRjS41B15ShXWW3bE') // Call the fetch function passing the url of the API as a parameter
    .then(response => response.json())
    .then(data => {
        createContent(data);
    })
    .catch(error => console.error(error));
};
(function(){
    getData();
})();

// Loading page animation:

const overlay = document.getElementById('overlay');
const tl = new TimelineMax();

tl.fromTo(overlay,2,{top: "0"}, {height: "-100vh"})
.fromTo(cvTitle, 1, {opacity: 0, x:30}, {opacity: 1, x:0}, "-=1")
.fromTo(cvTxt1, 1, {opacity: 0, x:30}, {opacity: 1, x:0}, "-=1")
.fromTo(cvTxt2, 1, {opacity: 0, x:30}, {opacity: 1, x:0}, "-=1");
