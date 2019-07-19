import React from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const MessagesPage = (props) => {
  const { isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div className="mailbox">
      <div className="nav">
        <div className="btngroup">
          <form id="btnn" action="/messages/compose">
            <button id="but" type="submit" name="submit">
              compose
            </button>
          </form>
          <button type="button">inbox</button>
          <button type="button">sent</button>
        </div>
      </div>
      <div className="messages">
        <input className="input-search" placeholder="search" />
        <div className="message">
          <span className="sender">Steve</span>
          <span className="date">today</span>
          <span className="title">Lost hydroflask</span>
        </div>

        <div className="message">
          <span className="sender">Laura</span>
          <span className="date">today</span>
          <span className="title">Lost airpods</span>
        </div>

        <div className="message">
          <span className="sender">Bob</span>
          <span className="date">today</span>
          <span className="title">Lost earphones</span>
        </div>

        <div className="message">
          <span className="sender">Joe</span>
          <span className="date">today</span>
          <span className="title">Found keys</span>
        </div>

        <div className="message">
          <span className="sender">Jane</span>
          <span className="date">today</span>
          <span className="title">Lost phone</span>
        </div>

        <div className="message">
          <span className="sender">Slug</span>
          <span className="date">today</span>
          <span className="title">Lost backpack</span>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(MessagesPage);
