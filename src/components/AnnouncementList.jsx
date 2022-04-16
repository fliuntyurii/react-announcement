import style from './Announcement.module.css';

const AnnouncementList = props => {
    return (
        <div className={style.AnnouncementList}>
            <header className={style.header}>
                <button onClick={props.modalForAdding}>Add new announcement</button>
                <p><span>!!!</span> ANNOUNCEMENT <span>!!!</span></p>
                <div>
                    <input onChange={props.searching} value={props.word} ref={props.searchedItem} type="text" />
                    <button onClick={props.searching}>Search</button>
                    <button onClick={props.resetSearching}>Reset</button>
                </div>
            </header>

            { props.isAdding && 
                <div className={style.addingBlock}>
                    <p>Title:</p>
                    <input ref={props.title} type="text" />
                    <p>Event description:</p>
                    <input ref={props.description} type="text" />
                    <button onClick={props.addNewBlock}>Create</button>
                </div>
            }

            { props.validator &&
                <p className={style.validator}>EMPTY FIELDS</p>
            }

            <main className={style.mainContent}>{
                props.announcementList.map(el => <div key={el.id} className={style.announcement}>
                    <img src={el.image} alt="description" />
                    <h2>{el.title}</h2>
                    <p>{el.description}</p>

                    <div>
                        <span>{el.date}</span>
                        <button id={el.id} onClick={props.editBlock}>Edit</button>
                        <button id={el.id} onClick={props.deleteBlock}>Delete</button>
                    </div>

                </div>)
            }</main>

            <footer className={style.footer}>
                <p>Copyrigth 2022 by FY</p>
                <p>All rights reserved</p>
            </footer>

            { props.isEditing &&
                <div className={style.modalWindow}>
                    <div className={style.modalWindowContent}>
                        <div>
                            <p>Edit title</p>
                            <input ref={props.editTitle} type="text" />
                            <p>Edit description</p>
                            <input ref={props.editDescription} type="text" />
                        </div>
                        <button onClick={props.editBlock}>Submit</button> 
                    </div>
                </div>
            }
        </div>
    )
}

export default AnnouncementList;