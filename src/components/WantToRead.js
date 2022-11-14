import '../css/WantToRead.css';
import BookComp from './BookComp';

function WantToRead(props){
   let i = 0;
    return(

      <div>
        <h3 style = {{marginLeft: "1.1em"}}> Want to Read Books</h3>
         <div className = "WantToReadStyle">
         {props.ToReadlist.map((element) => <BookComp key = {i++} 
           bookimg = {element?.imageLinks.thumbnail} 
           bookname = {element?.title} bookauthor = {element?.authors}
           type = {"WantToRead"}
           DataA = {props.ToReadlist} DataB = {props.CurrentList} DataC = {props.ReadList}
         BookPageState = {props.CollectionPageState} BookUpdatePage = {props.CollectionUpdatePage}
         removeBook = {props.removeBook} 
         />
         )}
         
         </div>
         </div>
    );
}

export default WantToRead;