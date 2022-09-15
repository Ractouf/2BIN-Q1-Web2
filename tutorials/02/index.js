const divs = document.querySelectorAll(".message");

divs.forEach((div) => {
    div.addEventListener("mouseover", () => {
        div.innerText = "Hello world!";
    });

    div.addEventListener("mouseout", (e) => {
        div.innerText = `You have left the div wit id ${e.target.id}`;
    });
});

