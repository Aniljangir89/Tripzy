import React, { createContext, useState, useEffect } from 'react';

const CaptainContext = createContext();

const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);

    useEffect(() => {
        console.log("Captain Context Updated:", captain);
    }, [captain]);

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    );
};

export { CaptainContext, CaptainProvider };
