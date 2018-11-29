import React, { Component } from "react";
import { getUserByID } from "../actions/userActions";
import { connect } from "react-redux";
import { levelProcess ,expLeft} from './../sketches/levelprocess';
class Profile extends Component {
  componentDidMount() {
    console.log("long param", this.props.match.params.id);
    this.props.getUserByID(this.props.match.params.id);
  }
  render() {
    if(!this.props.auth){
      this.props.history.push('/');
    }
    const { user } = this.props;
    return (
      <React.Fragment>
        {user.name && (
          <div>
            <section className="profile">
              <div className="row">
                <div className="col span-4-of-8">
                  <div className="profile__character">
                    <div className="profile__character--div">
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="profile__character--avatar"
                      />
                      <div className="profile__character--achievement">
                        <div className="profile__character--achievement--item">
                          <i className="fas fa-coins profile__character--achievement--icon" />
                          <p className="profile__character--achievement--number">
                            {user.exp}
                          </p>
                        </div>
                        <div className="profile__character--achievement--item">
                          <i className="fas fa-award profile__character--achievement--icon" />
                          <p className="profile__character--achievement--number">
                            God
                          </p>
                        </div>
                        <div className="profile__character--achievement--item">
                          <i className="fas fa-star profile__character--achievement--icon" />
                          <p className="profile__character--achievement--number">
                            {user.star?user.star:0}
                          </p>
                        </div>
                        <div className="profile__character--achievement--item">
                          <i className="fas fa-chess-queen profile__character--achievement--icon" />
                          <p className="profile__character--achievement--number">
                            <span className="profile__character--achievement--quote">
                              #
                            </span>
                            10
                          </p>
                        </div>
                        <div className="profile__character--achievement--item">
                          <i className="far fa-chart-bar profile__character--achievement--icon" />
                          <p className="profile__character--achievement--number">
                            {(user.match && user.match>0 &&user.win)?(Number(user.win/user.match)*100):0}
                            <span className="profile__character--achievement--quote">
                              %stat
                            </span>
                          </p>
                        </div>
                        <div className="profile__character--achievement--item">
                          <i className="fas fa-list-ol profile__character--achievement--icon" />
                          <p className="profile__character--achievement--number">
                            100
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col span-4-of-8">
                  <div className="profile__information">
                    <form className="form profile__form">
                      <div className="form__control">
                        <label
                          className="form__title profile__form__title"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form__input"
                          value={user.name}
                          disabled
                        />
                      </div>
                      <div className="form__control">
                        <label
                          className="form__title profile__form__title"
                        >
                          Level 
                        </label>
                        <input
                          type="text"
                          className="form__input"
                          value={levelProcess(user.exp)}
                          disabled
                        />
                      </div>
                      <div className="form__control">
                        <label
                          className="form__title profile__form__title"
                        >
                          Have {user.exp}/{expLeft(user.exp)} to gain next level
                        </label>
                        {/* <input
                          type="text"
                          className="form__input"
                          value="09629202"
                          disabled
                        /> */}
                      </div>{" "}
                      <input
                        onClick={()=>{this.props.history.push('/')}}
                        className="form__submit profile__form__submit btn"
                        type="submit"
                        value="Back to DashBoard"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {
    user: state.user.user,
    auth : state.user.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserByID: uid => {
      dispatch(getUserByID(uid));
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Profile);
