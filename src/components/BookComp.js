import React from 'react';
import '../css/BookComp.css';
import * as BooksAPI from '../BooksAPI.js';



function BookComp(props){

    // DataA -> To Read  , DataB -> Currently Reading , DataC -> Read/Completed
    let ArrA = props.DataA , ArrB = props.DataB, ArrC = props.DataC;
    let BookName = props?.bookname, BookImgsrc = props?.bookimg ,BookAuthor = props?.bookauthor;
    let RemoveBook = props.removeBook;
    let selectedShelf = '' , prevShelf = "";
    

    // Function used to handle selected shelf for a book
    function handleSelect(event){
        selectedShelf = event.target.value;
     if(selectedShelf === "wanttoread"){
        handleToRead();
     }

     else if(selectedShelf === "currentlyreading"){
        handleCurrent();
     }
 
     else {
        handleRead();
     }
     
    }

    //Function to check if one of the search results book belongs to my app
    function ChkMyLibrary(arr , selectedbooktitle , selectedbookauthors){
        
        if(arr.find((element) => element.title === selectedbooktitle && 
            element.authors.join(",") === selectedbookauthors.join(",")) !== undefined){
                if(arr === ArrA){
                    prevShelf = "wanttoread";
                }
                else if(arr === ArrB){
                    prevShelf = "currentlyreading";
                }
                else{
                    prevShelf = "read";
                }
            return true;
        }
        
            return false;
        
    }
    
    // Handle functions for clicking buttons
    function handleToRead(){
       
        let newBook = {id: props.ID , title: BookName ,imageLinks:{thumbnail: BookImgsrc} , authors: BookAuthor};
        
        ArrA?.push(newBook);
        
        BooksAPI.update({id: props.ID , title: BookName ,imageLinks:{thumbnail: BookImgsrc} , authors: BookAuthor}
              , "wantToRead");

        RemoveBook(newBook , prevShelf);
        
    }
    function handleCurrent(){

      let newBook = {title: BookName ,imageLinks:{thumbnail: BookImgsrc} , authors: BookAuthor , id: props.ID};
      ArrB?.push(newBook);
        
        BooksAPI.update({id: props.ID , title: BookName ,imageLinks:{thumbnail: BookImgsrc} , authors: BookAuthor}
            , "currentlyReading");
        RemoveBook(newBook , prevShelf);      
    }
    function handleRead(){

        let newBook = {id: props.ID , title: BookName ,imageLinks:{thumbnail: BookImgsrc} , authors: BookAuthor};
        ArrC?.push(newBook);
        BooksAPI.update({id: props.ID , title: BookName ,imageLinks:{thumbnail: BookImgsrc} , authors: BookAuthor}
            , "read");
        RemoveBook(newBook , prevShelf);
        
    }
    


    if(props.type === "CurrentlyReading"){
        prevShelf = "currentlyreading";
        return (
            <div className = "Book">
               <center>
                <img src = {BookImgsrc} width = "125px" height = "135px" alt = "Book" />
                <p style = {{fontWeight: "bold" , fontSize: "0.9em", width: "11.7em"}}>{BookName}</p>
                <p style = {{textAlign: "center", fontSize: "0.8em",paddingLeft: "0.9em", 
                    fontStyle: "italic"}}>{BookAuthor.join(", ")}</p>
               </center>
               
               <div id = "shelf-selector">
                <select value = {selectedShelf} onChange = {handleSelect}>
                  <option value = "none"> Move to ... </option>
                  <option value = "wanttoread" >To Read</option>
                  <option style = {{backgroundColor: "wheat"}} value = "currentlyreading">✓ Currently Reading</option>
                  <option value = "read" >Read</option>
                 </select>
                </div>
               
             </div>
        );
    }
    else if(props.type === "Read"){
        prevShelf = "read";
        return (
            <div className = "Book">
               <center>
                
                <img src = {BookImgsrc} width = "125px" height = "135px" alt = "Book" />
                <p style = {{fontWeight: "bold" , fontSize: "0.9em", width: "11.7em"}}>{BookName}</p>
                <p style = {{textAlign: "center", fontSize: "0.8em",paddingLeft: "0.9em", 
                    fontStyle: "italic"}}>{BookAuthor.join(", ")}</p>
               </center>
               
               <div id = "shelf-selector">
                <select value = {selectedShelf} onChange = {handleSelect}>
                  <option value = "none"> Move to ... </option>
                  <option value = "wanttoread" >To Read</option>
                  <option value = "currentlyreading" >Currently Reading</option>
                  <option style = {{backgroundColor: "wheat"}} value = "read">✓ Read</option>
                 </select>
                </div>

             </div>
        );
    }
    else if(props.type === "Search"){
        return (
            <div className = "Book">
               <center>
                <img src = {BookImgsrc} width = "125px" height = "135px" alt = "Book" />
                <p style = {{fontWeight: "bold" , fontSize: "0.9em", width: "11.7em"}}>{BookName}</p>
                <p style = {{textAlign: "center", fontSize: "0.8em",paddingLeft: "0.9em", 
                    fontStyle: "italic"}}>{BookAuthor}</p> 
               </center>
               
               <div id = "shelf-selector">
               <select value = {selectedShelf} onChange = {handleSelect}>
                 <option value = "none"> Move to ... </option>
                 {
                 ChkMyLibrary(ArrA , BookName , BookAuthor) === true ?
                   <option style = {{backgroundColor: "wheat"}} value = "wanttoread">✓ To Read</option>
                   :
                   <option value = "wanttoread">To Read</option>
                 }
                 
                 {
                    ChkMyLibrary(ArrB , BookName , BookAuthor) === true ?
                    <option style = {{backgroundColor: "wheat"}} value = "currentlyreading" defaultValue = "currentlyreading">
                           ✓ Currently Reading</option>
                    :
                    <option value = "currentlyreading" defaultValue = "currentlyreading">
                           Currently Reading</option>
                           }
                 {
                    ChkMyLibrary(ArrC , BookName , BookAuthor) === true ?
                    <option style = {{backgroundColor: "wheat"}} value = "read" >✓ Read</option>
                    :
                    <option value = "read" >Read</option>
                    }
                </select>
               </div> 
               
             </div>
        );
    }
    else{
        prevShelf = "wanttoread";
        return (
            <div className = "Book">
                
               <center>
                <img src = {BookImgsrc} width = "125px" height = "135px" alt = "Book" />
                <p style = {{fontWeight: "bold" , fontSize: "0.9em", width: "11.7em"}}>{BookName}</p>
                <p style = {{textAlign: "center", fontSize: "0.8em",paddingLeft: "0.9em", 
                    fontStyle: "italic"}}>{BookAuthor.join(", ")}</p>
               </center>

               <div id = "shelf-selector">
                
                <select value = {selectedShelf} onChange = {handleSelect}>
                  <option value = "none"> Move to ... </option>
                  <option style = {{backgroundColor: "wheat"}} value = "wanttoread">✓ To Read</option>
                  <option value = "currentlyreading" >Currently Reading</option>
                  <option value = "read" >Read</option>
                </select>
               
               </div>
             </div>
        );
    }

    
}

export default BookComp;