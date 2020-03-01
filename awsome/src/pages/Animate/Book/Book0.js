import React from 'react';

export default class Book extends React.Component {
  state = {
    degree: 0,
    atLeft: [],
    to: 1,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        degree: this.state.degree + 90,
      });
    }, 3000);

    let timer = null;
    clearInterval(timer);
    let i = 1;
    timer = setInterval(() => {
      if (this.state.to === 1) {
        if (i <= 4) {
          let newAtLelft = this.state.atLeft;
          newAtLelft.push(i);
          this.setState({
            atLeft: newAtLelft,
          });
          i++;
        }
        if (i === 5) {
          this.setState({
            to: -1,
          });
        }
      } else {
        if (i >= 1) {
          let newAtLelft = this.state.atLeft;
          newAtLelft.pop(i);
          this.setState({
            atLeft: newAtLelft,
          });
          i--;
        }
        if (i === 1) {
          this.setState({
            to: 1,
          });
        }
      }
    }, 3000);
  }
  render() {
    <div
      style={{
        width: '800px',
        height: '400px',
        border: '1px solid black',
        position: 'relative',
        marginLeft: '100px',
      }}>
      <ul
        style={{
          listStyle: 'none',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          margin: '0px',
          padding: '0px 0 0 400px',
        }}>
        <li
          className={[
            'paper',
            this.state.atLeft.indexOf(1) > -1 ? 'left' : 'right',
          ].join(' ')}>
          <div className="pic" style={{transform: 'translateZ(0px)'}}>
            <img src="./1.jpg"></img>
          </div>
          <div className="pic" style={{transform: 'translateZ(1px)'}}>
            <img src="./2.jpg"></img>
          </div>
        </li>
        <li
          className={[
            'paper',
            this.state.atLeft.indexOf(2) > -1 ? 'left' : 'right',
          ].join(' ')}>
          <div className="pic" style={{transform: 'translateZ(2px)'}}>
            <img src="./3.jpg"></img>
          </div>
          <div className="pic" style={{transform: 'translateZ(3px)'}}>
            <img src="./4.jpg"></img>
          </div>
        </li>
        <li
          className={[
            'paper',
            this.state.atLeft.indexOf(3) > -1 ? 'left' : 'right',
          ].join(' ')}>
          <div className="pic" style={{transform: 'translateZ(4px)'}}>
            <img src="./5.jpg"></img>
          </div>
          <div className="pic" style={{transform: 'translateZ(5px)'}}>
            <img src="./6.jpg"></img>
          </div>
        </li>
        <li
          className={[
            'paper',
            this.state.atLeft.indexOf(4) > -1 ? 'left' : 'right',
          ].join(' ')}>
          <div className="pic" style={{transform: 'translateZ(6px)'}}>
            <img src="./7.jpg"></img>
          </div>
          <div className="pic" style={{transform: 'translateZ(7px)'}}>
            <img src="./8.jpg"></img>
          </div>
        </li>
      </ul>
    </div>;
  }
}
