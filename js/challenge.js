const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const counter = document.getElementById('counter');
const heart = document.getElementById('heart');
const pause = document.getElementById('pause');
const likesContainer = document.querySelector('.likes');
likes = {}

plus.addEventListener('click', increment);
minus.addEventListener('click', decrement);
heart.addEventListener('click', likeNumber);

// Get the auto increment for the counter up and running
let timer = setInterval(() => {increment();}, 1000);

// Pause the timer when pause button is clicked
pause.addEventListener('click', stopTimer);

function stopTimer() {
    clearInterval(timer);
}

function increment() {
   counter.textContent = parseInt(counter.textContent) + 1;
}

function decrement() {
    counter.textContent = parseInt(counter.textContent) - 1;
}

function likeNumber() {
    // Increment the number of likes 
    if (likes[counter.textContent]) {
        likes[counter.textContent].likes +=1;
        console.log(likes[counter.textContent].likes);
    } 
    // Or if it isn't there yet, add new object to likes
    else {
        likes[counter.textContent] = {
            num: counter.textContent,
            likes: 1,
        }
        console.log(likes[counter.textContent]);
    }

    // Add our likes object to the DOM
    renderLikes();
}

function renderLikes() {
    likesContainer.replaceChildren();
    for (let oneLike in likes) {
        const li = document.createElement('li');
        li.textContent = `${oneLike} has ${likes[oneLike].likes} likes`
        likesContainer.appendChild(li);
    }
}

// Input box for comments
const newComment = document.getElementById('comment-input');
const commentButton = document.getElementById('submit');
const commentContainer = document.getElementById('list');

commentButton.addEventListener('click', (e) => {
    // Prevent page reload
    e.preventDefault();

    // Add comment to the DOM
    renderComments(newComment.value);
})

function renderComments(addComment) {
    const div = document.createElement('div');
    div.textContent = addComment;
    commentContainer.appendChild(div);
}


// Rick and Morty fetch fun
fetch('https://rickandmortyapi.com/api/character')
    .then(r => r.json())
    .then(characters => {
        const container = document.getElementById('rick-and-morty');
        for (character of characters.results){
            const characterDiv = document.createElement('div');
            
            const h2 = document.createElement('h2');
            h2.textContent = character.name;

            const ul = document.createElement('ul');
            for (oneEpisode of character.episode) {
                const li = document.createElement('li');
                li.textContent = oneEpisode;
                ul.appendChild(li);
            }
            characterDiv.appendChild(h2);
            characterDiv.appendChild(ul);
            container.appendChild(characterDiv);
        };
    });