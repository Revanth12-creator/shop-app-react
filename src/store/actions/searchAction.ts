const ActionTypes = {
    CHANGE_SEARCH: "[Search] Update Search",
};

const changeSearch = (data: string) => {
    return {
        type: ActionTypes.CHANGE_SEARCH, 
        data, 
    };
};

export default { changeSearch, ActionTypes };