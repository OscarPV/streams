import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions'
import history from '../../history';

class StreamDelete extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
    }
    
    renderActions() {
        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <Link to="/" className="ui button">Cancel</Link>
                <button 
                    onClick={() => this.props.deleteStream(id)} 
                    className="ui button negative">
                        Delete
                </button>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        }

        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}?`;
    }
    
    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);