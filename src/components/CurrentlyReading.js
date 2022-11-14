import '../css/CurrentlyReading.css';
import BookComp from './BookComp';


function CurrentlyReading(props){
   let i = 0; // used for assigning keys to array elements
    return (
      <div>
        <h3 style = {{marginLeft: "1.1em"}}> Currently Reading books</h3>
     <div className = "CurrentlyReadingStyle">
         {props.CurrentList.map((element) => <BookComp key = {i++} bookimg = {element?.imageLinks.thumbnail} 
         bookname = {element?.title} bookauthor = {element?.authors}
         type = {"CurrentlyReading"}
         DataA = {props.ToReadlist} DataB = {props.CurrentList} DataC = {props.ReadList}
         BookPageState = {props.ReadPageState} BookUpdatePage = {props.ReadUpdatePage}
         removeBook = {props.removeBook}
         />
         )}
         </div>
         </div>
    );
}

export default CurrentlyReading;