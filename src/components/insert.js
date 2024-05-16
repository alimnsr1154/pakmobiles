const connect = require('../../src/db');

async function insertData(data) {
    try {
        const db = await connect();
        const collection = db.collection('mobiles');
        const result = await collection.insertMany(data);
        console.log("Data inserted successfully:", result);
    } catch (err) {
        console.error("Error inserting data into MongoDB:", err);
    }
}
const data = [
    {
        name: 'Samsung Galaxy S21',
        brand: 'Samsung',
        price: 799,
        image: 'iphone.jpeg',
        rating: 4.5,
        description: 'The Samsung Galaxy S21 is a flagship Android smartphone featuring powerful specifications and a sleek design.',
        specs: {
            build: {
                OS: 'Android 11',
                UI: 'One UI 3.1',
                dimensions: '151.7 x 71.2 x 7.9 mm',
                weight: '171 g',
                SIM: 'Single SIM (Nano-SIM and/or eSIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)',
                colors: 'Phantom Gray'
            },
            processor: {
                CPU: 'Octa-core',
                chipset: 'Exynos 2100',
                GPU: 'Mali-G78 MP14'
            },
            memory: {
                builtIn: '128GB 8GB RAM',
                card: 'No'
            },
            battery: {
                capacity: '4000 mAh'
            }
        }
    },
    {
        name: 'Samsung Galaxy S20',
        brand: 'Samsung',
        price: 699,
        image: 'samsung_s20.jpeg',
        rating: 4.4,
        description: 'The Samsung Galaxy S20 is a powerful Android smartphone with advanced camera features and a stunning display.',
        specs: {
            build: {
                OS: 'Android 10, upgradable to Android 11, One UI 3.0',
                UI: 'One UI 2',
                dimensions: '151.7 x 69.1 x 7.9 mm',
                weight: '163 g',
                SIM: 'Single SIM (Nano-SIM and/or eSIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)',
                colors: 'Cosmic Gray, Cloud Blue, Cloud Pink, Cosmic Black'
            },
            processor: {
                CPU: 'Octa-core',
                chipset: 'Exynos 990',
                GPU: 'Mali-G77 MP11'
            },
            memory: {
                builtIn: '128GB 8GB RAM',
                card: 'microSDXC (uses shared SIM slot)'
            },
            battery: {
                capacity: '4000 mAh'
            }
        }
    },
    {
        name: 'Samsung Galaxy S10',
        brand: 'Samsung',
        price: 599,
        image: 'samsung_s10.jpeg',
        rating: 4.3,
        description: 'The Samsung Galaxy S10 is a flagship smartphone with a beautiful design and powerful performance.',
        specs: {
            build: {
                OS: 'Android 9.0 (Pie), upgradable to Android 11, One UI 3.0',
                UI: 'One UI 1.1',
                dimensions: '149.9 x 70.4 x 7.8 mm',
                weight: '157 g',
                SIM: 'Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)',
                colors: 'Prism White, Prism Black, Prism Green, Prism Blue, Canary Yellow, Flamingo Pink'
            },
            processor: {
                CPU: 'Octa-core',
                chipset: 'Exynos 9820',
                GPU: 'Mali-G76 MP12'
            },
            memory: {
                builtIn: '128GB 8GB RAM',
                card: 'microSDXC (uses shared SIM slot)'
            },
            battery: {
                capacity: '3400 mAh'
            }
        }
    },
    {
        name: 'iPhone 13 Pro Max',
        brand: 'Apple',
        price: 1099,
        image: 'iphone_13_pro_max.jpeg',
        rating: 4.8,
        description: 'The iPhone 13 Pro Max is Apple\'s flagship smartphone, featuring a large display, powerful performance, and advanced camera system.',
        specs: {
            build: {
                OS: 'iOS 15',
                UI: 'N/A',
                dimensions: '160.8 x 78.1 x 7.4 mm',
                weight: '238 g',
                SIM: 'Nano-SIM and/or eSIM',
                colors: 'Graphite, Gold, Silver, Sierra Blue'
            },
            processor: {
                CPU: 'Hexa-core',
                chipset: 'Apple A15 Bionic',
                GPU: 'Apple GPU (4-core graphics)'
            },
            memory: {
                builtIn: '128GB 6GB RAM',
                card: 'No'
            },
            battery: {
                capacity: '4352 mAh'
            }
        }
    },
    {
        name: 'iPhone 13 Pro',
        brand: 'Apple',
        price: 999,
        image: 'iphone_13_pro.jpeg',
        rating: 4.7,
        description: 'The iPhone 13 Pro is a premium smartphone from Apple, featuring a sleek design, powerful performance, and advanced camera capabilities.',

        specs: {
            build: {
                OS: 'iOS 15',
                UI: 'N/A',
                dimensions: '146.7 x 71.5 x 7.4 mm',
                weight: '204 g',
                SIM: 'Nano-SIM and/or eSIM',
                colors: 'Graphite, Gold, Silver, Sierra Blue'
            },
            processor: {
                CPU: 'Hexa-core',
                chipset: 'Apple A15 Bionic',
                GPU: 'Apple GPU (4-core graphics)'
            },
            memory: {
                builtIn: '128GB 6GB RAM',
                card: 'No'
            },
            battery: {
                capacity: '3095 mAh'
            }
        }
    },
    {
        name: 'iPhone 13',
        brand: 'Apple',
        price: 799,
        image: 'iphone_13.jpeg',
        rating: 4.6,
        description: 'The iPhone 13 is a sleek and powerful smartphone from Apple, featuring a stunning display, advanced camera system, and long-lasting battery life.',

        specs: {
            build: {
                OS: 'iOS 15',
                UI: 'N/A',
                dimensions: '146.7 x 71.5 x 7.4 mm',
                weight: '174 g',
                SIM: 'Nano-SIM and/or eSIM',
                colors: 'Starlight, Midnight, Blue, Pink, Red, Green'
            },
            processor: {
                CPU: 'Hexa-core',
                chipset: 'Apple A15 Bionic',
                GPU: 'Apple GPU (4-core graphics)'
            },
            memory: {
                builtIn: '128GB 4GB RAM',
                card: 'No'
            },
            battery: {
                capacity: '3240 mAh'
            }
        }
    },
    {
        name: 'iPhone 12 Pro Max',
        brand: 'Apple',
        price: 1099,
        image: 'iphone_12_pro_max.jpeg',
        rating: 4.7,
        description: 'The iPhone 12 Pro Max is a premium smartphone from Apple, featuring a large display, powerful performance, and advanced camera capabilities.',
        specs: {
            build: {
                OS: 'iOS 14, upgradable to iOS 15',
                UI: 'N/A',
                dimensions: '160.8 x 78.1 x 7.4 mm',
                weight: '228 g',
                SIM: 'Nano-SIM and/or eSIM',
                colors: 'Silver, Graphite, Gold, Pacific Blue'
            },
            processor: {
                CPU: 'Hexa-core',
                chipset: 'Apple A14 Bionic',
                GPU: 'Apple GPU (4-core graphics)'
            },
            memory: {
                builtIn: '128GB 6GB RAM',
                card: 'No'
            },
            battery: {
                capacity: '3687 mAh'
            }
        }
    },
    {
        name: 'Huawei P50 Pro',
        brand: 'Huawei',
        price: 999,
        image: 'huawei_p50_pro.jpeg',
        rating: 4.5,
        description: 'The Huawei P50 Pro is a flagship smartphone known for its premium design, powerful performance, and advanced camera features.',
        specs: {
            build: {
                OS: 'HarmonyOS 2',
                UI: 'N/A',
                dimensions: '158.8 x 72.8 x 8.5 mm',
                weight: '195 g',
                SIM: 'Hybrid Dual SIM (Nano-SIM, dual stand-by)',
                colors: 'Golden Black, Cocoa Gold, Pearl White, Charm Pink'
            },
            processor: {
                CPU: 'Octa-core',
                chipset: 'Kirin 9000',
                GPU: 'Mali-G78 MP24'
            },
            memory: {
                builtIn: '256GB 8GB RAM',
                card: 'NM (Nano Memory), up to 256GB (uses shared SIM slot)'
            },
            battery: {
                capacity: '4360 mAh'
            }
        }
    },
    {
        name: 'Huawei Mate 40 Pro',
        brand: 'Huawei',
        price: 899,
        image: 'huawei_mate_40_pro.jpeg',
        rating: 4.6,
        description: 'The Huawei Mate 40 Pro is a flagship smartphone known for its exceptional camera capabilities, powerful performance, and sleek design.',
        specs: {
            build: {
                OS: 'Android 10, EMUI 11, no Google Play Services',
                UI: 'N/A',
                dimensions: '162.9 x 75.5 x 9.1 mm',
                weight: '212 g',
                SIM: 'Hybrid Dual SIM (Nano-SIM, dual stand-by)',
                colors: 'Mystic Silver, White, Black, Green, Yellow'
            },
            processor: {
                CPU: 'Octa-core',
                chipset: 'Kirin 9000E',
                GPU: 'Mali-G78 MP22'
            },
            memory: {
                builtIn: '256GB 8GB RAM',
                card: 'NM (Nano Memory), up to 256GB (uses shared SIM slot)'
            },
            battery: {
                capacity: '4400 mAh'
            }
        }
    },
    {
        name: 'Huawei P40 Pro',
        brand: 'Huawei',
        price: 799,
        image: 'huawei_p40_pro.jpeg',
        rating: 4.4,
        description: 'The Huawei P40 Pro is a flagship smartphone with an impressive camera setup, sleek design, and powerful performance.',
        specs: {
            build: {
                OS: 'Android 10, EMUI 10.1, no Google Play Services',
                UI: 'N/A',
                dimensions: '158.2 x 72.6 x 8.95 mm',
                weight: '209 g',
                SIM: 'Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)',
                colors: 'Silver Frost, Blush Gold, Deep Sea Blue, Ice White, Black'
            },
            processor: {
                CPU: 'Octa-core',
                chipset: 'Kirin 990 5G',
                GPU: 'Mali-G76 MP16'
            },
            memory: {
                builtIn: '256GB 8GB RAM',
                card: 'NM (Nano Memory), up to 256GB (uses shared SIM slot)'
            },
            battery: {
                capacity: '4200 mAh'
            }
        }
    },
    // Add more phone objects here
];

insertData(data);