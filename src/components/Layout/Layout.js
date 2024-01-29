import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import Hammer from 'rc-hammerjs';

import Icons from '../../pages/components/icons/Icons';
import Notifications from '../../pages/notifications/Notifications';
import Static from '../../pages/tables/static/Static';
import Google from '../../pages/components/maps/google/Google';
import Typography from '../../pages/typography/Typography';
import Charts from '../../pages/components/charts/Charts';
import Dashboard from '../../pages/dashboard';
import '../../App.css'

import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
// import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';

const Layout = ({ sidebarOpened, sidebarPosition, sidebarVisibility, dispatch, location ,user }) => {
  console.log('user-layout?',user)
  // const [chatOpen, setChatOpen] = useState(false);

  // useEffect(() => {
  //   // const handleSwipe = (e) => {
  //   //   if ('ontouchstart' in window) {
  //   //     if (e.direction === 4 && !chatOpen) {
  //   //       dispatch(openSidebar());
  //   //     } else if (e.direction === 2 && sidebarOpened) {
  //   //       dispatch(closeSidebar());
  //   //     }
  //   //     setChatOpen(e.direction === 2);
  //   //   }
  //   // };

  //   // const hammer = new Hammer(window);
  //   // hammer.on('swipe', handleSwipe);

  //   // return () => {
  //   //   hammer.off('swipe', handleSwipe);
  //   // };
  // }, [chatOpen, dispatch, sidebarOpened]);

  return (
    <div
      className={[
        s.root,
        `sidebar-${sidebarPosition}`,
        `sidebar-${sidebarVisibility}`,
      ].join(' ')}
    >
      <div className={s.wrap}>
        <Header  user={user}/>
        <Sidebar />
          <main className={s.content}>
            <BreadcrumbHistory />
            <TransitionGroup>
              <CSSTransition
                classNames="fade"
                timeout={200}
              >
                <Routes>
                  <Route path="/login" element={<Navigate to="/dashboard" />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard email={user}/>} />
                  <Route path="/icons" element={<Icons />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/tables" element={<Static />} />
                  <Route path="/maps" element={<Google />} />
                  <Route path="/typography" element={<Typography />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
            <footer className={s.contentFooter}>
              Light Blue React Template - React admin template made by <a href="https://github.com/SohelSDE">Sohel</a>
            </footer>
          </main>
      </div>
    </div>
  );
};

// Layout.propTypes = {
//   sidebarOpened: PropTypes.bool,
//   sidebarPosition: PropTypes.string,
//   sidebarVisibility: PropTypes.string,
//   dispatch: PropTypes.func.isRequired,
//   location: PropTypes.shape({
//     pathname: PropTypes.string,
//     key: PropTypes.string,
//     // Add other properties if applicable
//   }),
// };

// Layout.defaultProps = {
//   sidebarOpened: false,
//   sidebarPosition: '',
//   sidebarVisibility: '',
// };

// function mapStateToProps(store) {
//   return {
//     sidebarOpened: store.navigation.sidebarOpened,
//     sidebarPosition: store.navigation.sidebarPosition,
//     sidebarVisibility: store.navigation.sidebarVisibility,
//   };
// }

export default Layout;

