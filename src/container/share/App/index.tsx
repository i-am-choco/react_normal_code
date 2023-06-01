
import { DemoMap } from '@views/demoMap';
import { Home } from '@views/Home';
import { Page } from '@views/Page';
import { DBGUI } from '@views/Page/dbGui';
import { Geometry } from '@views/Page/geometry';
import { House } from '@views/Page/house';
import { Lights } from '@views/Page/lights';
import { Material } from '@views/Page/material';
import { Particle } from '@views/Page/particle';
import { Shadows } from '@views/Page/shadow';
import { Texture } from '@views/Page/texture';
import { ThreeText } from '@views/Page/threeText';
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
                    <Route path="/demoMap" element={ <DemoMap />}></Route>{/** 地图demo */}
                    <Route path="/pointMark" element={<Pointmark />}></Route>{/** 位置标注 */}

                     {/* three学习 */}
                    <Route path="/baic" element={<Page />}></Route> {/** 基础使用、自适应全屏 */}
                    <Route path="/geometry" element={<Geometry />}></Route>{/** 缓存几何体 */}
                    <Route path="/dbGUI" element={<DBGUI />}></Route> {/** 调试ui工具 */}
                    <Route path="/texture" element={<Texture />}></Route>{/** 纹理 */}
                    <Route path="/material" element={<Material />}></Route>{/** 材质 */}
                    <Route path="/3DText" element={<ThreeText />}></Route>{/** 3D文字 */}
                    <Route path="/lights" element={<Lights />}></Route>{/** 灯光的使用 */}
                    <Route path="/shadows" element={<Shadows />}></Route>{/** 阴影 */}
                    <Route path="/hauntedHouse" element={<House />}></Route>{/** 鬼屋 */}
                    <Route path="/particle" element={<Particle />}></Route>{/** 粒子 */}
                </Routes>
            </Router>
        )
    }
}
export default App;