import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CountryContext = createContext()

export const CountryProvider = ({ children }) => {
    const [countries, setCountries] = useState([])
    const [blocked_countries, setBlocked_countries] = useState(["French Polynesia"])

    useEffect(() => {

        axios.get('https://restcountries.com/v3.1/all', {

        })
            .then((response) => {
                const countryNames = Object.keys(response.data).map((countryCode) => {
                    return { name: response.data[countryCode].name.common };
                });

                setCountries(countryNames.sort((a, b) => a.name.localeCompare(b.name)))

            })
            .catch((err) => {
                console.log(err)
            })

        const storedArrayAsString = sessionStorage.getItem('blocked_countries');

        const storedArray = JSON.parse(storedArrayAsString);

        if (storedArray == null) {
            sessionStorage.setItem('blocked_countries', JSON.stringify([]));
            setBlocked_countries([])
        } else {
            setBlocked_countries(storedArray)
        }

    }, [])


    useEffect(() => {
        sessionStorage.setItem('blocked_countries', JSON.stringify(blocked_countries));
    }, [blocked_countries])

    const handleAddBannerCountry = (country) => {
        if (!blocked_countries.map((c) => c.toLowerCase()).includes(country.toLowerCase())) {
            setBlocked_countries((prev) => [...prev, country])
        } else {
            setBlocked_countries((prev) => prev.filter((value) => value !== country))
        }

    }

    return (
        <CountryContext.Provider value={{ countries, blocked_countries, handleAddBannerCountry }}>
            {children}
        </CountryContext.Provider>
    )
}
