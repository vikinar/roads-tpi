import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

export class ColorPicker extends React.Component<any, any> {
  state = {
    displayColorPicker: false,
    color: {
      hex: this.props.hex
    }
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    this.setState({ color: {hex: color.hex} });
    this.props.onChange(color.hex);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          backgroundColor: this.state.color.hex,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          //@ts-ignore
          <div style={styles.popover}>
            {/* @ts-ignore */}
            <div style={styles.cover} onClick={this.handleClose} />
            {/* @ts-ignore */}
            <SketchPicker color={this.state.color} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

// export default ColorPicker;
