import React, { Fragment } from "react";
import config from "../../config";
import classnames from "classnames";
import InputLoader from "../../components/InputLoader/InputLoader";
import "./Form.scss";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      message: "",
      failed: false,
      succeed: false,
      loadingLogin: false,
      loadingPassword: false
    };
  }
  onChangeLogin = e => {
    const { loadingLogin } = this.state;
    const login = e.currentTarget.value;

    if (this.timerLogin) {
      clearTimeout(this.timerLogin);
      this.timerLogin = null;
    }
    if (!loadingLogin) {
      this.setState({
        loadingLogin: true
      });
    }
    this.timerLogin = setTimeout(() => {
      this.setState({
        loadingLogin: false
      });
    }, 3000);

    this.setState({
      login
    });
  };

  onChangePassword = e => {
    const { loadingPassword } = this.state;
    const password = e.currentTarget.value;

    if (this.timerPassword) {
      clearTimeout(this.timerPassword);
      this.timerLogin = null;
    }
    if (!loadingPassword) {
      this.setState({
        loadingPassword: true
      });
    }
    this.timerPassword = setTimeout(() => {
      this.setState({
        loadingPassword: false
      });
    }, 3000);

    this.setState({
      password
    });
  };

  onClick = () => {
    const { login, password } = this.state;
    if (login !== config.login || password !== config.password) {
      this.setState({
        message: "Ошибка авторизации",
        failed: true
      });
    } else {
      this.setState({
        message: "Авторизация прошла успешно",
        failed: false
      });

      setTimeout(() => {
        this.setState({
          succeed: true
        });
      }, 3000);
    }
  };

  render() {
    const {
      message,
      login,
      password,
      failed,
      succeed,
      loadingLogin,
      loadingPassword
    } = this.state;
    return (
      <div className="form">
        {succeed ? (
          <div>
            Добро пожаловать! <span className="wave">👋</span>
          </div>
        ) : (
          <React.Fragment>
            <div className="form__field">
              <input
                value={login}
                onChange={this.onChangeLogin}
                type="text"
                placeholder="Логин"
              />
              {loadingLogin ? (
                <div className="form__input-loader">
                  <InputLoader />
                </div>
              ) : null}
            </div>
            <div className="form__field">
              <input
                value={password}
                onChange={this.onChangePassword}
                type="password"
                placeholder="Пароль"
              />
              {loadingPassword ? (
                <div className="form__input-loader">
                  <InputLoader />
                </div>
              ) : null}
            </div>
            {message ? (
              <div
                className={classnames("form__message", {
                  form__message_failed: failed,
                  form__message_success: !failed
                })}
              >
                {message}
              </div>
            ) : null}
            <div className="form__btn-wrapper">
              <button onClick={this.onClick} className="form__btn">
                Войти
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
