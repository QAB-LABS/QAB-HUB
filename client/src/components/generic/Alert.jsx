import React from "react";
import { connect } from 'react-redux'
import { alertActions } from '../../actions/alert'

class Alert extends React.Component {
    render() {
        const { alert, clearAlerts } = this.props;
        if (alert.message) setTimeout(() => clearAlerts(), 3000)
        return (
            <React.Fragment>
                <div className={alert.message ? `alert message ${alert.type}` : ''}>{alert.message ? alert.message : ''}</div>
            </React.Fragment >
        )
    }
}

function mapState(state) {
    return { alert: state.alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(Alert);
