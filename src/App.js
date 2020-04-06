import React, {useEffect, useState} from 'react';
import './App.css';
import Select from 'react-select';

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://sheet.best/api/sheets/366a23c6-27c5-475a-af4e-2c5aed4c8ec9')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="ucitajMajkuTiJebem"><span>Loading...</span></div>;
    } else {
        return (
            <div className="container-fluid">
                {items.map(item =>
                    <div className="row nazovimoOsoba">
                        <h2 className="col-12">{item.name}</h2>
                        {Object.entries(item).map(song => {
                                if (song[1] && song[0] !== 'name') {
                                    const videoCode = song[1].includes('watch?v=') ? song[1].split('watch?v=')[1] : song[1].split('.be/')[1];
                                    return (
                                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                                            <p>{song[0]}</p>
                                            <iframe
                                                title={song[1]}
                                                width="100%"
                                                src={`https://www.youtube.com/embed/${videoCode}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )
                                }
                            }
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default App;
