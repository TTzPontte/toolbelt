import React from 'react';
import './styles.scss'

const Content = ({children}) => {
    return (<div className="Content" style={{display: 'block'}}>
        <div className="container ">
            <div className="flex" style={{height: '100vh'}}>
                <div className="flex row wrap" style={{height: '100vh'}}>
                    {/*<div className="flex col" style={{height: '100vh'}}>*/}
                       <div className="container"> {children}
                    {/*</div>*/}
                </div>
                </div>
            </div>
                {/*<div className={"watermark"}/>*/}
                {/*<div className={"watermark"}/>*/}

            </div>
        </div>);
};

export default Content;