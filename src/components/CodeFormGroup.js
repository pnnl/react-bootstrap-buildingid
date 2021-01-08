import React from 'react'
import PropTypes from 'prop-types'

import UniqueBuildingIdentification from 'pnnl-buildingid'

import Microsoft from '@pnnl/react-bingmaps'

import {
  Button,
  Form,
  InputGroup,
  Modal,
} from 'react-bootstrap'

import CodeAutosuggestForm from './CodeAutosuggestForm'
import CodeDescription from './CodeDescription'
import CodeFormControl from './CodeFormControl'
import CodeFromLocationForm from './CodeFromLocationForm'
import CodeFromWellKnownTextForm from './CodeFromWellKnownTextForm'
import CodeLengthFormControl from './CodeLengthFormControl'
import CodeMapControl from './CodeMapControl'
import Icon from './Icon'

import useCodeArea from '../hooks-custom/useCodeArea'

import styles from '../styles.module.css'

const LeftPanel = ({
  codeLength,
  disabled,
  latitude,
  longitude,
  query,
  wkt,
  onCodeChange,
  onLatitudeChange,
  onLongitudeChange,
  onQueryChange,
  onWellKnownTextChange,
}) => {
  return (
    <div>
      <CodeAutosuggestForm codeLength={codeLength} disabled={disabled} maxResults={7} query={query} onCodeChange={onCodeChange} onQueryChange={onQueryChange} />
      <hr />
      <CodeFromLocationForm codeLength={codeLength} disabled={disabled} latitude={latitude} longitude={longitude} onCodeChange={onCodeChange} onLatitudeChange={onLatitudeChange} onLongitudeChange={onLongitudeChange} />
      <hr />
      <CodeFromWellKnownTextForm codeLength={codeLength} disabled={disabled} wkt={wkt} onCodeChange={onCodeChange} onWellKnownTextChange={onWellKnownTextChange} />
    </div>
  );
}

LeftPanel.propTypes = {
  codeLength: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  query: PropTypes.string.isRequired,
  wkt: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  onLatitudeChange: PropTypes.func.isRequired,
  onLongitudeChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onWellKnownTextChange: PropTypes.func.isRequired,
}

LeftPanel.defaultProps = {
  codeLength: 11,
  disabled: false,
  latitude: '',
  longitude: '',
  query: '',
  wkt: '',
  onCodeChange: undefined,
  onLatitudeChange: undefined,
  onLongitudeChange: undefined,
  onQueryChange: undefined,
  onWellKnownTextChange: undefined,
}

const RightPanel = ({
  code,
}) => {
  if (code.toString().trim().length === 0) {
    return (
      <p>
        Nothing to display. <small className="text-muted">Try searching for an address or place using the form on the left-hand side of this dialog box.</small>
      </p>
    );
  } else if (UniqueBuildingIdentification.v3.isValid(code)) {
    return (
      <CodeDescription code={code} />
    );
  } else {
    return (
      <p>
        Value is invalid.
      </p>
    );
  }
}

RightPanel.propTypes = {
  code: PropTypes.string.isRequired,
}

RightPanel.defaultProps = {
  code: '',
}

