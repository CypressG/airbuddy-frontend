import axios from "axios";
import SearchBar from "../SearchBar/index";
import Logo from "../Logo/index";
import useLocalStorage from "../../hooks/useLocalStorage";
import stringLengthValidator from "../../validators/stringLengthValidator";
import "./style.scss";
import LocationItem from "../Location/LocationItem";
import Headline from "../Headline";
import { useState } from "react";

const MIN_LENGHT = 3;
const MAX_LENGHT = 30;

const Header = () => {
  const [query, setQuery] = useLocalStorage("query", "");
  const [data, setData] = useLocalStorage("data", []);
  const [validity, setValidity] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (stringLengthValidator(query, MIN_LENGHT, MAX_LENGHT)) {
      // FETCH
      setValidity(true);
      const options = {
        method: "GET",
        url: `https://foreca-weather.p.rapidapi.com/location/search/${query}`,
        params: { lang: "en" },
        headers: {
          "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
          "x-rapidapi-key":
            "489000409fmshedfc99ee4b1f2c0p16696ejsn0edd126fc028",
        },
      };

      // fill data
      axios
        .request(options)
        .then((response) => {
          setData(response.data.locations.slice(0, 5));
        })
        .catch((error) => {
          console.error(error);
        });
      //
    } else {
      setValidity(false);
    }
  };

  return (
    <div>
      <div id="header-container">
        <Logo />
        <div id="default-searchbar-style">
          <SearchBar
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            query={query}
          />
          {!validity && (
            <h1>There should be at least 3 letters and no more than 30</h1>
          )}
        </div>
      </div>
      <div>
        <div className="grid-container">
          <Headline />
          {data.length &&
            data.map((location) => <LocationItem location={location} />)}
        </div>
      </div>
    </div>
  );
};

export default Header;
