import React  from 'react';
import {Link} from 'react-router-dom';
import BookComp from './BookComp';
import '../css/SearchPage.css';


function SearchPage(props){
    let FilteredRes = props.SearchResults;
    let i = 0;
    
    return (
        <div id = "SearchPage">
          <div className = "search-bar">
            <Link to = "/" id = "BackButton" type = "submit"  
                 onClick = {() => props.ClosePage('Books')}>
            </Link>
            
            <input id = "Input" type = "text" value = {props.SearchVal} 
                onChange = {(event) => props.UpdateRes(event.target.value)} 
                placeholder = "Search for books"
                />

                </div>
                <div id = "SearchResults">
             {props.SearchVal === ''  ? '' : 
               FilteredRes.map((element) => 
                 <div key = {i++} id = "results">
                    <BookComp key = {i++} bookimg = {element.imageLinks?.thumbnail.toLocaleString()} 
                      bookname = {element?.title} bookauthor = {element?.authors}
                        ID = {element.id} type = {"Search"}
                        DataA = {props.ToReadlist} DataB = {props.CurrentList} 
                        DataC = {props.ReadList}
                        BookState = {props.PageState} BookUpdatePage = {props.UpdatePage}
                        removeBook = {props.removeBook}
                       />
                 </div>
                 )
             }
             

             </div>
             
        </div>
        

    );
}

export default SearchPage;