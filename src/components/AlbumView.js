// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function AlbumView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])
    const navButtons = () => {
        return(
            <div>
                    <button onClick={() => navigate(-1)}>Back</button>
                    
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
            )
        }

        const allAlbums =   albumData.filter(entity => entity.kind === 'song')
        .map((album, i) => { return (<div key={i}>{album.trackName}</div>)})
        
        return (
            <div>
                {navButtons()}
                {allAlbums}
            </div>
        )
    

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key= "">
                <p>{song.trackName}</p>
            </div>
           )
    })

}



export default AlbumView
