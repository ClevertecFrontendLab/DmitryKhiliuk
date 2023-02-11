import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';

import {Provider} from 'react-redux';
import {AGREEMENT, ALL_BOOKS, ANY_BOOKS, BOOK, BOOKS, MAIN, RULES} from './common/routes';
import {Layout} from './components/layout';
import {BookPage} from './pages/book';
import {MainPage} from './pages/main';
import {MainBlock} from './pages/main/main-block';
import {Terms} from './pages/main/terms';


import './index.css';
import {store} from './redux/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    <Route path={MAIN} element={<Layout/>}>
                        <Route path={MAIN} element={<MainPage/>}>
                            <Route path={MAIN} element={<Navigate to={BOOKS}/>}/>
                            <Route path={BOOKS} element={<Navigate to={ALL_BOOKS}/>}/>
                            <Route path={ANY_BOOKS} element={<MainBlock/>}/>
                            <Route path={RULES} element={<Terms contentView ='rules'/>}/>
                            <Route path={AGREEMENT} element={<Terms contentView = 'agreement'/>}/>
                        </Route>
                        <Route path={BOOK} element={<BookPage/>}/>
                    </Route>
                </Routes>
            </Provider>
        </HashRouter>
    </React.StrictMode>
);
