import React, { useEffect, useState } from 'react';
import '../css/PhoneDetail.css';
import { useLocation } from 'react-router-dom';

const PhoneDetail = () => {
    const location = useLocation();
    const [phone, setPhone] = useState(null);

    const generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return '★'.repeat(fullStars) + '½'.repeat(halfStar) + '☆'.repeat(emptyStars);
    };

    useEffect(() => {
        console.log(location.state); // Log the location state
        if (location.state && location.state.phone) {
            setPhone(location.state.phone);
        }
    }, [location]);

    if (!phone) {
        return <div>Loading...</div>;
    }

    return (
        <div className="phone-detail">
            <h1>Phone Details</h1>
            <div className="phone-detail-row">
                <img src={phone.image} alt={phone.name} />
                <div>
                    <h2>{phone.name}</h2>
                    <p>{generateStars(phone.rating)}</p>
                    <p className="phone-detail-price">${phone.price}</p>
                    <p>{phone.description}</p>
                </div>
            </div>
            <div className="phone-detail-specs">
                <h2>Detailed Specifications</h2>
                <table>
                    <tr>
                        <th rowSpan="5">Build</th>
                        <th>OS</th>
                        <td>{phone.specs.build.OS}</td>
                    </tr>
                    <tr>
                        <th>UI</th>
                        <td>{phone.specs.build.UI}</td>
                    </tr>
                    <tr>
                        <th>Dimensions</th>
                        <td>{phone.specs.build.dimensions}</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>{phone.specs.build.weight}</td>
                    </tr>
                    <tr>
                        <th>SIM</th>
                        <td>{phone.specs.build.SIM}</td>
                    </tr>
                    <tr>
                        <th rowSpan="3">Processor</th>
                        <th>CPU</th>
                        <td>{phone.specs.processor.CPU}</td>
                    </tr>
                    <tr>
                        <th>Chipset</th>
                        <td>{phone.specs.processor.chipset}</td>
                    </tr>
                    <tr>
                        <th>GPU</th>
                        <td>{phone.specs.processor.GPU}</td>
                    </tr>
                    <tr>
                        <th rowSpan="2">Memory</th>
                        <th>Built-in</th>
                        <td>{phone.specs.memory.builtIn}</td>
                    </tr>
                    <tr>
                        <th>Card</th>
                        <td>{phone.specs.memory.card}</td>
                    </tr>
                    <tr>
                        <th>Battery</th>
                        <th>Capacity</th>
                        <td>{phone.specs.battery.capacity}</td>
                    </tr>
                </table>
            </div>
            </div>
    );
};

export default PhoneDetail;
