import {clearPage} from "../../utils/render";

const Film = async () => {
    try {
        clearPage();
        const film = await getOneFilm();
        console.log(film)
    } catch (err) {
        console.error('HomePage::error: ', err);
    }
};

async function getOneFilm(id) {
    try {
        const response = await fetch(`/api/films/${id}`);

        if (!response.ok)
            throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        return await response.json();
    } catch (err) {
        console.error('getAllFilms::error: ', err);
        throw err;
    }
}

export default Film;