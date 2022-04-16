const baseImage = 'https://englishlib.org/dictionary/img/wlibrary/a/5fe8cb11ef4064.65573491.jpg'

const initialState = {
    announcementList: [
        {
            id: 1,
            title: 'Example 1',
            image: baseImage,
            description: 'It\'s first announcement example',
            date: '15:00, 10.10.2021'
        },
        {
            id: 2,
            title: 'Example 2',
            image: baseImage,
            description: 'It\'s second announcement example',
            date: '16:00, 10.10.2021'
        },
        {
            id: 3,
            title: 'Example 3',
            image: baseImage,
            description: 'It\'s third announcement example',
            date: '17:00, 10.10.2021'
        },
    ],
    findedAnnouncementList: [],
    word: ''
}

const announcementReducer = (state = initialState, action) => {
    if (action.type === 'ADD-NEW-ANNOUNCEMENT') {
        return {
            ...state,
            announcementList: [...state.announcementList, action.announcement]
        }
    }

    if (action.type === 'DELETE-ANNOUNCEMENT') {
        return {
            ...state,
            announcementList: [...state.announcementList.filter(p => p.id !== +action.number)]
        }
    }

    if (action.type === 'EDIT-ANNOUNCEMENT') {
        return {
            ...state,
            announcementList: [...state.announcementList.filter(p => p.id !== +action.announcement.id), 
                action.announcement].sort((a,b) => a.id - b.id)
        }
    }

    if (action.type === 'FINDED-ANNOUNCEMENT') {
        return {
            ...state,
            findedAnnouncementList: [...action.announcement]
        }
    }

    if (action.type === 'SEARCHED-WORD') {
        return {
            ...state,
            word: action.word
        }
    }

    return state;
}

export const addNewAnnouncement = (announcement) => ({type: 'ADD-NEW-ANNOUNCEMENT', announcement });

export const deleteAnnouncement = (number) => ({type: 'DELETE-ANNOUNCEMENT', number });

export const editAnnouncement = (announcement) => ({type: 'EDIT-ANNOUNCEMENT', announcement });

export const findedAnnouncement = (announcement) => ({type: 'FINDED-ANNOUNCEMENT', announcement });

export const searching = (word) => ({type: 'SEARCHED-WORD', word });

export default announcementReducer;