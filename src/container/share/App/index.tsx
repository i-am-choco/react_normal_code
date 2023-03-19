
import { DemoMap } from '@views/demoMap';
import { Home } from '@views/Home';
import { Page } from '@views/Page';
import { Pointmark } from '@views/Point';
import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, HashRouter,Route, Routes } from 'react-router-dom';
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
/** 
 * @author: Lusia
 * @description: 现有问题，不适用于动态加载，react-loadable@5.5.0 有其他写法变化，需考虑降版本处理
 */
class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/Home" element={<Home />}></Route>{/** 主页 */}
                    <Route path="/Page" element={<Page />}></Route>
                    <Route path="/demoMap" element={<DemoMap />}></Route>{/** 地图demo */}
                    <Route path="/pointMark" element={<Pointmark />}></Route>{/** 位置标注 */}
                </Routes>
            </Router>
        )
    }
}
export default App;