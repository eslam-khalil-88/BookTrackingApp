import React from 'react';
import WantToRead from './WantToRead';
import CurrentlyReading from './CurrentlyReading';
import Read from './Read';


function BookShelf(props){


  return (
   <div id = "BookShelf">
          <WantToRead ToReadlist = {props.ToReadList}
              ReadList = {props.ReadList} CurrentList = {props.CurrentList}
              CollectionPageState = {props.PageState} CollectionUpdatePage = {props.UpdatePage}
              removeBook = {props.removeBook}
              />
             <hr/>
             <CurrentlyReading ToReadlist = {props.ToReadList}
              ReadList = {props.ReadList} CurrentList = {props.CurrentList}
             ReadPageState = {props.PageState} ReadUpdatePage = {props.UpdatePage}
             removeBook = {props.removeBook}
             />
             <hr/>
             <Read  ToReadlist = {props.ToReadList} CurrentList = {props.CurrentList}
                  ReadList = {props.ReadList}
                 removeBook = {props.removeBook}
                />
    </div>
  );





    /*

      // In case of selecting Want to Read shelf
   if(props.type === "wanttoread"){

   }

   // In case of selecting Currently reading shelf
   else if(props.type === "currentlyreading"){

   }
   
   // Last case of read books shelf
   else{

   }                                               */
}

export default BookShelf;