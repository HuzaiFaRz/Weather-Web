(() => {
  const backgroundImagesPMURL = [
    {
      bgName: "Thunderstorm",
      bgURL: "PMThunderstorm.jpg",
    },
    {
      bgName: "Windy",
      bgURL: "PMWindy.jpg",
    },

    {
      bgName: "Cloudy",
      bgURL: "PMCloudy.jpg",
    },
    {
      bgName: "Clear",
      bgURL: "PMClear.jpg",
    },

    {
      bgName: "Rainy",
      bgURL: "PMRaining.png",
    },

    {
      bgName: "Sunny",
      bgURL: "PMSunny.png",
    },

    {
      bgName: "Smoke",
      bgURL: "PMSmoke.jpg",
    },
  ];
  const backgroundImagesAMURL = [
    {
      bgName: "Thunderstorm",
      bgURL: "AMThunderstorm.jpg",
    },
    {
      bgName: "Windy",
      bgURL: "AMWindy.jpg",
    },

    {
      bgName: "Cloudy",
      bgURL: "AMCloudy.jpg",
    },
    {
      bgName: "Clear",
      bgURL: "AMClear.jpg",
    },

    {
      bgName: "Rainy",
      bgURL: "AMRaining.jpg",
    },

    {
      bgName: "Sunny",
      bgURL: "AMSunny.png",
    },

    {
      bgName: "Smoke",
      bgURL: "AMSmoke.jpg",
    },
  ];
  const weatherContainer = document.querySelector(".weather-container");
  const nameDiv = document.querySelector(".name");
  const dateDiv = document.querySelector(".date");
  const weatherConditionIcon = document.querySelector(
    ".weather-condition-icon"
  );
  const form = document.querySelector(".form");
  const searchInput = document.querySelector(".search");

  const weatherConditionShortInfoDiv = document.querySelector(
    ".weather-condition-short-info"
  );
  const weatherConditionLongInfoDiv = document.querySelector(
    ".weather-condition-long-info"
  );
  const errorContainer = document.querySelector(".error-container");
  const errorDiv = document.querySelector(".error");
  const errorCloseBtn = document.querySelector(".error-close");

  const tempDiv = document.querySelector(".temp");
  const tempFeelLikeDiv = document.querySelector(".feel-like-div");
  const tempMaxDiv = document.querySelector(".temp-max-div");
  const tempMinDiv = document.querySelector(".temp-min-div");
  const humadityDiv = document.querySelector(".humadity-div");
  const cloudyDiv = document.querySelector(".cloudy-div");
  const windDiv = document.querySelector(".wind-div");
  const pressureDiv = document.querySelector(".pressure-div");
  const errorContainerVisible = () => {
    gsap.to(errorContainer, {
      opacity: 1,
      zIndex: 11,
      scale: 1,
      ease: Power3.easeInOut,
      duration: 0.5,
    });
  };

  const errorContainerUnVisible = () => {
    gsap.to(errorContainer, {
      opacity: 0,
      zIndex: -11,
      scale: 0,
      ease: Power3.easeInOut,
      duration: 0.5,
    });
  };

  const weatherMain = async () => {
    let searchInputValueGetting = new FormData(form).get("search").trim();
    if (!searchInputValueGetting) {
      errorContainerVisible();
      errorCloseBtn.addEventListener("click", errorContainerUnVisible);
      searchInput.value = "";
      errorDiv.innerHTML = "Type Location";
      return;
    }
    const apiKey = "112643c301e40cb81b9c70b2466c88f8";
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputValueGetting}&appid=${apiKey}`;

    try {
      const weatherURLFetching = await fetch(apiURL);
      const weatherURLFetchedData = await weatherURLFetching.json();
      if (!weatherURLFetching.ok) {
        errorContainerVisible();
        errorCloseBtn.addEventListener("click", errorContainerUnVisible);
        searchInput.value = "";
        errorDiv.innerHTML = `${weatherURLFetchedData.cod}</br>${weatherURLFetchedData.message}`;
      }

      let { main, wind, weather, clouds, sys, dt, name } =
        weatherURLFetchedData;

      const searchCountryFullName = new Intl.DisplayNames([sys.country], {
        type: "region",
      }).of(sys.country);

      const weathertimeConverting = (dt) => {
        const apiTime = new Date(dt * 1000);
        const fullDateOption = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        };
        return new Intl.DateTimeFormat(["en-US"], fullDateOption).format(
          apiTime
        );
      };
      weathertimeConverting(dt);

      let weatherConditionLongInfoConverted =
        weather[0].description.charAt().toUpperCase() +
        weather[0].description.slice(1, weather[0].description.lenght);

      let tempConverted = (main.temp - 273.15).toFixed();

      let feelLikeTempConverted = (main.feels_like - 273.15).toFixed(1);
      let minTempConverted = (main.temp_min - 273.15).toFixed(1);
      let maxTempConverted = (main.temp_max - 273.15).toFixed(1);

      tempDiv.innerHTML = `${tempConverted}&#176`;
      tempFeelLikeDiv.innerHTML = `${feelLikeTempConverted}&#176 <i class="ri-temp-hot-line feel-like-icon"></i>`;
      tempMinDiv.innerHTML = `${minTempConverted}&#176 <i class="ri-temp-cold-line temp-min-icon"></i>`;
      tempMaxDiv.innerHTML = `${maxTempConverted}&#176  <i class="ri-temp-hot-line temp-max-icon"></i>`;

      nameDiv.innerHTML = `${name},  ${searchCountryFullName}`;
      dateDiv.innerHTML = weathertimeConverting(dt);
      weatherConditionShortInfoDiv.innerHTML = `${weather[0].main}`;
      weatherConditionLongInfoDiv.innerHTML = weatherConditionLongInfoConverted;
      weatherConditionIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
      );

      humadityDiv.innerHTML = `${main.humidity}% <i class="ri-drop-line humadity-icon"></i>`;
      cloudyDiv.innerHTML = `${clouds.all}% <i class="ri-cloud-line cloudy-icon"></i>`;
      windDiv.innerHTML = `${wind.speed.toFixed()} km/h <i class="ri-windy-line wind-icon"></i>`;
      pressureDiv.innerHTML = `${main.pressure} hPa <i class="ri-windy-line pressure-icon"></i>`;

      if (weathertimeConverting(dt).includes("PM")) {
        if (weatherConditionShortInfoDiv.innerHTML === "Thunderstorm") {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[0].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Haze") {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[1].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Clouds") {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[2].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Clear") {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[3].bgURL})`;
        } else if (
          weatherConditionShortInfoDiv.innerHTML === "Rain" ||
          weatherConditionShortInfoDiv.innerHTML === "Drizzle"
        ) {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[4].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Sunny") {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[5].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Smoke") {
          document.body.style.backgroundImage = `url(${backgroundImagesPMURL[6].bgURL})`;
        }
      } else {
        if (weatherConditionShortInfoDiv.innerHTML === "Thunderstorm") {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[0].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Haze") {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[1].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Clouds") {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[2].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Clear") {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[3].bgURL})`;
        } else if (
          weatherConditionShortInfoDiv.innerHTML === "Rain" ||
          weatherConditionShortInfoDiv.innerHTML === "Drizzle"
        ) {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[4].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Sunny") {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[5].bgURL})`;
        } else if (weatherConditionShortInfoDiv.innerHTML === "Smoke") {
          document.body.style.backgroundImage = `url(${backgroundImagesAMURL[6].bgURL})`;
        }
      }
    } catch (mainError) {
      // mainError = `${weatherURLFetchedData.message}`;
      mainError =
        "An error occurred because some information is missing or there is a spelling mistake. Please check and fill out all required fields correctly.";
      errorContainerVisible();
      errorCloseBtn.addEventListener("click", errorContainerUnVisible);
      searchInput.value = "";
      errorDiv.innerHTML = mainError;
    } finally {
      searchInput.value = "";
    }
  };
  weatherMain();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    weatherMain();
  });
})();
