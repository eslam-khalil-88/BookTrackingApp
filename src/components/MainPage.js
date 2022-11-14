import React  from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import Footer from './Footer';
import '../css/MainPage.css';

function MainPage(props){


    /**************************** Showing the main/books page  *******************/
    
    return(
      <div id = "mainpage">
        <BookShelf ToReadList = {props.ToReadList}
              ReadList = {props.ReadList} CurrentList = {props.CurrentList}
              CollectionPageState = {props.PageState} CollectionUpdatePage = {props.UpdatePage}
              removeBook = {props.removeBook}
              />

             
               
                <Link to = "/search" id = "AddButton" 
                      type = "submit" onClick = {() => props.ChangePage("Search")}>
                  </Link>
                 
             
                <Footer PageType = {"Main"}/>  

           </div>
    );

                         
}

export default MainPage;