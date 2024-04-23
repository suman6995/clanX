import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWeatherSuccess } from "../Redux/Actions/weatherActions";
import weatherImg from "./img1.png";
import profileImg from "./img2.JPG";
import daysImg from "./img3.png";
import {
  CustomColumnContainer,
  CustomColumn3,
  CloudContainer,
  ImageContainer,
  CustomColumn9,
  TopContainer,
  BottomContainer,
  BottomHighlightContainer,
} from "./StyledComponents";

class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      unit: "metric", // Default unit is Celsius
      searchCity: "",
      loading: false, // Add loading state
      currentDateTime: "",
      cityImage: null,
    };
  }

  componentDidMount() {
    this.getLocation();
    this.intervalID = setInterval(
      () => this.tick(),
      1000 // Update every second
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick = () => {
    const currentDate = new Date();
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][currentDate.getDay()];
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    this.setState({
      currentDateTime: (
        <span>
          <span style={{ color: "black" }}>{dayOfWeek}</span>,{" "}
          <span style={{ color: "grey" }}>{formattedTime}</span>
        </span>
      ),
    });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({ latitude, longitude }, () => {
            // Call fetchWeatherData after setting state
            this.fetchWeatherData();
            this.fetchCityImage();
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Error getting geolocation. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  handleSearch = async () => {
    const { searchCity } = this.state;
    if (!searchCity) {
      alert("Please enter a city name.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${this.state.unit}&appid=6eb29ad317760a65298f8236f73c0a69`
      );
      const data = await response.json();
      if (data.cod === "404") {
        alert("City not found.");
        return;
      }
      const { coord } = data;
      this.setState(
        {
          latitude: coord.lat,
          longitude: coord.lon,
        },
        () => {
          this.fetchWeatherData();
          this.fetchCityImage();
        }
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data.");
    }
  };

  fetchWeatherData = async () => {
    this.setState({ loading: true }); // Set loading to true before fetching data
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=${this.state.unit}&appid=6eb29ad317760a65298f8236f73c0a69`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ loading: false }); // Set loading to false after fetching data
        this.props.fetchWeatherSuccess(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        this.setState({ loading: false }); // Set loading to false if there's an error
      });
  };
  fetchCityImage = async () => {
    const apiKey = "nDmvOMQ576PSLHK4dab2UE43FcpsUsT0Pev-g6ERZs4"; // Replace with your Google Maps API key
    fetch(
      `https://api.unsplash.com/search/photos?query=${this.state.searchCity}&orientation=landscape&per_page=1&client_id=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Assuming data.results is an array of photo objects
        if (data.results.length > 0) {
          const cityImage = data.results[0].urls.regular;
          this.setState({ cityImage: cityImage });
        } else {
          console.error("No city image found");
        }
      })
      .catch((error) => console.error("Error fetching city image:", error));
  };

  handleChangeUnit = (newUnit) => {
    this.setState({ unit: newUnit }, () => {
      this.fetchWeatherData({
        coords: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      });
    });
  };

  render() {
    const { weatherData } = this.props;
    const { searchCity, unit, loading, currentDateTime, cityImage } =
      this.state;
    return (
      <div>
        {loading ? ( // Conditional rendering of loader
          <p style={{ marginTop: "40px" }}>
            Loading weather data...please wait
          </p>
        ) : (
          weatherData && (
            <CustomColumnContainer>
              <CustomColumn3>
                <div>
                  <button onClick={this.handleSearch}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="Search for places..."
                    value={searchCity}
                    onChange={(e) =>
                      this.setState({ searchCity: e.target.value })
                    }
                  />
                  <i
                    class="fa fa-compass"
                    aria-hidden="true"
                    style={{
                      fontSize: "20px",
                      color: "#767676",
                      marginLeft: "10px",
                    }}
                  ></i>
                </div>
                <img src={weatherImg} alt="" />
                <h1>
                  {weatherData.main.temp}{" "}
                  <span> {unit === "metric" ? "°C" : "°F"}</span>
                </h1>
                <p>{currentDateTime}</p>
                <hr />

                {weatherData.clouds && (
                  <CloudContainer>
                    <i className="fa fa-cloud" aria-hidden="true"></i>
                    {weatherData.clouds.all < 10
                      ? "Less cloudy"
                      : weatherData.clouds.all > 40
                      ? "Mostly cloudy"
                      : "Cloudy"}
                  </CloudContainer>
                )}
                <p>Rain data is not available in free API</p>
                <ImageContainer>
                  <img src={cityImage} alt="" />
                  <h2>
                    {weatherData.name}, {weatherData.sys.country}
                  </h2>
                </ImageContainer>
              </CustomColumn3>
              <CustomColumn9>
                <TopContainer unit={unit}>
                  <p>Today</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button onClick={() => this.handleChangeUnit("metric")}>
                      °C
                    </button>
                    <button2 onClick={() => this.handleChangeUnit("imperial")}>
                      °F
                    </button2>
                    <img src={profileImg} alt="" />
                  </div>
                </TopContainer>
                <BottomContainer>
                  <p>
                    Note: This 7 days data is not available in free API so i
                    used png here.
                  </p>
                  <img src={daysImg} alt="" />

                  <h1>Today's Highlights</h1>
                </BottomContainer>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "60px",
                    marginTop: "14px",
                    padding: "0 40px",
                  }}
                >
                  <BottomHighlightContainer>
                    <h4>Visibility</h4>
                    <h3>
                      {weatherData.visibility / 1000} <span>Km</span>
                    </h3>
                  </BottomHighlightContainer>
                  <BottomHighlightContainer>
                    <h4>Wind Speed</h4>
                    <h3>
                      {weatherData.wind.speed} <span>Km/h</span>
                    </h3>
                  </BottomHighlightContainer>
                  <BottomHighlightContainer>
                    <h4>Humidity</h4>
                    <h3> {weatherData.main.humidity}</h3>
                  </BottomHighlightContainer>
                </div>
              </CustomColumn9>
            </CustomColumnContainer>
          )
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  weatherData: state.weather.weatherData,
});
export default connect(mapStateToProps, { fetchWeatherSuccess })(
  WeatherContainer
);