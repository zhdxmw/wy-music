export const SET_List = 'SET_List'
export const PLAY_SONG = 'PLAY_SONG'
export const PLAY_STATE = 'PLAY_STATE'
export const PLAY_LOADING = 'PLAY_LOADING'

export function setList(data) {
    return {
        type: SET_List,
        data
    }
}

export function playSong(data) {
    return {
        type: PLAY_SONG,
        data
    }
}

export function playState(data) {
    return {
        type: PLAY_STATE,
        data
    }
}

export function Loadding(data) {
    return {
        type : PLAY_LOADING,
        data
    }
}


