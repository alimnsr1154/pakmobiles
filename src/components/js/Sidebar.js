import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios to make HTTP requests
import '../css/Sidebar.css';

const Sidebar = ({ setSelectedBrand, setSelectedPriceRange }) => {
    const [isBrandExpanded, setBrandExpanded] = useState(false);
    const [isPriceExpanded, setPriceExpanded] = useState(false);
    const [brands, setBrands] = useState([]); // Initialize state for brands
    const [priceRanges, setPriceRanges] = useState([]); // Initialize state for price ranges

    useEffect(() => {
        // Define async function to fetch data
        const fetchData = async () => {
            try {
                const responseBrands = await axios.get('http://localhost:3001/api/mobiles/brands');
                setBrands(responseBrands.data);

                const responsePrices = await axios.get('http://localhost:3001/api/mobiles/prices');
                const minPrice = Math.min(...responsePrices.data);
                const maxPrice = Math.max(...responsePrices.data);
                const range = (maxPrice - minPrice) / 2;
                setPriceRanges([minPrice, minPrice + range, maxPrice]);
            } catch (err) {
                console.error("Error fetching data from server:", err);
            }
        };

        // Call the function to fetch data
        fetchData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="sidebar">
            <button onClick={() => {
                if (isBrandExpanded) setSelectedBrand(null);
                setBrandExpanded(!isBrandExpanded);
            }}>
                <span className="arrow">{isBrandExpanded ? '▲' : '▼'}</span> Search by Brand
            </button>
            {isBrandExpanded && (
                <div>
                    {brands.map((brand, index) => (
                        <button key={index} onClick={() => setSelectedBrand(brand)}>{brand}</button>
                    ))}
                </div>
            )}
            <button onClick={() => {
                if (isPriceExpanded) setSelectedPriceRange([0, Infinity]);
                setPriceExpanded(!isPriceExpanded);
            }}>
                <span className="arrow">{isPriceExpanded ? '▲' : '▼'}</span> Search by Price
            </button>
            {isPriceExpanded && (
                <div>
                    {priceRanges.map((price, index) => (
                        <button key={index} onClick={() => setSelectedPriceRange([price, priceRanges[index + 1] ? priceRanges[index + 1] - 1 : Infinity])}>
                            {index < priceRanges.length - 1 ? `$${price} - $${priceRanges[index + 1] - 1}` : `$${price} and above`}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;