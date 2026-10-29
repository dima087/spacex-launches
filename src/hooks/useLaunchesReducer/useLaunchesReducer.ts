import type { Launch } from '../../types';

export type LaunchesState = {
    launches: Launch[];
    selectedLaunch: Launch | null;
    isModalOpen: boolean;
    loading: boolean;
    error: string | null;
};

export type LaunchesAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Launch[] }
    | { type: 'FETCH_ERROR'; payload: string }
    | { type: 'OPEN_MODAL'; payload: Launch }
    | { type: 'CLOSE_MODAL' }
    | { type: 'RESET' };

export const launchesReducer = (
    state: LaunchesState,
    action: LaunchesAction
): LaunchesState => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                launches: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                selectedLaunch: action.payload,
                isModalOpen: true,
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                selectedLaunch: null,
                isModalOpen: false,
            };
        case 'RESET':
            return {
                launches: [],
                selectedLaunch: null,
                isModalOpen: false,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const initialState: LaunchesState = {
    launches: [],
    selectedLaunch: null,
    isModalOpen: false,
    loading: false,
    error: null,
};