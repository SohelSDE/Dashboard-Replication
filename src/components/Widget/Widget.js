import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import s from './Widget.module.scss';
import classNames from 'classnames';
import Loader from '../Loader'; 
import AnimateHeight from 'react-animate-height';
import {v4 as uuidv4} from 'uuid'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const Widget = ({
  title,
  className,
  children,
  close,
  fullscreen,
  collapse,
  refresh,
  settings,
  settingsInverse,
  tooltipPlacement,
  showTooltip,
  bodyClass,
  customControls,
  fetchingData,
  customDropDown,
  customBody,
  prompt,
  collapsed,
  widgetType,
  updateWidgetData,
  options, //eslint-disable-line
  ...attributes
}) => {
  const [randomId] = useState(uuidv4());
  const [hideWidget, setHideWidget] = useState(false);
  const [collapseWidget, setCollapseWidget] = useState(!!collapsed);
  const [height, setHeight] = useState(collapsed ? 0 : 'auto');
  const [fullscreened, setFullscreened] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [modal, setModal] = useState(false);
  const [apiData, setApiData] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setHideWidget(!hideWidget);
  };

  const handleCollapse = () => {
    const heightValue = collapseWidget ? 'auto' : 0;
    setHeight(heightValue);
    setCollapseWidget(!collapseWidget);
    setReloading(false);
  };

  const closeWithModal = () => {
    toggleModal();
    handleClose();
  };

  const handleExpand = () => {
    setHeight('auto');
    setCollapseWidget(false);
  };

  const handleReload = () => {
    const type = widgetType;
    if (type) {
      updateWidgetData(type);
    }
    setReloading(true);
    let endpoint = false;
    if (!endpoint) {
      setTimeout(() => setReloading(false), 2000);
    } else {
      setReloading(true);
      fetch('https://yourapi.com')
        .then((response) => response.json())
        .then((json) => setApiData(json.title))
        .then(setTimeout(() => setReloading(false), 1000));
    }
  };

  const handleFullscreen = () => {
    setFullscreened(!fullscreened);
  };

  return (
    <>
      <section
        style={{ display: hideWidget ? 'none' : '' }}
        className={classNames(
          'widget',
          { fullscreened: !!fullscreened, collapsed: !!collapseWidget },
          s.widget,
          className,
          (reloading || fetchingData) ? s.reloading : ''
        )}
        {...attributes}
      >
        {title && (
          typeof title === 'string' ? (
            <h5 className={s.title}>{title}</h5>
          ) : (
            <header className={s.title}>{title}</header>
          )
        )}

        {!customControls && (
          <div className={`${s.widgetControls} widget-controls`}>
            {settings && (
              <button>
                <i className="la la-cog" />
              </button>
            )}
            {settingsInverse && (
              <button className={`bg-gray-transparent ${s.inverse}`}>
                <i className="la la-cog text-white" />
              </button>
            )}
            {refresh && (
              <button onClick={handleReload} id={`reloadId-${randomId}`}>
                {typeof refresh === 'string' ? (
                  <strong className="text-gray-light">{refresh}</strong>
                ) : (
                  <i className="la la-refresh" />
                )}
                {showTooltip && (
                  <UncontrolledTooltip
                    placement={tooltipPlacement}
                    target={`reloadId-${randomId}`}
                  >
                    Reload
                  </UncontrolledTooltip>
                )}
              </button>
            )}
            {fullscreen && (
              <button onClick={handleFullscreen} id={`fullscreenId-${randomId}`}>
                <i className={`glyphicon glyphicon-resize-${fullscreened ? 'small' : 'full'}`} />
                {showTooltip && (
                  <UncontrolledTooltip
                    placement={tooltipPlacement}
                    target={`fullscreenId-${randomId}`}
                  >
                    Fullscreen
                  </UncontrolledTooltip>
                )}
              </button>
            )}
            {!fullscreened &&
              collapse && (
                <span>
                  <button onClick={handleCollapse} id={`collapseId-${randomId}`}>
                    <i className={`la la-angle-${!collapseWidget ? 'down' : 'up'}`} />
                    {showTooltip && (
                      <UncontrolledTooltip
                        placement={tooltipPlacement}
                        target={`collapseId-${randomId}`}
                      >
                        Collapse
                      </UncontrolledTooltip>
                    )}
                  </button>
                </span>
              )}
            {!fullscreened && (
              (close && !prompt) ? (
                <button onClick={handleClose} id={`closeId-${randomId}`}>
                  {typeof close === 'string' ? (
                    <strong className="text-gray-light">{close}</strong>
                  ) : (
                    <i className="la la-remove" />
                  )}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`closeId-${randomId}`}
                    >
                      Close
                    </UncontrolledTooltip>
                  )}
                </button>
              ) : (
                <button onClick={toggleModal} id={`closeId-${randomId}`}>
                  {typeof close === 'string' ? (
                    <strong className="text-gray-light">{close}</strong>
                  ) : (
                    <i className="la la-remove" />
                  )}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`closeId-${randomId}`}
                    >
                      Modal
                    </UncontrolledTooltip>
                  )}
                </button>
              ))}
          </div>
        )}
        {customDropDown && (
          <div className={`${s.widgetControls} widget-controls`}>
            <UncontrolledDropdown>
              <DropdownToggle tag="span" data-toggle="dropdown">
                <i className="glyphicon glyphicon-cog" />
              </DropdownToggle>
              <DropdownMenu className="bg-widget-transparent" right>
                <DropdownItem onClick={handleReload} title="Reload">
                  Reload &nbsp;&nbsp;
                  <span className="badge badge-pill badge-success animate__animated animate__bounceIn">
                    <strong>9</strong>
                  </span>
                </DropdownItem>

                <DropdownItem onClick={handleFullscreen} title={!fullscreened ? "Full Screen" : "Restore"}>
                  {!fullscreened ? "Fullscreen" : "Restore"}
                </DropdownItem>
                <DropdownItem divider />
                {!fullscreened && (!prompt ? (
                  <DropdownItem onClick={handleClose} title="Close">
                    Close
                  </DropdownItem>
                ) : (
                  <DropdownItem onClick={toggleModal} title="Close">
                    Close
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
        <AnimateHeight duration={500} height={height}>
          <div className={`${s.widgetBody} widget-body ${bodyClass}`}>
            {reloading || fetchingData ? (
              <Loader className={s.widgetLoader} size={40} />
            ) : (
              customBody ? (
                <div className="jumbotron handle bg-default text-white mb-0">
                  <div className="container">
                    <h1>Draggable story!</h1>
                    <p className="lead">
                      <em>Build</em> your own interfaces! Sit back and relax.
                    </p>
                    <p className="text-center">
                      <button onClick={handleFullscreen} className="btn btn-danger btn-lg">
                        {!fullscreened ? (
                          <>
                            Fullscreen me! &nbsp;
                            <i className="fa fa-check" />
                          </>
                        ) : 'Go Back'}
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                children
              )
            )}
          </div>
        </AnimateHeight>
      </section>
      {prompt && (
        <Modal isOpen={modal} toggle={toggleModal} id="news-close-modal">
          <ModalHeader toggle={toggleModal} id="news-close-modal-label">Sure?</ModalHeader>
          <ModalBody className="bg-white">
            Do you really want to unrevertably remove this super news widget?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={toggleModal} data-dismiss="modal">
              No
            </Button>{' '}
            <Button color="danger" onClick={closeWithModal} id="news-widget-remove">
              Yes, remove widget
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <div style={{ display: fullscreened ? 'block' : 'none' }} className={s.widgetBackground}></div>
    </>
  );
};

Widget.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fullscreen: PropTypes.bool,
  collapse: PropTypes.bool,
  refresh: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  settings: PropTypes.bool,
  settingsInverse: PropTypes.bool,
  tooltipPlacement: PropTypes.string,
  showTooltip: PropTypes.bool,
  bodyClass: PropTypes.string,
  customControls: PropTypes.bool,
  options: PropTypes.object, //eslint-disable-line,
  fetchingData: PropTypes.bool,
};

Widget.defaultProps = {
  title: null,
  className: '',
  children: [],
  close: false,
  fullscreen: false,
  collapse: false,
  refresh: false,
  settings: false,
  settingsInverse: false,
  tooltipPlacement: 'bottom',
  showTooltip: false,
  bodyClass: '',
  customControls: false,
  customClose: null,
  customExpand: null,
  customCollapse: null,
  customFullscreen: null,
  customReload: null,
  customDropDown: null,
  prompt: false,
  collapsed: false,
  options: {},
  fetchingData: false,
  widgetType: "",
};

export default Widget;
