import { connect } from "react-redux";
import { deleteAnnouncement, editAnnouncement, addNewAnnouncement, findedAnnouncement, searching } from "../redux/announcementReducer";
import AnnouncementList from "./AnnouncementList";
import React, { useState, useRef, useEffect } from "react";

const AnnouncementListContainer = props => {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setisEditing] = useState(false);
    const [ID, setID] = useState(0);
    const [announcementList, setAnnouncementList] = useState(props.announcementList);
    const [validator, setValidator] = useState(false);

    const title = useRef();
    const description = useRef();
    const editTitle = useRef();
    const editDescription = useRef();
    const searchedItem = useRef();

    const image = 'https://englishlib.org/dictionary/img/wlibrary/a/5fe8cb11ef4064.65573491.jpg';
    const date = new Date(); 
    let [hour, minutes, day, month, year] = [date.getHours(), 
        date.getMinutes(), date.getDate(), date.getMonth(), date.getFullYear()];

    const deleteBlock = (ev) => {
        const id = ev.target.getAttribute('id');
        props.deleteAnnouncement(id);
    }

    const modalForAdding = () => {
        isAdding ? setIsAdding(false) : setIsAdding(true);
    }

    const addNewBlock = () => {
        isAdding ? setIsAdding(false) : setIsAdding(true);
        month < 9 ? month = `0${month+1}` : month = month + 1;
        hour < 10 ? hour = `0${hour}` : hour = hour;
        minutes < 10 ? minutes = `0${minutes}` : minutes = minutes;

        const id = props.announcementList[props.announcementList.length-1].id + 1;
        const date = `${hour}:${minutes}, ${day}.${month}.${year}`;
        const object = {id, title: title.current.value, image, description: description.current.value, date};

        if(object.title != false && object.description != false) props.addNewAnnouncement(object);
        if(object.title == false || object.description == false) setValidator(true);
    }

    const editBlock = (ev) => {
        debugger
        isEditing ? setisEditing(false) : setisEditing(true); setID(+ev.target.getAttribute('id'))
        const findedObject = props.announcementList.find(el => el.id === ID);

        let newTitle; editTitle.current.value ? newTitle = editTitle.current.value : newTitle = findedObject.title;
        let newDescr; editDescription.current.value ? newDescr = editDescription.current.value : newDescr = findedObject.description;

        const object = {id: findedObject.id, title: newTitle, image, description: newDescr, date: findedObject.date};

        props.deleteAnnouncement(ID);
        props.editAnnouncement(object);
    }

    const searching = () => {
        props.searching(searchedItem.current.value)
    }

    useEffect(() => {
        const findedObjects = [];
        for(let i = 0; i < props.announcementList.length; i++) {
            if(props.announcementList[i].title.split(' ').some(el => 
                    el.slice(0, props.word.length).toUpperCase() == props.word.toUpperCase()) || 
                props.announcementList[i].description.split(' ').some(el => 
                    el.slice(0, props.word.length).toUpperCase() == props.word.toUpperCase())) findedObjects.push(props.announcementList[i]);
        }

        setAnnouncementList(findedObjects)
        props.findedAnnouncement(announcementList);
    }, [props.word]);

    const resetSearching = () => {
        props.searching('')
        setAnnouncementList(props.announcementList);
        props.findedAnnouncement(announcementList);
    }

    useEffect(() => {
        setAnnouncementList(props.announcementList)
    }, [props.announcementList]);

    useEffect(() => {
        setTimeout(() => {
            setValidator(false)
        }, 1500);
    }, [validator]);

    return (
        <AnnouncementList 
            announcementList={announcementList}
            deleteBlock={deleteBlock}
            editBlock={editBlock} 
            addNewBlock={addNewBlock}
            searching={searching}
            isAdding={isAdding}
            modalForAdding={modalForAdding}
            description={description}
            title={title}
            isEditing={isEditing}
            editTitle={editTitle}
            editDescription={editDescription}
            resetSearching={resetSearching}
            searchedItem={searchedItem}
            word={props.word}
            validator={validator}   />
    )
}

const mapStateToProps = (state) => {
    return {
        announcementList: state.announcementReducer.announcementList,
        findedAnnouncementList: state.announcementReducer.findedAnnouncementList,
        word: state.announcementReducer.word,
    }
}

export default connect(mapStateToProps, 
    { deleteAnnouncement, addNewAnnouncement, editAnnouncement, findedAnnouncement, searching })
    (AnnouncementListContainer);
