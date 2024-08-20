(() => {
  const backgroundImagesURL = [
    {
      bgName: "sunny",
      bgURL: "sunny.jpg",
    },
    {
      bgName: "cloudy",
      bgURL: "cloudy.png",
    },
    {
      bgName: "rainy",
      bgURL: "rainy.png",
    },
    {
      bgName: "thunderstorm",
      bgURL: "thunderstorm.png",
    },
    {
      bgName: "windy",
      bgURL: "windy.png",
    },
  ];
  const weatherContainer = document.querySelector(".weather-container");
  const nameDiv = document.querySelector(".name");
  const dateDiv = document.querySelector(".date");
  const weatherConditionIcon = document.querySelector(
    ".weather-condition-icon"
  );
  const form = document.querySelector(".form");
  const error = document.querySelector(".error");

  const weatherConditionInfo = document.querySelector(
    ".weather-condition-info"
  );

  const degreeDiv = document.querySelector(".degree");
  const tempMaxDiv = document.querySelector(".temp-max-div");
  const tempMinDiv = document.querySelector(".temp-min-div");
  const humadityDiv = document.querySelector(".humadity-div");
  const cloudyDiv = document.querySelector(".cloudy-div");
  const windDiv = document.querySelector(".wind-div");

  const apiKey = "112643c301e40cb81b9c70b2466c88f8";

  form.addEventListener("submit", (event) => {
    const weatherMain = async () => {
      event.preventDefault();
      const formData = new FormData(form);
      const searchInput = formData.get("search").trim().toLowerCase();
      if (!searchInput) {
        error.textContent = "Type Location";
        return;
      }

      try {
        const weatherURLFetching = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`
        );

        const weatherURLFetchedData = await weatherURLFetching
          .json()
          .then((res) => {
            let { main, wind, weather, clouds, sys, dt, name } = res;

            const searchCountryFullName = new Intl.DisplayNames([sys.country], {
              type: "region",
            }).of(sys.country);
            nameDiv.textContent = `${name}, ${searchCountryFullName}`;
            console.log(dt, "API Date");

            let date = new Date();
            let time = date.getTime();
            console.log(time, "Current Date");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally((execution = "Complete") => {
            console.log(execution);
          });

        if (!weatherURLFetching.ok) {
          throw new Error((error.textContent = "Network response was not ok"));
        }
      } catch (error) {
        console.log(error);
      }
    };
    weatherMain();
  });
})();

// .then((res) => {
//   let weatherURLFetchingData = res.json();
//   console.log(weatherURLFetchingData);

// })
