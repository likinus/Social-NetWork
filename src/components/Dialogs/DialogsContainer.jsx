import Dialogs from './Dialogs';
import { sendMessageCreator } from '../../Redux/messageReducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/WithAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
