import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import withValidation from 'components/UI/FormControl/withValidation/withValidation';
import Error from 'components/UI/Error/Error';
import FontIcon from 'components/UI/FontIcon/FontIcon';
import Label from 'components/UI/FormControl/ControlLabel/ControlLabel';
import classes from './CheckboxControl.scss';
import { OK } from 'components/UI/FontIcon/FontIconTypes/FontIconsTypes';

class CheckboxControl extends Component {
  state = {
    checked: false
  };

  onPressOK = event => {
    if (event.code === 'Space' || event.code === 'Enter') {
      this.checkboxClickHandler(event);
    }
  };

  checkboxClickHandler = event => {
    const { checked } = this.state;
    const { onChange } = this.props;
    const newValue = !checked;

    this.setState(
      () => ({ checked: newValue }),
      () => onChange(newValue ? 'accepted' : '')
    );
  };

  labelClickedHandler = event => {
    event.preventDefault();
    this.checkboxClickHandler(event);
  };

  render() {
    const { Checkbox: checkboxClass } = classes;
    const { checked } = this.state;
    const {
      config: { label, labelButtonValue, required, subtype },
      error,
      name,
      openTip,
      t,
      value
    } = this.props;

    const checkboxClasses = [checkboxClass];

    if (error) {
      checkboxClasses.push(classes.Invalid);
    }

    return (
      <>
        <span
          className={checkboxClasses.join(' ')}
          name={name}
          id={name}
          role={subtype}
          checked={checked}
          aria-checked={checked}
          tabIndex="0"
          value={value}
          aria-labelledby={`${name}`}
          onClick={this.checkboxClickHandler}
          onFocus={() => {
            document.addEventListener('keydown', this.onPressOK);
          }}
          onBlur={() => {
            document.removeEventListener('keydown', this.onPressOK);
          }}
        >
          {checked && <FontIcon iconType={OK} />}
        </span>
        {label && (
          <Label
            label={label}
            labelButtonValue={labelButtonValue}
            clicked={this.labelClickedHandler}
            required={required}
            controlId={name}
            openTip={openTip}
          />
        )}
        {error && <Error message={t(error)} />}
      </>
    );
  }
}

export default withValidation(withTranslation('contact')(CheckboxControl));
