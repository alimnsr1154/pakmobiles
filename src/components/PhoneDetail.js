import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PhoneDetail.css';

const PhoneDetail = () => {
    const { id } = useParams();
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        // Fetch the phone's details from your data source here
        // This is just a placeholder
        fetch(`/api/phones/${id}`)
            .then(response => response.json())
            .then(data => setPhone(data));
    }, [id]);

    if (!phone) {
        return <div>Loading...</div>;
    }

    return (
        <div className="phone-detail">
            <h1>{phone.name}</h1>
            <div className="phone-detail-row">
                <img src={phone.image} alt={phone.name} />
                <p>{phone.description}</p>
            </div>
            <p className="phone-detail-price">{phone.price}</p>
            <div className="phone-detail-specs">
                {/* Display the phone's specifications here */}
            </div>
        </div>
    );
};

export default PhoneDetail;
