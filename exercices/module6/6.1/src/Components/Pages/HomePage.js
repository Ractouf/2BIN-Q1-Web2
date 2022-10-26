const HomePage = async () => {
  try {
    const joke = await getOneJoke();
    renderJoke(joke);
    clickEvent();
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

async function getOneJoke() {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    if (!response.ok)
      throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    return await response.json();
  } catch (err) {
    console.error('getAllPizzas::error: ', err);
    throw err;
  }
}

function renderJoke(joke) {
  let jokeText;
  if (joke.type === 'single') {
    jokeText = `  
      <section id = "joke">
          <h2>${joke.joke}</h2>
      </section>`
  } else {
    jokeText = `
      <section id = "joke">
          <h2>${joke.setup}</h2>
          <h3>${joke?.delivery}</h3>
      </section>
      `
  }

  const main = document.querySelector('main');
  main.innerHTML += `<h3>Category : ${joke.category}</h3>`
  main.innerHTML += jokeText;
  main.innerHTML += `<button onClick="window.location.reload();">New Joke</button>`

  if (joke.safe === false) {
    const jokeElement = document.getElementById("joke");
    jokeElement.className = "blur";

    const button = document.createElement("button");
    button.className = "button"
    main.innerHTML += `<p>Unsafe joke !</p>`;
    button.innerText += "Watch";

    button.addEventListener("click", () => {
      jokeElement.className = "";
    });

    main.appendChild(button);
  }
}

function clickEvent() {
  const button = document.querySelector('.button');
  const joke = document.querySelector('.blur');

  if (button) {
    button.addEventListener("click", () => {
      joke.className = "";
    });
  }
}

export default HomePage;
