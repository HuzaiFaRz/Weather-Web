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
    let searchInputValueGetting = new FormData(form)
      .get("search")
      .trim()
      .toLowerCase();
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
      const weatherURLFetchedData = weatherURLFetching
        .json()
        .then((data) => {
          let { main, wind, weather, clouds, sys, dt, name } = data;

          const searchCountryFullName = new Intl.DisplayNames([sys.country], {
            type: "region",
          }).of(sys.country);

          const apiTime = new Date(dt * 1000);
          const fullDate = {
            hour: "numeric",
            minute: "2-digit",
            day: "numeric",
            weekday: "long",
            month: "long",
            year: "numeric",
          };
          let convertedTime = new Intl.DateTimeFormat("en-US", fullDate).format(
            apiTime
          );

          let tempConverted = Number(
            main.temp.toFixed().toString().slice(0, -1)
          );

          let feelLikeTempConverted = Number(
            main.feels_like.toFixed().toString().slice(0, -1)
          );
          let minTempConverted = Number(
            main.temp_min.toFixed().toString().slice(0, -1)
          );
          let maxTempConverted = Number(
            main.temp_max.toFixed().toString().slice(0, -1)
          );
          let weatherConditionLongInfoConverted =
            weather[0].description.charAt().toUpperCase() +
            weather[0].description.slice(1, weather[0].description.lenght);

          tempDiv.innerHTML = `${tempConverted}&#176`;
          nameDiv.innerHTML = `${name},  ${searchCountryFullName}`;
          dateDiv.innerHTML = convertedTime;
          weatherConditionShortInfoDiv.innerHTML = `${weather[0].main}`;
          weatherConditionLongInfoDiv.innerHTML =
            weatherConditionLongInfoConverted;
          tempFeelLikeDiv.innerHTML = `${feelLikeTempConverted}&#176 <i class="ri-temp-hot-line feel-like-icon"></i>`;
          tempMinDiv.innerHTML = `${minTempConverted}&#176 <i class="ri-temp-cold-line temp-min-icon"></i>`;
          tempMaxDiv.innerHTML = `${maxTempConverted}&#176  <i class="ri-temp-hot-line temp-max-icon"></i>`;
          humadityDiv.innerHTML = `${main.humidity}% <i class="ri-drop-line humadity-icon"></i>`;
          cloudyDiv.innerHTML = `${clouds.all}% <i class="ri-cloud-line cloudy-icon"></i>`;
          windDiv.innerHTML = `${wind.speed.toFixed()} km/h <i class="ri-windy-line wind-icon"></i>`;
          pressureDiv.innerHTML = `${main.pressure}hPa <i class="ri-windy-line pressure-icon"></i>`;

          if (convertedTime.includes("PM")) {
            if (weatherConditionShortInfoDiv.innerHTML === "Thunderstorm") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[0].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Haze") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[1].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Clouds") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[2].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Clear") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[3].bgURL})`;
            } else if (
              weatherConditionShortInfoDiv.innerHTML === "Rain" ||
              weatherConditionShortInfoDiv.innerHTML === "Drizzle"
            ) {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[4].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Sunny") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[5].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Smoke") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesPMURL[6].bgURL})`;
            }
          }
          if (convertedTime.includes("AM")) {
            if (weatherConditionShortInfoDiv.innerHTML === "Thunderstorm") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[0].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Haze") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[1].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Clouds") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[2].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Clear") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[3].bgURL})`;
            } else if (
              weatherConditionShortInfoDiv.innerHTML === "Rain" ||
              weatherConditionShortInfoDiv.innerHTML === "Drizzle"
            ) {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[4].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Sunny") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[5].bgURL})`;
            } else if (weatherConditionShortInfoDiv.innerHTML === "Smoke") {
              weatherContainer.style.backgroundImage = `url(${backgroundImagesAMURL[6].bgURL})`;
            }
          }
        })
        .catch((underError) => {
          underError =
            "It looks like we're having trouble accessing the country information. It might be missing or not set up correctly. Please check the data source or ensure the information is provided.";
          errorContainerVisible();
          errorCloseBtn.addEventListener("click", errorContainerUnVisible);
          searchInput.value = "";
          errorDiv.innerHTML = underError;
        })
        .finally((execution = "Complete") => {
          console.log(execution);
          searchInput.value = "";
        });

      if (!weatherURLFetching.ok) {
        errorContainerVisible();
        errorCloseBtn.addEventListener("click", errorContainerUnVisible);
        searchInput.value = "";
        errorDiv.innerHTML =
          "Network response was not ok. </br> Wrong Spelling.";
      }
    } catch (mainError) {
      mainError =
        "It looks like we're having trouble accessing the country information. It might be missing or not set up correctly. Please check the data source or ensure the information is provided.";
      errorContainerVisible();
      errorCloseBtn.addEventListener("click", errorContainerUnVisible);
      searchInput.value = "";
      errorDiv.innerHTML = mainError;
    }
  };

  weatherMain();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    weatherMain();
  });
})();
