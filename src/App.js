import React , {useEffect, useState} from 'react';
import {Route , Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './App.css';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';
import Footer from './components/Footer';
import * as BooksAPI from './BooksAPI.js';


let ToRead_Arr = [] , Current_Arr = [] , Read_Arr = [];
export {ToRead_Arr , Current_Arr};
let Books = []; // Used to save my books


function App() {

                                            
  
  /************************* State Variables ************************************* */
         // State to update the main page after adding books to my shelf
  const [newpage , setNewPage] = useState(0);   
  
         // Select between Books/Main Page & Search Page
  const [pgtype , setpgtype] = useState('Books');
  useEffect(() => {
    async function GetBooks(){
      ToRead_Arr = [];
      Current_Arr = [];
      Read_Arr = [];
       for(let i = 0; i < Books.length ; i++){
        if(Books[i].shelf === "wantToRead"){
          ToRead_Arr.push(Books[i]);
        }
        else if(Books[i].shelf === "currentlyReading"){
          Current_Arr.push(Books[i]);
        }
        else{
          Read_Arr.push(Books[i]);
        }
      }
      setNewPage(newpage+1);
    }
    
    const booksFetch = async () => {
      await BooksAPI.getAll().then((books) => {Books = books.splice(0)});
      await GetBooks();      
    };
     
    console.log(Books);
    booksFetch(); 
  } , []);

  
             // Search values representing name of book to find
  let [searchEntry , setEntry] = useState('');
                       //Updating Search Results
  let [SearchResults , setSearchResults] = useState([{}]);
                 //Fetching search results as a side effect
  useEffect(() => {
    const getSearchResults = async () => { 
      let newinfo = [{}], results = [];
      let res = ''; 
      
      if(searchEntry === ''){
        res = await BooksAPI.search(' ' , 20);
        setSearchResults([]);
      }
      else{
        try{
          res = await BooksAPI?.search(searchEntry , 20);
          results = await res?.filter((element) => (element?.title !== undefined || 
            element?.authors !== undefined || element?.imageLinks.thumbnail !== undefined));
          
                    setSearchResults(results);
        }
        catch(e){
          setSearchResults([]);
        }
        
        
      }                
    };

    getSearchResults();
  } , [searchEntry]);
  

            /******************* Removing a book from a list ********************* */

 function RemoveBook(bookInfo , list) {
  

  if(list === "currentlyreading"){
    let filteredList = Current_Arr.filter((element) => element.title !== bookInfo.title);
    Current_Arr.length = 0;
    Current_Arr.push(...filteredList);
    
  }
  else if(list === "New"){
    //Nothing
  }
  else if(list === "wanttoread"){ // In case the book to be removed is in Want to Read shelf
    let filteredList = ToRead_Arr.filter((element) => element.title !== bookInfo.title);
    ToRead_Arr.length = 0;
    ToRead_Arr.push(...filteredList);
    
  }
  else { // In case it's Read list
    let filteredList = Read_Arr.filter((element) => element.title !== bookInfo.title);
    Read_Arr.length = 0;
    Read_Arr.push(...filteredList);
    
  }

  setNewPage(newpage + 1);
 } 

  /************************************ Main Application ********************************************* */

  return (
    <Routes>

      <Route path = "/" element = {
          <div className="App">
          <h1 id = "SiteTitle"> Reading Books App</h1>
           
          <MainPage pageType = {pgtype} ChangePage = {setpgtype}
             
             ReadList = {Read_Arr} CurrentList = {Current_Arr} 
             ToReadList = {ToRead_Arr}
             PageState = {newpage} UpdatePage = {setNewPage}
    
             SearchVal = {searchEntry} UpdateRes = {setEntry}
             searchresults = {SearchResults} ChangeResults = {setSearchResults}
             removeBook = {RemoveBook}
          />
        </div>
      }></Route>


      <Route path = "/search" element = {
        <div className="App">
        <h1 id = "SiteTitle"> Reading Books App</h1>
        <div id = "searchpage">
            
           <SearchPage SearchVal = {searchEntry} UpdateRes = {setEntry}
              ClosePage = {setpgtype}
              ToReadlist = {ToRead_Arr}
              CurrentList = {Current_Arr} ReadList = {Read_Arr} 
              PageState = {newpage} UpdatePage = {setNewPage}
              
              SearchResults = {SearchResults} changeResults = {setSearchResults}
              removeBook = {RemoveBook}
               />
              {searchEntry === '' ? '' : <Footer PageType = {"Search"}/>}

          </div>
        </div>
      }></Route>

    </Routes>
    
  );
}

export default App;
