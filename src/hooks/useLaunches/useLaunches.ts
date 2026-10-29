import { useEffect, useReducer } from 'react';
import { launchesReducer, initialState } from '../useLaunchesReducer';

const API_URL = 'https://kata-spacex.onrender.com/api/launches';

export const useLaunches = () => {
    const [state, dispatch] = useReducer(launchesReducer, initialState);

    useEffect(() => {
        const fetchLaunches = async () => {
            dispatch({ type: 'FETCH_START' });

            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                dispatch({ type: 'FETCH_SUCCESS', payload: data.launches });
            } catch (error) {
                dispatch({
                    type: 'FETCH_ERROR',
                    payload: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };

        fetchLaunches();
    }, []);

    const openModal = (launch: typeof initialState.launches[0]) => {
        dispatch({ type: 'OPEN_MODAL', payload: launch });
    };

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    return {
        launches: state.launches,
        selectedLaunch: state.selectedLaunch,
        isModalOpen: state.isModalOpen,
        loading: state.loading,
        error: state.error,
        openModal,
        closeModal,
    };
};