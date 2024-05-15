import React, { useState } from 'react';
import '../css/Sidebar.css';

const Sidebar = () => {
    const [isBrandExpanded, setBrandExpanded] = useState(false);
    const [isPriceExpanded, setPriceExpanded] = useState(false); // Add this line

    return (
        <div className="sidebar">
            <button onClick={() => setBrandExpanded(!isBrandExpanded)}>
                <span className="arrow">{isBrandExpanded ? '▲' : '▼'}</span> Search by Brand
            </button>
            {isBrandExpanded && (
                <div>
                    <button>Brand 1</button>
                    <button>Brand 2</button>
                    <button>Brand 3</button>
                </div>
            )}
            <button onClick={() => setPriceExpanded(!isPriceExpanded)}> {/* Add this block */}
                <span className="arrow">{isPriceExpanded ? '▲' : '▼'}</span> Search by Price
            </button>
            {isPriceExpanded && (
                <div>
                    <button>Price 1</button>
                    <button>Price 2</button>
                    <button>Price 3</button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;