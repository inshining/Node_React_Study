import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Movie from "../components/Movie";
function Detail() {
    const {id} = useParams()
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const getMovie = async() => {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        const json = await response.json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    })
    return (<div>{loading ? (<h1>loading...</h1>) 
    : (<div>
        <Movie 
            key={movie.id} 
            id={movie.id}
            coverImg={movie.medium_cover_image} 
            title={movie.title} 
            summary={movie.description_intro} 
            genres={movie.genres} />
    </div>)}</div>)
}

export default Detail;