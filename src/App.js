import React from 'react';
import Home from './Home';
import Runner from './Runner';

const pageToShow = (pageName) => {
    if (pageName === 'Home') return <Home />;
    if (pageName === 'Runner') return <Runner />;
    return <div>Not Found</div>;
};


const App = ({ pageName }) => {
    return (
        <div>{pageToShow(pageName)}</div>
    );
};


export default App;


