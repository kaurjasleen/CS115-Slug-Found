import React, { useState } from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import uuid from 'uuid';
import MessageViewer from './MessageViewer';
import { updateMessages as updateMessagesAction } from '../../store/actions/messageActions';
import logo from '../logo.jpg';

export const MessagesPage = (props) => {
  // necessary components
  const { uid, index, isLoggedIn, users, messageGroups, updateMessages } = props;
  const [messageGroupIndex, setMessageGroupIndex] = useState(index);
  // if user not logged in, redirect
  if (!isLoggedIn) return <Redirect to="/login" />;
  const handleClick = (otherUserId) => {
    messageGroups.forEach((m, i) => {
      if (m.smallerId === otherUserId || m.greaterId === otherUserId) {
        setMessageGroupIndex(i);
      }
    });
  };
  // get the id of user sending message to
  const getToId = () => {
    // make sure there are message groups
    if (messageGroups && messageGroups.length > 0) {
      const { smallerId, greaterId } = messageGroups[messageGroupIndex];
      if (smallerId !== uid) {
        return smallerId;
      }
      return greaterId;
    }
    // there are no message groups
    return -1;
  };
  // render html
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" width={300} inputMode="scale" />
      <div className="MessagesPage-container">
        {users.length > 0 ? (
          <>
            <ul className="MessagesPage-container__users list-group list-group-flush">
              {users &&
                users.map(({ user }, i) => (
                  <button
                    type="button"
                    onClick={() => handleClick(user.id)}
                    className={`list-group-item${
                      i === messageGroupIndex ? ' list-group-item-secondary' : ''
                    }`}
                    key={uuid()}
                  >
                    {user && user.username}
                  </button>
                ))}
            </ul>
            <div className="MessagesPage-container__message-page">
              <MessageViewer
                updateMessages={updateMessages}
                messageGroup={
                  messageGroups && messageGroups.length > 0 && messageGroups[messageGroupIndex]
                }
                toId={getToId()}
              />
            </div>
          </>
        ) : (
          <h2>No Messages to show</h2>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  // get all messages
  const { messages: allMessageGroups, users: allUsers } = state.firestore.ordered;
  // get userid
  const { uid } = state.firebase.auth;
  // find the message group
  const messageGroups =
    allMessageGroups && allMessageGroups.filter((m) => m.smallerId === uid || m.greaterId === uid);
  // if there is id in URL, then find that message group
  const { id } = props.match.params;
  let index = 0;
  if (id && messageGroups) {
    messageGroups.forEach((m, i) => {
      if (m.smallerId === id || m.greaterId === id) {
        index = i;
      }
    });
  }
  // find users
  const users = [];
  if (messageGroups) {
    messageGroups.forEach((messageGroup) => {
      let otherUsersId = messageGroup.smallerId;
      if (otherUsersId === uid) {
        otherUsersId = messageGroup.greaterId;
      }
      // find the user
      const user = allUsers && allUsers.find((i) => i.id === otherUsersId);
      users.push({
        user,
      });
    });
  }
  return {
    index,
    uid,
    messageGroups,
    users,
    isLoggedIn: state.firebase.auth.uid,
  };
};
// get update message functions
const mapDispatchToProps = (dispatch) => ({
  updateMessages: (toId, message, messageGroup) =>
    dispatch(updateMessagesAction(toId, message, messageGroup)),
});
// connect and export
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'messages' }, { collection: 'users' }]),
)(MessagesPage);
