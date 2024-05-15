import React, { useEffect, useState } from 'react';
import '../css/PhoneDetail.css';
import image from './iphone.jpeg';

const PhoneDetail = () => {
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        const data = {
            name: 'Phone Name',
            image: image,
            description: 'The Phone Name is a state-of-the-art device offering a seamless user experience with its latest technology and high-end features. It comes with a high-resolution camera, long-lasting battery life, and an impressive display that provides vibrant colors and sharp details. Its sleek design and lightweight build make it comfortable to hold and use. Experience fast and efficient performance with the Phone Name.',
            price: '999.99',
            rating: '★★★★☆', // Add a rating field
        };
        setPhone(data);
    }, []);

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
                    <p>{phone.rating}</p>
                    <p className="phone-detail-price">${phone.price}</p>
                    <p>{phone.description}</p>
                </div>
            </div>
            <div className="phone-detail-specs">
                <h2>Detailed Specifications</h2>
                <table>
                    <tr>
                        <th rowspan="5">Build</th>
                        <th>OS</th>
                        <td>Android 14 OS</td>
                    </tr>
                    <tr>
                        <th>UI</th>
                        <td>FuntouchOS 14</td>
                    </tr>
                    <tr>
                        <th>Dimensions</th>
                        <td>163.2 x 75.8 x 7.8 mm</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>186 g</td>
                    </tr>
                    <tr>
                        <th>SIM</th>
                        <td>Dual Sim, Dual Standby (Nano-SIM)</td>
                    </tr>
                
                </table>
            </div>
        </div>
    );
};

export default PhoneDetail;