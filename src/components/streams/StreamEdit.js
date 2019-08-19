import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StremForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading</div>;    
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StremForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} 
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return { stream: state.streams[id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);