const CodeFormGroup = ({
  code,
  disabled,
  editing,
  history,
  label,
  latitude,
  lockedCode,
  longitude,
  modalLeftPanelVisible,
  modalRightPanelVisible,
  modalVisible,
  modalTitle,
  placeholderCodeLength,
  query,
  wkt,
  onCodeChange,
  onCodeLengthChange,
  onEditingChange,
  onHistoryChange,
  onLatitudeChange,
  onLockedCodeChange,
  onLongitudeChange,
  onModalLeftPanelHide,
  onModalLeftPanelShow,
  onModalRightPanelHide,
  onModalRightPanelShow,
  onModalHide,
  onModalShow,
  onQueryChange,
  onWellKnownTextChange,
}) => {
  const api = React.useState(Microsoft.Maps.ApiContext);

  const lockButtonRef = React.useRef(null);
  const modalLeftPanelButtonRef = React.useRef(null);
  const modalRightPanelButtonRef = React.useRef(null);
  const modalLockButtonRef = React.useRef(null);
  const modalShowButtonRef = React.useRef(null);

  const codeArea = useCodeArea(code);
  const lockedCodeArea = useCodeArea(lockedCode);

  const handleCodeChange = (_code) => {
    onCodeChange && onCodeChange(_code);

    if (UniqueBuildingIdentification.v3.isValid(_code)) {
      onHistoryChange && onHistoryChange([
        ...history,
        _code,
      ]);
    }
  };

  const handleCodeLengthChange = (codeLength) => {
    if (lockedCodeArea) {
      if (lockedCodeArea.centerOfMass.codeLength === codeLength) {
        handleCodeChange(lockedCode);
      } else {
        try {
          const _code = UniqueBuildingIdentification.v3.encode(lockedCodeArea.latitudeLo, lockedCodeArea.longitudeLo, lockedCodeArea.latitudeHi, lockedCodeArea.longitudeHi, lockedCodeArea.centerOfMass.latitudeCenter, lockedCodeArea.centerOfMass.longitudeCenter, codeLength);

          handleCodeChange(_code);
        } catch {}
      }
    } else if (codeArea) {
      try {
        const _code = UniqueBuildingIdentification.v3.encode(codeArea.latitudeLo, codeArea.longitudeLo, codeArea.latitudeHi, codeArea.longitudeHi, codeArea.centerOfMass.latitudeCenter, codeArea.centerOfMass.longitudeCenter, codeLength);

        handleCodeChange(_code);
      } catch {}
    }

    onCodeLengthChange && onCodeLengthChange(codeLength);
  };

  const handleRestoreLockedCodeLinkClick = (event) => {
    event.preventDefault();

    handleCodeChange(lockedCode);

    onLockedCodeChange && onLockedCodeChange(undefined);

    return false;
  };

  const handleRestoreHistoryLinkClick = (event) => {
    event.preventDefault();

    if (Array.isArray(history)) {
      if (codeArea) {
        if (history.length > 1) {
          onCodeChange && onCodeChange(history[history.length - 2]);

          onHistoryChange && onHistoryChange(history.slice(0, history.length - 1));
        }
      } else {
        if (history.length > 0) {
          onCodeChange && onCodeChange(history[history.length - 1]);
        }
      }
    }

    return false;
  };

  const handleLockButtonClick = (event) => {
    if (lockButtonRef.current) {
      lockButtonRef.current.blur();
    }

    onLockedCodeChange && onLockedCodeChange(null);
  };

  const handleUnlockButtonClick = (event) => {
    if (lockButtonRef.current) {
      lockButtonRef.current.blur();
    }

    onLockedCodeChange && onLockedCodeChange(code);
  };

  const handleModalLockButtonClick = (event) => {
    if (modalLockButtonRef.current) {
      modalLockButtonRef.current.blur();
    }

    onLockedCodeChange && onLockedCodeChange(null);
  };

  const handleModalUnlockButtonClick = (event) => {
    if (modalLockButtonRef.current) {
      modalLockButtonRef.current.blur();
    }

    onLockedCodeChange && onLockedCodeChange(code);
  };

  const handleModalLeftPanelButtonClick = () => {
    if (modalLeftPanelButtonRef.current) {
      modalLeftPanelButtonRef.current.blur();
    }

    if (modalLeftPanelVisible) {
      onModalLeftPanelHide && onModalLeftPanelHide();
    } else {
      onModalLeftPanelShow && onModalLeftPanelShow();
    }
  };

  const handleModalRightPanelButtonClick = () => {
    if (modalRightPanelButtonRef.current) {
      modalRightPanelButtonRef.current.blur();
    }

    if (modalRightPanelVisible) {
      onModalRightPanelHide && onModalRightPanelHide();
    } else {
      onModalRightPanelShow && onModalRightPanelShow();
    }
  };

  const handleModalHideButtonClick = () => {
    if (editing) {
      if (window.confirm('There are unsaved changes on this page. Are you sure you want to continue?')) {
        onEditingChange && onEditingChange(false);

        onModalHide && onModalHide();
      } else {
        return;
      }
    } else {
      onModalHide && onModalHide();
    }
  };

  const handleModalShowButtonClick = () => {
    if (modalShowButtonRef.current) {
      modalShowButtonRef.current.blur();
    }

    onModalShow && onModalShow();
  };

  return (
    <React.Fragment>
      <Form.Group>
        {
          label ? (
            <Form.Label>{label}</Form.Label>
          ) : null
        }
        <InputGroup>
          <CodeFormControl
            code={code}
            disabled={disabled || editing || !!lockedCodeArea}
            placeholderCodeLength={placeholderCodeLength}
            onCodeChange={handleCodeChange}
          />
          <InputGroup.Append>
            <CodeLengthFormControl
              className="rounded-0"
              codeLength={codeArea ? codeArea.centerOfMass.codeLength : placeholderCodeLength}
              disabled={disabled || editing}
              onCodeLengthChange={handleCodeLengthChange}
            />
          </InputGroup.Append>
          <InputGroup.Append>
            <Button ref={lockButtonRef} className="border" variant={lockedCodeArea ? 'success' : 'light'} disabled={!codeArea || disabled || editing} onClick={lockedCodeArea ? handleLockButtonClick : handleUnlockButtonClick}>
              {
                lockedCodeArea ? (
                  <Icon.Lock />
                ) : (
                  <Icon.Unlock />
                )
              }
            </Button>
          </InputGroup.Append>
          <InputGroup.Append>
            <Button ref={modalShowButtonRef} className="border" variant="light" disabled={!api} onClick={handleModalShowButtonClick}>
              <Icon.Map />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {
          lockedCodeArea && (code !== lockedCode) ? (
            <Form.Text className="text-muted">
              <span>Restore locked value:</span> <a href="/" onClick={handleRestoreLockedCodeLinkClick}>{lockedCode}</a>
            </Form.Text>
          ) : null
        }
        {
          (Array.isArray(history) && (codeArea ? ((history.length > 1) && (code !== history[history.length - 2])) : ((history.length > 0) && (code !== history[history.length - 1])))) ? (
            <Form.Text className="text-muted">
              <span>Restore previous value:</span> <a href="/" onClick={handleRestoreHistoryLinkClick}>{history[history.length - (codeArea ? 2 : 1)]}</a>
            </Form.Text>
          ) : null
        }
      </Form.Group>
      <Modal animation={false} size={modalLeftPanelVisible ? (modalRightPanelVisible ? 'xl' : 'lg') : (modalRightPanelVisible ? 'lg' : null)} show={modalVisible} onHide={handleModalHideButtonClick}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row pb-3">
            {
              modalLeftPanelVisible ? (
                <div className={`col ${styles['col-md-border']} ${modalRightPanelVisible ? 'col-md-3' : 'col-md-4'}`}>
                  <div className="pb-md-0 pb-sm-3">
                    <LeftPanel
                      codeLength={placeholderCodeLength}
                      disabled={disabled || editing || !!lockedCodeArea}
                      latitude={latitude}
                      longitude={longitude}
                      query={query}
                      wkt={wkt}
                      onCodeChange={handleCodeChange}
                      onLatitudeChange={onLatitudeChange}
                      onLongitudeChange={onLongitudeChange}
                      onQueryChange={onQueryChange}
                      onWellKnownTextChange={onWellKnownTextChange}
                    />
                    <hr className="d-none d-sm-block d-md-none mb-0"/>
                  </div>
                </div>
              ) : null
            }
            <div className={`col ${modalLeftPanelVisible ? (modalRightPanelVisible ? `col-md-6 ${styles['col-md-border']}` : 'col-md-8') : (modalRightPanelVisible ? `col-md-8 ${styles['col-md-border']}` : 'col-md-12')}`}>
              <div className={`d-flex ${modalLeftPanelVisible ? (modalRightPanelVisible ? 'justify-content-center' : 'justify-content-end') : (modalRightPanelVisible ? 'justify-content-start' : 'justify-content-center')}`}>
                <div style={{ width: 466, height: 412, }}>
                  <CodeMapControl
                    code={code}
                    disabled={disabled || !!lockedCodeArea}
                    editing={editing}
                    onCodeChange={handleCodeChange}
                    onEditingChange={onEditingChange}
                  />
                </div>
              </div>
            </div>
            {
              modalRightPanelVisible ? (
                <div className={`col ${modalLeftPanelVisible ? 'col-md-3' : 'col-md-4'}`}>
                  <div className="pt-md-0 pt-sm-3">
                    <hr className="d-none d-sm-block d-md-none mt-0"/>
                    <RightPanel
                      code={code}
                    />
                    <hr className="d-none d-sm-block d-md-none mb-0"/>
                  </div>
                </div>
              ) : null
            }
          </div>
          <div className="row">
            <div className="col col-md-12">
              <Form.Group className="mb-0">
                <InputGroup>
                  <CodeFormControl
                    code={code}
                    disabled={disabled || editing || !!lockedCodeArea}
                    placeholderCodeLength={placeholderCodeLength}
                    onCodeChange={handleCodeChange}
                  />
                  <InputGroup.Append>
                    <CodeLengthFormControl
                      className="rounded-0"
                      codeLength={codeArea ? codeArea.centerOfMass.codeLength : placeholderCodeLength}
                      disabled={disabled || editing}
                      onCodeLengthChange={handleCodeLengthChange}
                    />
                  </InputGroup.Append>
                  <InputGroup.Append>
                    <Button ref={modalLockButtonRef} className="border" variant={lockedCodeArea ? 'success' : 'light'} disabled={!codeArea || disabled || editing} onClick={lockedCodeArea ? handleModalLockButtonClick : handleModalUnlockButtonClick}>
                      {
                        lockedCodeArea ? (
                          <Icon.Lock />
                        ) : (
                          <Icon.Unlock />
                        )
                      }
                    </Button>
                  </InputGroup.Append>
                  <InputGroup.Append>
                    <Button ref={modalLeftPanelButtonRef} className="border" variant="light" onClick={handleModalLeftPanelButtonClick}>
                      {
                        modalLeftPanelVisible ? (
                          <Icon.ChevronDoubleRight />
                        ) : (
                          <Icon.ChevronDoubleLeft />
                        )
                      }
                    </Button>
                  </InputGroup.Append>
                  <InputGroup.Append>
                    <Button ref={modalRightPanelButtonRef} className="border" variant="light" onClick={handleModalRightPanelButtonClick}>
                      {
                        modalRightPanelVisible ? (
                          <Icon.ChevronDoubleLeft />
                        ) : (
                          <Icon.ChevronDoubleRight />
                        )
                      }
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                {
                  lockedCodeArea && (code !== lockedCode) ? (
                    <Form.Text className="text-muted">
                      <span>Restore locked value:</span> <a href="/" onClick={handleRestoreLockedCodeLinkClick}>{lockedCode}</a>
                    </Form.Text>
                  ) : null
                }
                {
                  (Array.isArray(history) && (codeArea ? ((history.length > 1) && (code !== history[history.length - 2])) : ((history.length > 0) && (code !== history[history.length - 1])))) ? (
                    <Form.Text className="text-muted">
                      <span>Restore previous value:</span> <a href="/" onClick={handleRestoreHistoryLinkClick}>{history[history.length - (codeArea ? 2 : 1)]}</a>
                    </Form.Text>
                  ) : null
                }
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalHideButtonClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

CodeFormGroup.propTypes = {
  code: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  label: PropTypes.string,
  latitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  lockedCode: PropTypes.string,
  longitude: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  modalLeftPanelVisible: PropTypes.bool.isRequired,
  modalRightPanelVisible: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  placeholderCodeLength: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  wkt: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  onEditingChange: PropTypes.func.isRequired,
  onCodeLengthChange: PropTypes.func.isRequired,
  onHistoryChange: PropTypes.func.isRequired,
  onLatitudeChange: PropTypes.func.isRequired,
  onLongitudeChange: PropTypes.func.isRequired,
  onModalLeftPanelHide: PropTypes.func.isRequired,
  onModalLeftPanelShow: PropTypes.func.isRequired,
  onModalRightPanelHide: PropTypes.func.isRequired,
  onModalRightPanelShow: PropTypes.func.isRequired,
  onModalHide: PropTypes.func.isRequired,
  onModalShow: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onWellKnownTextChange: PropTypes.func.isRequired,
}

CodeFormGroup.defaultProps = {
  code: '',
  disabled: false,
  editing: false,
  history: [],
  label: 'Unique Building Identifier (UBID)',
  lockedCode: undefined,
  latitude: '',
  longitude: '',
  modalLeftPanelVisible: false,
  modalRightPanelVisible: false,
  modalTitle: 'Unique Building Identifier (UBID)',
  modalVisible: false,
  placeholderCodeLength: 11,
  query: '',
  wkt: '',
  onCodeChange: undefined,
  onEditingChange: undefined,
  onHistoryChange: undefined,
  onCodeLengthChange: undefined,
  onLatitudeChange: undefined,
  onLongitudeChange: undefined,
  onModalLeftPanelHide: undefined,
  onModalLeftPanelShow: undefined,
  onModalRightPanelHide: undefined,
  onModalRightPanelShow: undefined,
  onModalHide: undefined,
  onModalShow: undefined,
  onQueryChange: undefined,
  onWellKnownTextChange: undefined,
}

export default CodeFormGroup
