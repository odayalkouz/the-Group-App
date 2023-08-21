import axios from "axios";
import { createStore } from "vuex";
import {
	UPDATE_SELECTED_LOCATIONS,
	UPDATE_WEATHER_DATA,
	DELETE_WEATHER_DATA,
	SET_IS_LOADING,
	SET_IS_ERROR,
	SET_IS_DUPLICATE,
	SET_WEATHER_DATA
} from "./mutation-types";

export default createStore({
	state: {
		Countres: [
		  { id: 0, name: 'AMMAN', image: 'https://media.gettyimages.com/id/123720974/photo/king-abdullah-mosque.jpg?s=2048x2048&w=gi&k=20&c=cP9uQ052wlgp7F2qwAZ4l3S1XfamvGrM2yhxPkoVbig=' },
		  { id: 1, name: 'MOSCOW',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 2, name: 'DOHA',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 3, name: 'OTTAWA',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 4, name: 'CAIRO',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 5, name: 'Reykjavík',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 6, name: 'kUWAIT',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 7, name: 'ABU DHABi',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 8, name: 'Riyadh',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' },
		  { id: 9, name: 'DAMASK',image: 'https://cdn.arabsstock.com/uploads/images/93717/image-93717-king-abdullah-financial-center-kafd-riyadh-kingdom-saudi-preview.jpg' }
		],
		months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
		days: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		selectedLocations: [],
		weatherData: [],
		searchValue: "",
		isDuplicate: false,
		isLoading: false,
		isError: false,
	},

	getters: {
		GET_SELECTED_LOCATIONS(state) {
			return state.selectedLocations;
		},
		GET_WEATHER_DATA(state) {
			return state.weatherData;
		},
		GET_IS_LOADING(state) {
			return state.isLoading;
		},
		GET_SEARCH_VALUE(state) {
			return state.searchValue;
		},
		GET_IS_DUPLICATE(state) {
			return state.isDuplicate;
		},
		GET_IS_ERROR(state) {
			return state.isError;
		}
	},

	mutations: {
		[SET_IS_LOADING](state, value) {
			state.isLoading = value;
		},
		[SET_IS_DUPLICATE](state, value) {
			state.isDuplicate = value;
		},
		[SET_IS_ERROR](state, value) {
			state.isError = value;
		},

		[SET_WEATHER_DATA](state, data) {
			state.weatherData = data;
		},

		[UPDATE_SELECTED_LOCATIONS](state) {
			const localStorageLocations = localStorage.getItem("selectedLocations");
			if (!localStorageLocations) {
				state.selectedLocations = [];
			} else {
				state.selectedLocations = JSON.parse(localStorageLocations);
			}
		},

		[UPDATE_WEATHER_DATA](state, data) {
			state.weatherData.push(data);
		},

		[DELETE_WEATHER_DATA](state, id) {
			const itemToRemoveIdx = state.weatherData.findIndex((el) => el.id === id);
			state.weatherData.splice(itemToRemoveIdx, 1);
		},
	},

	actions: {
		async fetchUserLocationInfo() {
			try {
				const response = await axios.get(`https://ipinfo.io/json?token=${process.env.VUE_APP_IP_INFO_KEY}`);
				return response.data;
			} catch (error) {
				console.error(`Failed to fetch User location: ${error.message}`)
			};
		},

		async checkLocationsData({ state, commit, dispatch }) {

			if (!state.selectedLocations[0]) {
				commit(SET_IS_LOADING, true);

				const { city, country } = await dispatch("fetchUserLocationInfo");
				await dispatch("fetchWeatherData", city, country);
				await dispatch("setLocalStorageLocations");

				commit(SET_IS_LOADING, false);
			} else {
				dispatch("loadSelectedLocationsData", state.selectedLocations);
			}
		},

		setLocalStorageLocations({ state, commit }, locations) {
			if (!locations || locations.length === 0) {
				localStorage.setItem("selectedLocations", JSON.stringify(state.weatherData));
			} else {
				localStorage.setItem("selectedLocations", JSON.stringify(locations));
			}
			commit(UPDATE_SELECTED_LOCATIONS);
		},

		async fetchWeatherData({ commit, state }, city, country) {
			try {
				await axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`
					)
					.then((response) => {
						const isDuplicate = state.weatherData.some((location) => location.id === response.data.id);
						if (isDuplicate) {
							commit(SET_IS_DUPLICATE, true)
							return;
						}

						commit(UPDATE_WEATHER_DATA, response.data);
					})
					.catch((error) => {
						console.error(`Error updating weather data: ${error.message}`);
						commit(SET_IS_ERROR, true)
					});
			} catch (error) {
				console.error(`Error fetching weather data: ${error.message}`);
			}
		},

		async handleSearchCity({ dispatch, commit }, value) {
			commit("SET_IS_DUPLICATE", false);
			commit("SET_IS_ERROR", false);
			await dispatch("fetchWeatherData", value);
			dispatch("setLocalStorageLocations");
		},


		loadSelectedLocationsData({ commit, dispatch }, selectedLocations) {
			commit(SET_IS_LOADING, true);

			selectedLocations.map(async (item) => {
				await dispatch("fetchWeatherData", item.name, item.sys.country)
			})
			commit(SET_IS_LOADING, false);
		},
	},
});