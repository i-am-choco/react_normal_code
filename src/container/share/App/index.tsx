
import { Home } from '@views/Home';
import { Page } from '@views/Page';
import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
function Loading() {
    return <div>Loading...</div>;
}
// const Home = Loadable({
//     loader: () => import('@views/Home'),
//     loading: Loading,
//     render: () => <div>Home</div>
// });

// const Page = Loadable({
//     loader: () => import('@views/Page'),
//     loading: Loading,
//     render: () => <div>Page</div>
// });
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="page" element={<Page />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
export default App;