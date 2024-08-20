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
  const degree = document.querySelector(".degree");
  const name = document.querySelector(".name");
  const date = document.querySelector(".date");
  const weatherConditionIcon = document.querySelector(
    ".weather-condition-icon"
  );
  const form = document.querySelector(".form");
  const error = document.querySelector(".error");

  const weatherConditionInfo = document.querySelector(
    ".weather-condition-info"
  );
  const tempMaxValue = document.querySelector(".temp-max-value");
  const tempMinValue = document.querySelector(".temp-min-value");
  const humadityValue = document.querySelector(".humadity-value");
  const cloudyValue = document.querySelector(".cloudy-value");
  const windValue = document.querySelector(".wind-value");
  const apiKey = "bfcec19f6ef1d97a2c4501545dc2dd94";

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
        )
          .then((res) => {
            let weatherURLFetchingData = res.json();
            console.log(weatherURLFetchingData);
            if (!res.ok) {
              throw new Error(
                (error.textContent = "Network response was not ok")
              );
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally((execution = "Complete") => {
            console.log(execution);
          });
      } catch (error) {
        console.log(error);
      }
    };
    weatherMain();
  });
})();
