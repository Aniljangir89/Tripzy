import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanel,
  setPickup,
  setDestination,
  isPickup,
  query,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null); // Reset error before each fetch attempt

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { address: query },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        const suggestionData = response.data?.suggestions || response.data || [];
        setSuggestions([...new Set(suggestionData)]); // Remove duplicates
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("An error occurred while fetching suggestions. Please try again later.");
        }
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  return (
    <div className="Location_panel">
      <div className="locations">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : suggestions.length === 0 ? (
          <p>No suggestions found</p>
        ) : (
          <>
            {/* Show pickup suggestions if isPickup is true */}
            {isPickup && (
              <div className="pickup-suggestions">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setPickup(suggestion.label);
                     
                      
                    }}
                    className="near-location"
                    aria-label="Select this pickup location"
                  >
                    <h2><i className="ri-user-location-line"></i></h2>
                    <h4>{suggestion.label}</h4>
                  </div>
                ))}
              </div>
            )}

            {/* Show destination suggestions if isPickup is false */}
            {!isPickup && (
              <div className="destination-suggestions">
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setDestination(suggestion.label);
               
                  
                    }}
                    className="near-location"
                    aria-label="Select this destination location"
                  >
                    <h2><i className="ri-user-location-line"></i></h2>
                    <h4>{suggestion.label}</h4>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
