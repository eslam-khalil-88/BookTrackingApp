import React from 'react';

function Footer(props){

    if(props.PageType === 'Main'){
        return (
            <footer style = {{
                marginTop: "auto",
                left: "0",
                bottom: "0",
                width: "100%",
                height: "2.6em",
                backgroundColor: "black",
                
                }}>
              <p style = {{color: "white",textAlign: "center" , padding: "0.7em"}}>@Copyrights for eslam</p>
            </footer>
        );
    }
    else{
        return (
            <footer style = {{
                marginTop: "auto",
                left: "0",
                bottom: "0",
                width: "100%",
                height: "2.6em",
                backgroundColor: "black",
                position: "relative"
                }}>
              <p style = {{color: "white",textAlign: "center" , paddingBottom: "0.4em"}}>@Copyrights for eslam</p>
            </footer>
        );
    }

    
}

export default Footer;