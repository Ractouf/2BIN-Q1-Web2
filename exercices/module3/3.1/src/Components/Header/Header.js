const Header = () => {
    renderTitleAndWrapper();
};

function renderTitleAndWrapper() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <h1>
           Films uwu pog
        </h1>
        
        <div id="navbarWrapper">
        </div>
  `;
}

export default Header;
