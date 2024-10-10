import React, { useState } from 'react';
import '../styles/Publications.css';
import { useSelector } from 'react-redux';

function DisplayPublications() {
    const { currentUser } = useSelector(state => state.user);
    const publications = currentUser.data.publications;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPublications, setFilteredPublications] = useState(publications);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        const filtered = publications.filter(pub => {
            const title = pub.title?.toLowerCase() || '';
            const category = pub.category?.toLowerCase() || '';
            const type = pub.type?.toLowerCase() || '';
            const date = pub.date?.toLowerCase() || '';
            const description = pub.description?.toLowerCase() || '';
            return title.includes(term.toLowerCase()) ||
                   category.includes(term.toLowerCase()) ||
                   type.includes(term.toLowerCase()) ||
                   date.includes(term.toLowerCase()) ||
                   description.includes(term.toLowerCase());
        });

        setFilteredPublications(filtered);
    };

    return (
        <div className="App">
            <h1>Publications</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title, category, type, date, or description"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="publications">
                {filteredPublications.map((pub) => (
                    <div className="publication" key={pub._id}>
                        <div className="image" id={`image${pub.fileId}`}>
                            <img src={`${process.env.REACT_APP_API_URL}/uploads/${pub.fileId}`} alt={pub.title} />
                        </div>
                        <div className="description">
                            <p><strong>{pub.title}</strong></p>
                            <p><strong>{pub.category}</strong></p>
                            <p><strong>{pub.type}</strong></p>
                            <p>{pub.date}</p>
                            <p>{pub.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayPublications;
