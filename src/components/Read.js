import '../css/Read.css';
import BookComp from './BookComp';


function Read(props){
   let i =0;

    return(
      <div>
        <h3 style = {{marginLeft: "1.1em"}}> Read Books</h3>
        <div className = "ReadStyle">
        {props.ReadList.map((element) => <BookComp key = {i++} bookimg = {element?.imageLinks.thumbnail} 
         bookname = {element?.title} bookauthor = {element?.authors}
         type = {"Read"}
         DataA = {props.ToReadlist} DataB = {props.CurrentList} DataC = {props.ReadList}
         removeBook = {props.removeBook}
         />
        )}
        </div>
        </div>
    );
}

export default Read;