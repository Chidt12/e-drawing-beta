import React from "react";
export default class LoseNotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exp: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let timer = setInterval(() => {
        this.setState(
          state => {
            return { exp: state.exp - 1 };
          },
          () => {
            if (this.state.exp <= this.props.exp) {
              clearInterval(timer);
              setTimeout(() => {
                //this.props.history.push("/arena");
                window.location = window.location.origin
              }, 2000);
            }
          }
        );
      }, 20);
    }, 1000);
  }
  render() {
    return (
      <div className="popup-toward notification">
        <div className="notification-lose popup-toward__content">
          <i className="fas fa-frown notification-lose__icon" />
          <h1 className="notification-lose__heading heading-primary">
            Lose<span className="notification-lose__heading--quote">!</span>
          </h1>
          <div className="notification__content">
            <div className="notification__content--item">
              <i className="fas fa-coins notification__content--item--i" />
              <p className="notification__content--item--p">{this.state.exp}</p>
            </div>
            <div className="notification__content--item">
              <i className="fas fa-star notification__content--item--i" />
              <p className="notification__content--item--p">3</p>
            </div>
            <div className="notification__content--item">
              <i className="fas fa-hourglass-start notification__content--item--i" />
              <p className="notification__content--item--p">30s</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
