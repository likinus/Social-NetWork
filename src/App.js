import React, {Suspense} from 'react';
import './App.css';
import Nav from './components/Navbar/Nav';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initializeApp} from './Redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './Redux/reduxStore';
import NotFoundPage from './components/common/PageNotFoundComponent/NotFoundPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
    catchAllUnhandleError = (promiseRejectionEvent) => {
        // alert(promiseRejectionEvent); //нужно закинуть в редюсер и обработать
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandleError);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandleError);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Nav state={this.props.state}/>
                <div className="app-wrapper-content">
                    <Route exact path="/">
                        <Redirect to={'/profile'}/>
                    </Route>
                    <Route exact path="/Social-NetWork">
                        <Redirect to={'/profile'}/>
                    </Route>
                    <Route path="/dialogs">
                        <Suspense fallback={<Preloader/>}>
                            <DialogsContainer/>
                        </Suspense>
                    </Route>
                    <Route path="/profile/:userId?">
                        <Suspense fallback={<Preloader/>}>
                            <ProfileContainer/>
                        </Suspense>
                    </Route>
                    <Route path="/news">
                        <News/>
                    </Route>
                    <Route path="/music">
                        <Music/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                    <Route path="/users">
                        <UsersContainer pageTitle="Hello world"/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Redirect path="*">
                        <NotFoundPage/>
                    </Redirect>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

let MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
};

export default MainApp;
