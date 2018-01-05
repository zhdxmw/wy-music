import {combineReducers} from 'redux'
import {SET_List} from '../action/Index'
const initState = {
    audio: {
        songUrl: '',
        imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
        title: '',
        singer: '',
        currentLength: 0,
        songLength: 0,
        currentFlag: false
    },
    head: {
        toggle: false,
        title: '',
        style: {'background': 'rgba(43,162,251,0)'}
    },
    headNav: 'head-nav1',
    audioLoadding: false,
    listenCount: 0,
    player:{
        detailPlayerFlag: false,
        showPlayer: false,
        isPlay: false,
    },
    listInfo: {
        songList: [],
        songIndex: 0
    }
}

function change_song(state = initState, action) {
    switch (action.type) {
        case SET_List:
            return Object.assign({},state,action.data)
        default:
            return state
    }
}

export default combineReducers({
    change_song
})