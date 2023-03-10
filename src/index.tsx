import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';

import {
    AGREEMENT,
    ALL_BOOKS,
    ANY_BOOKS,
    AUTH,
    BOOK,
    BOOKS,
    MAIN,
    RECOVERY,
    REG,
    RULES
} from './common/routes';
import {Auth} from './components/auth/authorization';
import {Forgot} from './components/auth/recovery';
import {Registration} from './components/auth/registration';
import {Layout} from './components/layout';
import {BookPage} from './pages/book';
import {MainPage} from './pages/main';
import {MainBlock} from './pages/main/main-block';
import {Terms} from './pages/main/terms';
import {store} from './redux/store';
import {InterceptorApi} from './interceptor-api';

import './index.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <InterceptorApi/>
                <Routes>
                    <Route path={AUTH} element={<Auth/>}/>
                    <Route path={REG} element={<Registration/>}/>
                    <Route path={RECOVERY} element={<Forgot/>}/>
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
