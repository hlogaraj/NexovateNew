const initialState = {
    isLoggedIn: false, // Initial state
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
};

export const sideMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPENSIDEMENU':
            return {...state, sideMenuOpen: true};
        case 'CLOSESIDEMENU':
            return {...state, sideMenuOpen: false};
        default:
            return state;
    }
}


